const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSetStructureSchema = new Schema({
    id: { type: Number, required: true },
    set_id: { type: Number, required: true },
    type: { type: Number, required: true },
    name: { type: String, default: null }
})

const DataSetStructure = mongoose.model('DataSetStructure', DataSetStructureSchema);

DataSetStructure.createManyDataStructure = async function(dataStructure, set_id) {    
    const [maxItem] = await this.find().sort({id: -1}).limit(1);
    const newData = await Promise.all(dataStructure.map(async(item, index) => {        
        const id = maxItem.id + 1 + index;
        return Object.assign(item, { id:  id, set_id: set_id });
    }))    
    await this.create(newData);
    return newData;
}

module.exports = DataSetStructure;