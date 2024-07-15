const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
const googleAuthLibrary = require('google-auth-library');
const moment = require("moment");
const { User } = require("../db");
require("../controllers/auth");
// const { AccountActivationCode } = require("../db");

const { body, validationResult } = require("express-validator");
const sendEmail = require("../mailers");
const getTemplate = require("../mailers/templates/welcome");
const getResetTemplate = require("../mailers/templates/forgot-password");

const OAuth2Client = googleAuthLibrary.OAuth2Client;
const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,

})

const authenticateWithGoogle = async (req, res) => {
    const token = req.body;

    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });
    if(!user) {
        user = new User({
            email: payload?.email,
            password: '12345678910',
            username: payload?.name,
            role: 'Creator',
        });

        await user.save();
    }

    return res.cookie("token", token, { 
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: false,
        domain
    }).send({ user, token });        
}
//username must be an email

//firestore set user_id as 829020 where
//password must be at least 5 chars long

// router.post('/getToken', test);

// function test(req, res) {
//     console.log("reqbody", req.body)
//     // const body = { _id: user._id, email: user.email, id: user._id };
//     const token = genToken(req.body);
//     return res.status(200).send({data: token, message: "test"})
// }

function genToken(body) {
    const token = jwt.sign({ user: body }, process.env.AUTHJWT, {
        expiresIn: "30d",        
    })    
    return token;
}

function genVerifyToken(body) {
    const token = jwt.sign({ user: body }, process.env.VERIFYJWT)    
    return token;
}

async function checkUserExists(email) {
    const user = await User.findOne({ email }, { _id: 1 });
    return user ? true : false;
}

router.post("/google-auth", authenticateWithGoogle);

router.post(
    "/register",    
    body("name").isLength({ min: 3, max: 20 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    async (req, res, next) => {        
        const email = req.body.email.toLowerCase();
        const result = validationResult(req);        
        const hasErrors = !result.isEmpty();
        // console.log("validate result", hasErrors);
        if(await checkUserExists(email)) {
            return res.status(401).send({
                success: false,
                message: "Email already exists",
                errors: {
                    errors: [
                        {
                            msg: "Email already exists",
                            param: "exists",
                            value: email,                            
                        }
                    ]
                }
            });
        }

        if(hasErrors) {
            return res.status(401).send({
                success: false,
                message: "Invalid inputs",
                errors: hasErrors                
            })
        }

        passport.authenticate("signup", { session: false }, async (error, user) => {
            if(error) {
                console.log("error", error);
                return res.status(500).send({ error: error, message: "Issue with register" });
            } 
            console.log("error passed")
            req.login(user, { session: false }, async (error) => {
                if(error) return next(error);
                const body = { _id: user._id, email: user.email, id: user._id };
                const token = genToken(body); 
                const verifyToken = genVerifyToken(body);                                
                
                const domain = process.env.HOST || "marketplace.evovor.com";
                const verify_link = 'http://66.94.98.229:3000/verify?vtoken='+verifyToken+'&email='+email;
                const template = getTemplate(verify_link);
                // console.log("template", template);                
                await sendEmail(email, "Welcome signup EvoFashion", template);
    
                return res.cookie("token", token, { 
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: false,
                    domain
                }).send({ token });        
            })
        })(req, res, next);        
    }
);

router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),    
    async (req, res, next) => {
        console.log("login router");
        req.body.email = req.body.email.toLowerCase();
        passport.authenticate("login", async (err, user, info) => {
            try {
                if(err) {
                    console.log("passport login error", err);
                    return res.status(401).send("Login failed. Server error occured");
                }
                if(!user) {
                    return res.status(401).send("Login failed. Invalid credentials")
                }
                req.login(user, { session: false }, async (error) => {
                    if(error) return next(error);
                    try {
                        const body = {
                            _id: user._id,
                            email: user.email,
                            id: user._id
                        };
                        const token = genToken(body);                        
                        if(req.headers["token-mode"] == "1") {
                            const uid = user._id + "";
                            const revoke_time = Math.floor(Date.now() / 1000);
                            
                            return res.json({
                                token,
                                revoke_time
                            })
                        } else {
                            const user_info = {
                                email: user.email,
                                name: user.name
                            }
                            return res.cookie("token", token, {
                                maxAge: 1000 * 60 * 60 *24 * 30,
                                httpOnly: false,                        
                            })
                            .send({ token: token, user: user_info });
                        }
                       } catch (error) {
                        return res.send({
                            success: false,
                            message: "Sever error occured"
                        });
                       }
                })
            } catch (error) {
                return next(error);
            }               
        })(req, res, next);
    }
);

router.post("/resetPassword", async (req, res) => {
    try {
        req.body.email = req.body.email.toLowerCase();
        const { email } = req.body||req.query;
        const user = await User.findByEmail(email);                
        const token = jwt.sign(
            { email: user.email, hash: user.password },
            process.env.AUTHJWT,
            { expiresIn: "15 mins" }
        );
        
        const resetLink = (process.env.HOST || "https://marketplace.evovor.com") + "/reset-password?token=" + token+'&email='+email;                    
        
        const template = getResetTemplate(resetLink)

        await sendEmail(email, "Forgot Password", template);

        return res.send({ success: true, message: "Success" });        
    } catch (error) {        
        return res.status(500).send({ success: false, message: "User not found" });
    }
});

router.get("/logout", async (req, res, next) => {
    // console.log("logout cookie", req.cookies)
    const token = req.headers.token || req.cookies.token || req.query.token;
    console.log('logout', token);
    jwt.sign(token, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            req.session.destroy();
            const domain = process.env.HOST || "marketplace.evovor.com"
            return res.clearCookie("token", {
                domain,
            })
            .send({ success: true });
        } else {
            return res.send({msg:'Error'});
        }
      });
    
    // jwt.sign(req.cookies.token, process.env.AUTHJWT, {expiresIn: '1s'})

})

router.post("/update-password", async (req, res) => {
    try {
        const { password: new_password, token } = req.body;        
        const { email, _id } = jwt.verify(
            token,
            process.env.AUTHJWT
        );
        console.log('router/update-password', email, _id);
        await User.updatePassword(_id, new_password);        

        return res.status(200).send({ success: true, message: "Password changed" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: error });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const user = req.user.user;
        const { password } = req.body;
        const result = await User.updatePassword(user._id, password);                
        return res.status(200).send({ success: true, message: "Password changed" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: true, message: error});
    }
})

router.get("/verify/:email/:token", async (req, res) => {
    try {
        const user = await User.findByEmail(req.params.email);        
        if(user.email_verified_at!='') { return res.send("Email already verified") };
        if(!user) { return res.status(400).send("Invalid link") };                
        if(user.remember_token!=req.params.token) { return res.status(400).send("Invalid link") }

        await User.findOneAndUpdate({ email: req.params.email }, { email_verified_at: Date.now(), remember_token: null });        

        return res.status(200).send("Email verified successfully");        
    } catch (error) {
        return res.status(500).send("Email still not verified. Try again");
    }
})

router.get('/getAuthenticatedUserInfo', async(req, res) => {    
    try {
        const user = await User.findOne({_id: req.user.user._id}, { email: 1, account_type: 1, avatar: 1 });
        console.log('getAuthenticatedUserInfo', user);
        return res.status(200).send({success: true, user});
    } catch(error) {
        console.log(error)
        return res.status(500).send({success: false});
    }
    
})

module.exports = router;