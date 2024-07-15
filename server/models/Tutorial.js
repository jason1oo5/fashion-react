const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorialSchema = new Schema(
    {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String, required: true },        
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

const Tutorial = mongoose.model('Tutorial', TutorialSchema);

module.exports = Tutorial;