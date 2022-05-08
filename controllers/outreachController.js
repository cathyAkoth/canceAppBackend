const Outreach = require('../models/Outreach')


class OutreachController {
    static async addOutreach (data) {
        
        let outreach = new Outreach(data);

        await outreach.save()
        let outreachs = await Outreach.find();
        return outreachs;
    }
    static async fetchOutreachs () {
        return await Outreach.find();
    }

    static async getOutreach(id) {
        return await Outreach.findById(id)
    }

    static async deleteOutreach(id) {
        let outreach = await this.getOutreach(id);

        if(!outreach) {
            return "outreach form not found"
        } 

        return await Outreach.findOneAndRemove({_id: outreach._id});
    }

   
 }

module.exports = OutreachController;
