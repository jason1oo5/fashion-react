const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSetRecordSchema = new Schema(
    {
        id: { type: Number,  required: true },
        entity_type: { type: Number,  required: true },
        entity_id: { type: Number,  required: true },
        service: { type: Number,  required: true },
        set_id: { type: Number,  required: true },
        set_type: { type: Number,  required: true }
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const DataSetRecord = mongoose.model('DataSetRecord', DataSetRecordSchema);

DataSetRecord.getDataSetRecords = function (service_id, set_type) {
    const matchQuery = {
        service: Number(service_id), set_type: Number(set_type)
    }

    const dataSetRecords = this.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: 'datasetitems',
                localField: 'id',
                foreignField: 'record_id',
                as: 'dataSetItem'
            }
        },
        {
            $project: {
                id: 1,
                entity_type: 1,
                entity_id: 1,
                set_type: 1,
                set_id: 1,
                service: 1,
                dataSetItem: 1
            }
        }
    ]);

    return dataSetRecords;
}


module.exports = DataSetRecord;