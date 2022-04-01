const mongoose  = require('mongoose');

const agentVerifactionSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String
    },
    nin: {
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    district: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const AgentVerification  = mongoose.model('AgentVerification', agentVerifactionSchema , 'agentVerifications')

module.exports = AgentVerification;