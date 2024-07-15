const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvoPointSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    points: { type: Number, default: 0 },
    user_id: { type: Number, required: true },
    entity_type: { type: Number, default: null },
    evokit: { type: Number, default: 0 },
    earning_evokit: { type: Number, default: 0 },
    evofashion: { type: Number, default: 0 },
    earning_evofashion: { type: Number, default: 0 },
    evoexpo: { type: Number, default: 0 },
    earning_evoexpo: { type: Number, default: 0 },
    karma: { type: Number, default: 0 }
});

const EvoPoint = mongoose.model('EvoPoint', EvoPointSchema);

module.exports = EvoPoint;