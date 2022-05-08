const mongoose  = require('mongoose');

const outreachSchema = new mongoose.Schema({
    
    rdate: {
        type: String,
       
    },
    location: {
        type: String
    },
    serialNo: {
        type: String
    },
    clientNo:{
        type: String
    },
    name:{
        type: String
    },
    age: {
        type: String
    },
    sex: {
        type: String,
       
    },
    nin: {
        type: String
    },
    district: {
        type: String
    },
    clientNo:{
        type: String
    },
    subcounty:{
        type: String
    },
    village: {
        type: String
    },
    parish:{
        type: String
    },
    tribe: {
        type: String
    },
    occupation: {
        type: String,
       
    },
    complaint: {
        type: String
    },
    reffered: {
        type: String
    },
    findings:{
        type: String
    },
    tests:{
        type: String
    },
    result: {
        type: String
    },
    lesionsize:{
        type: String
    },
    referredTo:{
        type: String
    },
    followUpDate: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Outreach  = mongoose.model('Outreach', outreachSchema , 'outreachs')

module.exports = Outreach;