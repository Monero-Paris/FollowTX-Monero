const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
    {
        key: String,
        value: String
    },
    {
        timestamps:
            {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    }
)

const Meta = mongoose.model('Meta', schema)

module.exports = Meta