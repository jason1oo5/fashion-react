const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthPartySchema = new Schema(
    {
        id: { type: Number, required: true },
        user_id: { type: Number, required: true },
        party_name: { type: String, default: null },
        party_id: { type: String, required: true },
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const AuthParty = mongoose.model('AuthParty', AuthPartySchema);

module.exports = AuthParty;