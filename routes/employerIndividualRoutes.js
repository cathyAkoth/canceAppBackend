const router  = require('express').Router()
const EmployerIndividualController = require('../controllers/employerIndividual.controller');
const EmployerIndividual = require('../models/EmployerIndividual');


/**
 * @swagger
 * components:
 *   schemas:
 *     individualEmployerVerification:
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
 * /employer:
 *   get:
 *     summary: Returns the list of all Agents verified
 *     tags: [IndividualEmployerVerification]
 *     responses:
 *       200:
 *         description: The list of the individualEmployerVerification
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/individualEmployerVerification'
 */

 
 

/**
 * @swagger
 * /employer:
 *   get:
 *     summary: Returns the list of all individual employers Verified
 *     tags: [IndividualEmployerVerification]
 *     responses:
 *       200:
 *         description: The list of all individual employers verified
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/individualEmployerVerification'
 */


router.get('', async(req, res) => {
    let employerIndividuals = await EmployerIndividualController.fetchEmployerIndividuals();
    res.json({
        data: employerIndividuals
    })
})

/**
 * @swagger
 * /employer/add:
 *   post:
 *     summary: creates a new verification
 *     tags: [IndividualEmployerVerification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/individualEmployerVerification'
 *     responses:
 *       200:
 *         description: The employer was successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IndividualEmployerVerification'
 *       500:
 *         description: Some server error
 */

router.post('/add', async (req, res) => {
    let data = req.body;
    let employerIndividual = await EmployerIndividualController.addEmployerIndividual(data)
    
    return res.status(201).json({
        message: employerIndividual
    })
})

/**
 * @swagger
 * /employer/{id}:
 *   get:
 *     summary: Get the employerverification by id
 *     tags: [IndividualEmployerVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employerVerification id
 *     responses:
 *       200:
 *         description: The employerVerification description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/individualEmployerVerification'
 *       404:
 *         description: The EmployerVerification was not found
 */

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await EmployerIndividualController.getEmployerIndividual(id);

    if(!data) {
        return res.status(404).json({
            message: "details not found"
        })
    }
    return res.json({
        data
    })
})

// router.put('/update/:id', async(req, res) => {
    
//     let {id} = req.params
//     let employerIndividual = await EmployerIndividualController.getEmployerIndividual(id);
//     if(!employerIndividual) {
//         return res.status(404).json({
//             message: "verification not found"
//         }) 
//     }
//     await  EmployerIndividualController(id);
//     return res.json({
//         message: "employer verification  updated successfully"
//     })
// })
/**
 * @swagger
 * /employer/update/{id}:
 *  put:
 *    summary: Update the employerVerification by the id
 *    tags: [IndividualEmployerVerification]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The employerVerification id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/individualEmployerVerification'
 *    responses:
 *      200:
 *        description: The EmployerVerification was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/individualEmployerVerification'
 *      404:
 *        description: The EmployerVerification was not found
 *      500:
 *        description: Some error happened
 */

router.get('/update/:id', async (req, res) => {
    try {
        const updateEmp = await EmployerIndividual.findOne({ _id: req.params.id })
        res.render('updateEmp', { user: updateEmp })
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
  })


// Route to save the updated data.
router.post('/update', async (req, res) => {
  try {
      await EmployerIndividual.findOneAndUpdate({_id:req.query.id}, req.body)
     res.redirect('/employer');
  } catch (err) {
      res.status(404).send("Unable to update item in the database");
  }
})

/**
 * @swagger
 * /employer/delete/{id}:
 *   delete:
 *     summary: Remove the employerVerification by id
 *     tags: [IndividualEmployerVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The EmployerVerified id
 * 
 *     responses:
 *       200:
 *         description: The employerVerification was deleted
 *       404:
 *         description: The employerVerification was not found
 */

router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let data = await EmployerIndividualController.deleteEmployerIndividual(id);
    return res.json({
        data
    })
})



module.exports = router;