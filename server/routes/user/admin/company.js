const express = require('express');
const router = express.Router();
const { Company, CompanyUser, User } = require('../../../db');

router.get('/findEditInfo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [company] = await Company.findEditInfo(id);
        await Promise.all(
            company.companyUser.map(async (item) => {
                const user = await User.findOne({id: item.user_id});                
                return Object.assign(item, {email: user.email});
            })
        )        
        return res.status(200).send({success: true, company});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false});
    }
})

router.post('/updateCompany/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updated = {
            name: req.body.name,
            multiplier: req.body.multiplier,
            business_id: req.body.business_id
        }
        
        const companyUsers = req.body.companyUsers;        

        await Company.findOneAndUpdate({id: id}, updated);
        await Promise.all(companyUsers.map(async (user) => {
            const s_user = await User.findOne({email: user.email});
            const exist = await CompanyUser.findOne({ company_id: id, user_id: s_user.id });
            
            if(exist) {                
                console.log("exist");
                const updatedCompanyUser = {
                    previous_roles: user.previous_roles.toString(),
                    apply_roles: user.apply_roles
                }
                await CompanyUser.findOneAndUpdate({id: exist.id}, updatedCompanyUser)
            } else { 
                const [maxIdItem] = await CompanyUser.find().sort({id: -1}).limit(1);                
                const newCompanyUser = {
                    id: maxIdItem.id + 1,
                    user_id: s_user.id,
                    company_id: id,
                    previous_roles: user.previous_roles?user.previous_roles.toString(): '0',
                    apply_roles: user.apply_roles
                }
                await CompanyUser.create(newCompanyUser);
            }
        }));
        const removedCompanyUsers = req.body.removedUsers;
        if(removedCompanyUsers) {
            await Promise.all(removedCompanyUsers.map(async (user_email) => {
                const r_user = await User.findOne({email: user_email});
                await CompanyUser.findOneAndDelete({user_id: r_user.id});
            }))    
        }        
        return res.status(200).send({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false});s
    }
})

router.delete('/deleteCompany/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Company.findOneAndDelete({id: id});
        await CompanyUser.deleteMany({company_id: id});
        return res.status(200).send({success: true, msg: "successfully deleted the company"});
    } catch(error) {
        return res.status(500).send({success: false});
    }
})

module.exports = router;