const router  = require('express').Router()
const AgentVerificationController = require('../controllers/agentVerification.controller')



/**
 * @swagger
 * components:
 *   schemas:
 *     agentVerification:
 *       type: object
 *       
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id 
 *         firstName:
 *           type: string
 *           
 *         lastName:
 *           type: string
 *         nin:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *            type: string
 *         district: 
 *             type: string
 *       
 */

 /**
  * @swagger
  * tags:
  *   name: AgentVerification
  *   
  */

/**
 * @swagger
 * /agentVerification:
 *   get:
 *     summary: Returns the list of all Agents verified
 *     tags: [AgentVerification]
 *     responses:
 *       200:
 *         description: The list of the agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AgentVerification'
 */

 
 /**
  * @swagger
  * tags:
  *   name: AgentVerification
  *   
  */

/**
 * @swagger
 * /agentVerification:
 *   get:
 *     summary: Returns the list of all agents Verified
 *     tags: [AgentVerification]
 *     responses:
 *       200:
 *         description: The list of all agents verified
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/agentVerification'
 */



router.get('', async(req, res) => {
    let agentVerifications = await AgentVerificationController.fetchAgentVerifications();
    res.json({
        data: agentVerifications
    })
})

/**
 * @swagger
 * /agentVerification/add:
 *   post:
 *     summary: creates a new verification
 *     tags: [AgentVerification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/agentVerification'
 *     responses:
 *       200:
 *         description: The Agent was successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/agentVerification'
 *       500:
 *         description: Some server error
 */

router.post('/add', async (req, res) => {
    let data = req.body;
    let agentVerification = await AgentVerificationController.addAgentVerification(data)
    
    return res.status(201).json({
        message: agentVerification
    })
})

/**
 * @swagger
 * /agentVerification/{id}:
 *   get:
 *     summary: Get the agentverification by id
 *     tags: [AgentVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The AgentVerification id
 *     responses:
 *       200:
 *         description: The AgentVerification description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/agentVerification'
 *       404:
 *         description: The AgentVerification was not found
 */

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await AgentVerificationController.getAgentVerification(id);

    if(!data) {
        return res.status(404).json({
            message: "details not found"
        })
    }
    return res.json({
        data
    })
})

/**
 * @swagger
 * /agentVerification/update/{id}:
 *  put:
 *    summary: Update the agentVerification by the id
 *    tags: [AgentVerification]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The agentVerification id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/agentVerification'
 *    responses:
 *      200:
 *        description: The AgentVerification was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/agentVerification'
 *      404:
 *        description: The AgentVerification was not found
 *      500:
 *        description: Some error happened
 */


router.put('/update/id', async(req, res) => {
    
    let {id} = req.params
    let agentVerification = await AgentVerificationController.getAgentVerification(id);
    if(!agentVerification) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await AgentVerificationController(id);
    return res.json({
        message: "agent verification  updated successfully"
    })
})

/**
 * @swagger
 * /agentVerification/delete/{id}:
 *   delete:
 *     summary: Remove the agent by id
 *     tags: [AgentVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The  id
 * 
 *     responses:
 *       200:
 *         description: The agent verification was deleted
 *       404:
 *         description: The verification was not found
 */
router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let agentDetails = await AgentVerificationController.deleteAgentVerification(id);
    return res.json({
        agentDetails
    })
})



module.exports = router;