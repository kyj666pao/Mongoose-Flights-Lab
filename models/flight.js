import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"],
    },
    airport: {
        type: String,
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
        default: "DEN",
    },
    flightNo: {
        type: Number,
        min: 0,
        max: 9999,
        required: true,
    },
    departs: {
        type: Date,
        default: function() {
            let date = new Date()
            date = `${date.getFullYear()+1}-
                    ${date.getMonth()+1}-
                    ${date.getDate()}T
                    ${date.getHours()}:
                    ${date.getMinutes()}:00.000Z`
            return date
        }
    }
})

const Flight = mongoose.model("Flight", flightSchema)

export {
    Flight
}