var express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { json } = require('body-parser');

const staffController = require("./staffController");
const authenticate = require("../auth/index");
router.post('/addStaff',authenticate,staffController.addStaff);
router.get('/getstaffById', authenticate,staffController.getStaffById);
router.get('/getstaff', authenticate,staffController.getStaff);
router.post('/login', staffController.staffLogin);
router.post('/addStaffAttendance',authenticate, staffController.addStaffAttendance);
router.get('/getStaffAttendance',authenticate, staffController.getStaffAttendance);


//router.get('/get_bookings', authenticate,adminController.getAllBookings);


module.exports = router;