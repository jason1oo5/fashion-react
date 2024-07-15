express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('./user/index');
const isAdmin = require('../middlewares/isAdmin');
const moment = require('moment');

function isLogged(req, res, next) {    
    var token = req.cookies.token||req.headers.token || req.headers.authorization;      
    if(!token) return next();
    jwt.verify(token, process.env.AUTHJWT, function (err, decoded) {
        if(err) return next();
        req.user = decoded;
        res.locals.user = req.user;
        return next();
    });
}

require("../controllers/auth");
require("../db");

router.use(isLogged);

function getToken(body) {
    const token = jwt.sign({ user: body }, process.env.AUTHJWT, {
        expiresIn: "30d",
    });

    return token;
}

const isAuthenticated = (req, res, next) => {
    var token = req.headers.token || req.cookies.token || req.query.token || req.headers.authorization;
        
    if(!token) return res.status(401).send("Unauthorised user");
    jwt.verify(token, process.env.AUTHJWT, function (err, decoded) {
        if(err) {
            return res.status(401).send("Unauthorised");
        }

        const expiry_time = moment(decoded.exp * 1000);
        const duration = moment.duration(expiry_time.diff(moment()));
        var days = duration.asDays();
        if(days < 29) {           
            token = getToken(decoded.user);
            const domain = process.env.HOST || "marketplace.evovor.com"

            res.cookie("token", token, {
                maxAge: 100 * 60 * 60 * 24 * 30,
                httpOnly: false,
                domain,
            });
        }

        req.user = decoded;        
        return next();
    })    
}

router.use("/api/user", isAuthenticated, user);
router.use("/api/public", require("./public/index"));
// router.use("/admin", isAdmin, require("./admin"));
router.use("/api/v1/evovor", require("./auth"));
router.use("/api/v1/evovor", isAuthenticated, require('./evovor/index'));

module.exports = router;