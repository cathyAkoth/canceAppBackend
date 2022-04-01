const mongoose  = require('mongoose');


const employerIndividualSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String
    },
    nin: {
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

const EmployerIndividual  = mongoose.model('EmployerIndividual', employerIndividualSchema , 'employerIndividuals')

module.exports = EmployerIndividual;       