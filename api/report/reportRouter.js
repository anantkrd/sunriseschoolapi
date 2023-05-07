var express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { json } = require('body-parser');
const reportController = require("./reportController");
const authenticate = require("../auth/index");
router.get('/getFeesCollectionReport', authenticate,reportController.getFeesCollectionReport);

router.get('/getFeesCollectionDetails', authenticate,reportController.getFeesCollectionDetails);
router.get('/getStudentAttendanceReport', authenticate,reportController.getStudentAttendanceReport);

router.get('/getStaffAttendanceReport', authenticate,reportController.getStaffAttendanceReport);
router.get('/getHomeTop', authenticate,reportController.getHomeTop);
router.get('/getHomeAttendance', authenticate,reportController.getHomeAttendance);
router.get('/getHomeFees', authenticate,reportController.getHomeFees);
router.get('/getCollectionDetails', authenticate,reportController.getCollectionDetails);
//router.get('/getStaffSalaryReport', authenticate,reportController.getStaffSalaryReport);
module.exports = router;