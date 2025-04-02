import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{type:String,required:true,minlenght:[3,"first name must be 3 character"]},
        lastname:{type:String,minlenght:[3,"first name must be 3 character"]}
    },
    email:{type:String,required:true,unique:true, minlenght:[5,"email must be 5 character"]},
    password:{type:String,required:true, minlenght:[6,"password must be 5 character"]},
    socketId:{
        type:String
    },
    status:{type:String,enum:["active","inactive"],default:"inactive"},
    vehicle:{
        color:{
            type:String,
            required:true,
            minlenght:[3,"color must be 3 character"]
        },
        plate:{
            type:String,
            required:true,
            minlenght:[3,"vehicle must be 3 character"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity must be 1"]

        },
        type:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"],
            minlenght:[3,"type must be 3 character"]
        },
    },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true, index: "2dsphere" } // [lng, ltd]
    }
});

const captainModel= mongoose.models.captain||mongoose.model("captain",captainSchema);
export default captainModel;