const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSetSchema = new Schema(
    {
    id: { type: Number, required: true, unique: true },
    name: { type: String, default: null },
    service: { type:  Number, required: true },
    set_type: { type:  Number, required: true },
    hidden_from_api: { type:  Number, default: 0 },
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

const DataSet = mongoose.model('DataSet', DataSetSchema);

DataSet.findAllByType = async function( set_type, service ) {    
    
    const matchQuery = { set_type: Number(set_type), service: Number(service) };
        
    const [dataSet] = await Promise.all([
        this.aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup:
                {
                    from: "datasetstructures",
                    localField: "id",
                    foreignField: "set_id",
                    as: "dataStructure"
                }

            },
            {
                $project: {
                    id: 1,
                    name: 1,
                    service: 1,
                    set_type: 1,
                    hidden_from_api: 1,
                    "dataStructure.name": 1,
                    "dataStructure.type": 1,
                }
            }
        ])
    ])
    
    return dataSet;
}


DataSet.findAllByName = async function( name, service, set_type ) {    
    
    const matchQuery = { name: name, set_type: Number(set_type), service: Number(service) };
        
    const dataSet = this.aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup:
                {
                    from: "datasetstructures",
                    localField: "id",
                    foreignField: "set_id",
                    as: "structures"
                }

            },
            {
                $project: {
                    id: 1,
                    name: 1,
                    service: 1,
                    set_type: 1,
                    hidden_from_api: 1,
                    structures: 1
                }
            }
        ])    
    
    return dataSet;
}

module.exports = DataSet;
