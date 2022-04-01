const mongoose  = require('mongoose');


const employerCompanySchema = new mongoose.Schema({
    
    contactfirstName: {
        type: String,
       
    },
    contactlastName: {
        type: String
    },
    contactNumber: {
        type: String
    },
    companyName: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    district: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    exportLicenseUpload:{
        type: String
    },
    incorporationCertificateUpload:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const EmployerCompany  = mongoose.model('EmployerCompany', employerCompanySchema , 'employerCompanys')

module.exports = EmployerCompany;       