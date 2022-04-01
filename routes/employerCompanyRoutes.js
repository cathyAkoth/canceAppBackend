const router  = require('express').Router();
const multer = require('multer');
const EmployerCompanyController = require('../controllers/employerCompany.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     employerCompanyVerification:
 *       type: object
 *       
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id 
 *         contactfirstName:
 *           type: string
 *           
 *         contactlastName:
 *           type: string
 *         companyName:
 *           type: string
 *         country:
 *           type: string
 *         address:
 *            type: string
 *         district: 
 *             type: string
 *         phoneNumber:
 *              type: string
 *         exportLicenseUpload:             
 *               type: string
 *          incorporationCertificateUpload:
 *               type: string
 *       
 */

 /**
  * @swagger
  * tags:
  *   name: EmployerCompanyVerification
  *   
  */

/**
 * @swagger
 * /employer/company:
 *   get:
 *     summary: Returns the list of all employer company verified
 *     tags: [employerVerification]
 *     responses:
 *       200:
 *         description: The list of the employer verification for company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/employerCompanyVerification'
 */

 
 /**
  * @swagger
  * tags:
  *   name: EmployerCompanyVerification
  *   
  */

/**
 * @swagger
 * /employer/company:
 *   get:
 *     summary: Returns the list of all employer company Verified
 *     tags: [EmployerCompanyVerification]
 *     responses:
 *       200:
 *         description: The list of all employer company verified
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/employerCompanyVerification'
 */
router.get('', async(req, res) => {
    let employerCompanys = await EmployerCompanyController.fetchCandidateVerifications();
    res.json({
        data: employerCompanys
    })
})

/**
 * @swagger
 * /employer/company/add:
 *   post:
 *     summary: creates a new verification
 *     tags: [EmployerCompanyVerification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/employerCompanyVerification'
 *     responses:
 *       200:
 *         description: The employer was successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/employerCompanyVerification'
 *       500:
 *         description: Some server error
 */
//  var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
//     });
//     var upload = multer({ storage: storage })
  
    router.post('/add', async (req, res) => {
        let data = req.body;
        let employerCompany = await EmployerCompanyController.addEmployerCompany(data)
        
        return res.status(201).json({
            message: employerCompany
        })
    })

/**
 * @swagger
 * /employer/company/{id}:
 *   get:
 *     summary: Get the employer companyverification by id
 *     tags: [EmployerCompanyVerification]
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
 *               $ref: '#/components/schemas/employerCompanyVerification'
 *       404:
 *         description: The EmployerVerification was not found
 */

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await EmployerCompanyController.getEmployerCompany(id);

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
 * /employer/company/update/{id}:
 *  put:
 *    summary: Update the employerCompanyVerification by the id
 *    tags: [EmployerCompanyVerification]
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
 *            $ref: '#/components/schemas/employerCompanyVerification'
 *    responses:
 *      200:
 *        description: The employerVerification was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/employerCompanyVerification'
 *      404:
 *        description: The EmployerVerification was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id/update', async(req, res) => {
    
    let {id} = req.params
    let employerCompany = await EmployerCompanyController.getEmployerCompany(id);
    if(!employerCompany) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await EmployerCompanyController(id);
    return res.json({
        message: "candidate verification  updated successfully"
    })
})

/**
 * @swagger
 * /employer/company/delete/{id}:
 *   delete:
 *     summary: Remove the employerVerification by id
 *     tags: [EmployerCompanyVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employerVerified id
 * 
 *     responses:
 *       200:
 *         description: The employerVerification was deleted
 *       404:
 *         description: The employerVerification was not found
 */

router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let data = await EmployerCompanyController.deleteEmployerCompany(id);
    return res.json({
        data
    })
})



module.exports = router;