const EmployerCompany = require('../models/EmployerCompany');



class EmployerCompanyController {
    static async addEmployerCompany (data) {
        
        let employerCompany = new EmployerCompany(data);

        await employerCompany.save()
       
        let employerCompanys = await EmployerCompany.find();
        return employerCompanys;
    }
    static async fetchEmployerCompanys () {
        return await EmployerCompany.find();
    }

    static async getEmployerCompany(id) {
        return await EmployerCompany.findById(id)
    }

    static async deleteEmployerCompany(id) {
        let employerCompany = await this.getEmployerCompany(id);

        if(!employerCompany) {
            return "Verification not found"
        } 

        return await EmployerCompany.findOneAndRemove({_id: employerCompany._id});
    }

   
 }

module.exports = EmployerCompanyController;
