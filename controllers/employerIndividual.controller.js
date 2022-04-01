const EmployerIndividual = require('../models/EmployerIndividual');



class EmployerIndividualController {
    static async addEmployerIndividual (data) {
        
        let employerIndividual = new EmployerIndividual(data);

        await employerIndividual.save()
       
        let employerIndividuals = await EmployerIndividual.find();
        return employerIndividuals;
    }
    static async fetchEmployerIndividuals () {
        return await EmployerIndividual.find();
    }

    static async getEmployerIndividual(id) {
        return await EmployerIndividual.findById(id)
    }

    static async deleteEmployerIndividual(id) {
        let employerIndividual = await this.getEmployerIndividual(id);

        if(!employerIndividual) {
            return "Verification not found"
        } 

        return await EmployerIndividual.findOneAndRemove({_id: employerIndividual._id});
    }

   
 }

module.exports = EmployerIndividualController;
