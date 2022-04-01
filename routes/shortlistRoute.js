const router = require("express").Router();
const shortlistController = require("../controllers/shortlistController");



/**
 * @swagger
 * components:
 *   schemas:
 *     shortlist:
 *       type: object
 *       
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id 
 *         productId:
 *           type: string
 *           
 *         quantity:
 *           type: string
 *         
 */


 

/**
 * @swagger
 * /shortlist:
 *   get:
 *     summary: Returns the list of all shortlisted
 *     tags: [shortlist]
 *     responses:
 *       200:
 *         description: The list of shortlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/shortlist'
 */

 
//  /**
//   * @swagger
//   * tags:
//   *   name: shortlist
//   *   
//   */

/**
 * @swagger
 * /shortlist:
 *   get:
 *     summary: returns a list of shortlisted candidates
 *     tags: [Shortlist]
 *     responses:
 *       200:
 *         description: The list of all shortlisted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/shortlist'
 */


router.get("/", shortlistController.getShortlist);



   
 /**
 * @swagger
 * /shortlist:
 *   post:
 *     summary: adds a shortlist
 *     tags: [Shortlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/shortlist'
 *     responses:
 *       200:
 *         description: The candidate was successfully verified added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/shortlist'
 *       500:
 *         description: Some server error
 */
  
router.post("/", shortlistController.addItemToShortlist);

/**
 * @swagger
 * /shortlist/delete/{id}:
 *   delete:
 *     summary: Remove the shortlist by id
 *     tags: [Shortlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The shortlist id
 * 
 *     responses:
 *       200:
 *         description: The shortlist was deleted
 *       404:
 *         description: The shortlist was not found
 */

router.delete("/", shortlistController.emptyShortlist);
module.exports = router;