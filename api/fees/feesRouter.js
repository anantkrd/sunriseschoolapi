var express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { json } = require('body-parser');
const feesController = require("./feesController");
const authenticate = require("../auth/index");
router.get('/getFeesStudentById', authenticate,feesController.getFeesStudentById);
router.get('/getStuentFeesByClass', authenticate,feesController.getStuentFeesByClass);
router.post('/addStudentFees', authenticate,feesController.addStudentFees);
router.put('/updateStudentFees', authenticate,feesController.updateStudentFees);
router.delete('/deletetFeesCollection', authenticate,feesController.deletetFeesCollection);
router.post('/collectStudentFees', authenticate,feesController.collectStudentFees);
router.get('/getStudentFeescollection', authenticate,feesController.getStudentFeescollection);

router.put('/updateCollectStudentFees', authenticate,feesController.updateCollectStudentFees);
router.get('/getFees',feesController.getFees);
router.get('/getFeesByClass',feesController.getFeesByClass);
router.post('/addClassFees',feesController.addClassFees);
router.put('/updateClassFees',feesController.updateClassFees);

module.exports = router;