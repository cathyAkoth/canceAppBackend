
const AgentVerification = require('../models/AgentVerification')


class AgentVerificationController {
    static async addAgentVerification (data) {
        
        let agentVerification = new AgentVerification(data);

        await agentVerification.save()
        let agentVerifications = await AgentVerification.find();
        return agentVerifications;
    }
    static async fetchAgentVerifications () {
        return await AgentVerification.find();
    }

    static async getAgentVerification(id) {
        return await AgentVerification.findById(id)
    }

    static async deleteAgentVerification(id) {
        let agentVerification = await this.getAgentVerification(id);

        if(!agentVerification) {
            return "Verification not found"
        } 

        return await AgentVerification.findOneAndRemove({_id: agentVerification._id});
    }

   
 }

module.exports = AgentVerificationController;
