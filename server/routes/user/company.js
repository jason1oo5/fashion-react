const express = require('express');
const router = express.Router();
const { Company, CompanyUser, User } = require('../../db');

router.get('/getCompanyInfo', async(req, res) => {
    try {
        const companies = await Company.find();
        return res.status(200).send({ success: true, data: companies });
    } catch (error) {
        return res.status(500).send({ success: false, data: null });
    }    
})

router.post('/addCompany', async(req, res) => {
    try {        
        const new_company = req.body.company;        
        const companyUsers = req.body.users;
        const [maxIdItem] = await Company.find().sort({id: -1}).limit(1);
        Object.assign(new_company, { id: maxIdItem.id + 1 });
        await Company.create(new_company);
        await Promise.all(companyUsers.map(async(user_email) => {
            const [userMaxIdItem] = await CompanyUser.find().sort({id: -1}).limit(1);
            const s_user = await User.findOne({email: user_email});
            const newCompanyUser = {
                id: userMaxIdItem.id + 1,
                company_id: maxIdItem.id +1,
                user_id: s_user.id
            }
            await CompanyUser.create(newCompanyUser);
        }))
        return res.status(200).send({success: true, new_company});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false });
    }
})

module.exports = router;