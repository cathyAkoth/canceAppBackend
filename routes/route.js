const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     authentication:
 *       type: object
 *       
 *       properties:
 *         
 *         email:
 *           type: string
 *           
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         
 *           
 *         
 *       
 */

 /**
  * @swagger
  * tags:
  *   name: Authentication/Authorization
  *   
  */


 /**
 * @swagger
 * /signup:
 *   post:
 *     summary: creates a new sign up
 *     tags: [Authentication/Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authentication'
 *     responses:
 *       200:
 *         description: The user successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/authentication'
 *       500:
 *         description: Some server error
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: logs in
 *     tags: [Authentication/Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authentication'
 *     responses:
 *       200:
 *         description: users successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/authentication'
 *       500:
 *         description: Some server error
 */


router.post('/login', userController.login);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Authentication/Authorization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/authentication'
 *       404:
 *         description: The user was not found
 */


router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

/**
 * @swagger
 * /
 *   get:
 *     summary: Returns the list of all signed up users
 *     tags: [Authentication/Authorization]
 *     responses:
 *       200:
 *         description: The list of the signed up users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/authentication'
 */

 
 /**
  * @swagger
  * tags:
  *   name: Authentication/Authorization
  *   
  */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all signed up users
 *     tags: [Authentication/Authorization]
 *     responses:
 *       200:
 *         description: The list of signed up users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/authentication'
 */


router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Authentication/Authorization]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/authentication'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/authentication'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */


router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Authentication/Authorization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */


router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;