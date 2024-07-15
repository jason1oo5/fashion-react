const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionAnnouncementSchema = new Schema(
    {
     id: { type: Number, unique: true, required: true },
     image_path: { type:  String, required: true },
     link_title: { type: String, default: null },
     link_location: { type: String, default: null },
     start_date: { type: Date, required: true },
     end_date: { type: Date, required: true },
    },     
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const FashionAnnouncement = mongoose.model('FashionAnnouncement', FashionAnnouncementSchema);

module.exports = FashionAnnouncement;