const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const moment = require('moment');

const UserSchema = new Schema(
    {
        id: { type: Number, unique: true },
        name: { type: String, required: true },
        email: { type: String, unique: true, lowercase: true },
        email_verified_at: { 
            type: Date,
            default: ''
        },
        remember_token: {type: String, default: null },
        password: { type: String, required: true },        
                              
        phone: { type: String, default: null },
        gender: { type: Number, default: null },
        address: { type: String, default: null },
        status: { type: Number, default: 1 },
        account_type: { type: Number, default: 0 },
        locale: { type: String, default: 'en' },
        last_login_at: { type: Date, default: '' },
        verification_reminders: { type: String, default: null },
        last_verification_reminder: { type: String, default: null },        
        acting_as: { type: Number, default: 0 },
        avatar: { type: String, },
        referral_program_id: { type: String, default: null }
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },    
)

UserSchema.pre("save", function (next) {
    var user = this;    
    if (!user.isModified("password")) return next();
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

const User = mongoose.model("User", UserSchema);

User.prototype.isValidPassword = function (password) {
    console.log("isValidPassword", this.password, password)
    return bcrypt.compare(password, this.password);
}

User.findAppUsers = async function (role) {
    const matchQuery = { email: { $ne: null }};

    Object.assign(matchQuery, {
        "account_type": role
    });

    const users = await this.aggregate([
        {
            $match:matchQuery,
        },
        {
            $project: {
                email: 1,         
                name: 1                       
            }
        }
    ]);    
    return users;
};

User.findByEmail = function (email) {
    return this.findOne({
        email
    });
}


User.getProfile = async function (email) {
    
    const matchQuery = {
        email: email
    }
    
    const projectQuery = {
        email: 1,
        name: 1,
        phone: 1,
        gender: 1,
        address: 1,
        locale: 1,
        avatar: 1,
    }

    return this.findOne(
        matchQuery,
        projectQuery
    )
}

User.updateProfile = async function (
    user_id,
    {
        name, email, avatar, phone, locale, gender, address
    }
) {    
    return this.findByIdAndUpdate(user_id, {
        name, email, avatar, phone, locale, gender, address
    })
}

// User.changePassword = function (email, old_password, password) {    
//     const hashed_password = bcrypt.hashSync(old_password, 10);
//     console.log("this password", this.password, '-', hashed_password)
//     if(this.password == hashed_password) {
//         this.findOneAndUpdate(
//             email,
//             { password: password }
//         );
//         return true
//     } else {
//         return false;
//     }
// }

User.updatePassword = function (user_id, password) {
    const hashed_password = bcrypt.hashSync(password, 10);
    return this.findByIdAndUpdate(user_id, { password: hashed_password });
}

User.signup = async function(user_data) {
                       
    const session = await mongoose.startSession();
    
    await session.withTransaction(async () => {
        const user = (
            await User.create([{ ...user_data }],{ 
                session,
                })
            )[0];       
    })
    
}


User.findForAdmin = function() {
    return this.find(
        {},
        {
            id: 1,
            email: 1,
            name: 1,
            account_type: 1,
            created_at: 1,            
            status: 1,
            referral_program_id: 1,
            email_verified_at: 1
        }
    )
}


User.getUserByAdmin = function(id) {
    const user = this.aggregate([
        {
            $match: { id: Number(id) },            
        },
        {
            $lookup: {
                from: 'evopoints',
                localField: 'id',
                foreignField: 'user_id',
                as: 'evopoint'
            }
        },         
        {
            $project: {
                id: 1,
                email: 1,
                avatar: 1,
                account_type: 1,
                locale: 1,
                status: 1,
                name: 1,
                phone: 1,
                gender: 1,
                address: 1,
                'evopoint.points': 1
            }
        }
    ]);

    return user;
}

// User.deleteAccount = function(email) {
//     return this.findOneAndDelete(
//         { email }
//     )
// }

/**
 * This function used for thirdy-party integration with other platform
 */

User.get_profile = async function(email) {
    const matchQuery = { email: email };

    const [user] = await Promise.all([
        this.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup:
            {
                from: "companyusers",
                localField: "id",
                foreignField: "user_id",
                as: "companyUsers"
            }
        },
        {
            $lookup:
            {
                from: "companies",
                localField: "companyUsers.company_id",
                foreignField: "id",
                as: "companies"
            }
        },       
        {
            $project: {
                id: 1,
                name: 1,
                email: 1,
                email_verified_at: 1,
                created_at: 1,
                updated_at: 1,
                phone: 1,
                gender: 1,
                address: 1,
                status: 1,
                locale: 1,
                last_login_at: 1,
                verification_reminders: 1,
                last_verification_reminder: 1,
                acting_as: 1,
                avatar: 1,
                referral_program_id: 1,     
                "companies": 1
            }    
        }
    ])
    ])

    const c_user = user[0];   
    return c_user;
}

module.exports = User;