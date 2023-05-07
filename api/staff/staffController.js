const { json } = require('body-parser');

const moment = require('moment');
const staffModel = require('../../models/staff');
const staffAttendanceModel = require('../../models/staffAttendance');
var jwt = require('jsonwebtoken');
/*const feesModel=require('../../models/fees');
const feesCollectionModel=require('../../models/feesCollection');
const ClassesModel=require('../../models/Classes');

const studentModel=require('../../models/student');
const studentAttendanceModel=require('../../models/studentAttendance');
const studentFeesModel=require('../../models/studentFees');*/
//const { Sequelize, DataTypes, Model, where } = require('sequelize');
module.exports = {

    getStaffById: async (req, res) => {
        try {
            staffId = req.query.staffId;
            let agentData = await staffModel.findOne({ attributes: { exclude: ['staffPassword'] }, where: { isDeleted: 'N', id: staffId } });
            if (agentData !== null) {
                responce = JSON.stringify({ code: '200', message: 'Staff details', data: agentData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'No agent found', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    getStaff: async (req, res) => {
        try {
            staffId = req.query.staffId;
            let agentData = await staffModel.findAll({ attributes: { exclude: ['staffPassword'] }, where: { isDeleted: 'N' } });
            if (agentData !== null) {
                responce = JSON.stringify({ code: '200', message: 'Staff details', data: agentData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'No Staff found', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    getStaffAttendance: async (req, res) => {
        try {
            attendanceDate = req.query.attendanceDate;
            let staffData = await staffModel.findAll({ attributes: { exclude: ['staffPassword'] }, where: { isDeleted: 'N', status: 'active' } });
            if (staffData !== null) {
                staffDataObj = [];
                for (const DataObj of staffData) {
                    data = {};
                    staffId = DataObj['id'];
                    attendanceStatus = 'absent';
                    staffAttendance = await staffAttendanceModel.findOne({ where: { staffId: staffId, attendanceDate: attendanceDate } });
                    if (staffAttendance != null) {
                        attendanceStatus = staffAttendance['status'];
                    }
                    data['id'] = DataObj['id'];
                    data['attendanceDate'] = attendanceDate;
                    data['attendanceStatus'] = attendanceStatus;

                    data['firstName'] = DataObj['firstName'];
                    data['lastName'] = DataObj['lastName'];
                    data['gender'] = DataObj['gender'];
                    data['type'] = DataObj['type'];
                    data['mobileNo'] = DataObj['mobileNo'];
                    data['email'] = DataObj['email'];
                    data['id'] = DataObj['address'];
                    data['education'] = DataObj['education'];
                    data['experience'] = DataObj['experience'];
                    data['salary'] = DataObj['salary'];
                    data['joinDate'] = DataObj['joinDate'];
                    data['id'] = DataObj['id'];
                    data['id'] = DataObj['id'];

                    staffDataObj.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Staff details', data: staffDataObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'No Staff found', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    addStaff: async (req, res) => {
        try {
            let staffData = await staffModel.findOne({ attributes: { exclude: ['staffPassword'] }, where: { isDeleted: 'N', email: req.body.email } });
            if (staffData === null) {
                staffObj = await staffModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                    mobileNo: req.body.mobileNo,
                    type: req.body.type,
                    staffPassword: req.body.staffPassword,
                    email: req.body.email,
                    address: req.body.address,
                    education: req.body.education,
                    experience: req.body.experience,
                    salary: req.body.salary,
                    joinDate: req.body.joinDate,
                    status: 'active',
                    isDeleted: 'N'
                });
                if (staffObj === null) {
                    responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                    res.status(404).send(responce);
                } else {
                    responce = JSON.stringify({ code: '200', message: "Staff added successfully", data: '' });
                    res.status(200).send(responce);
                }
            } else {
                responce = JSON.stringify({ code: '400', message: "staff with given email already exist", data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    updateStaff: async (req, res) => {
        try {

            updateStaff = await staffModel.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                mobileNo: req.body.mobileNo,
                type: req.body.type,
                staffPassword: req.body.staffPassword,
                email: req.body.email,
                address: req.body.address,
                education: req.body.education,
                experience: req.body.experience,
                salary: req.body.salary,
                joinDate: req.body.joinDate
            }, {
                where: {
                    id: req.body.staffId
                }
            });
            responce = JSON.stringify({ code: '200', message: "Staff updated successfully", data: updateStaff });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    deleteStaff: async (req, res) => {
        try {
            let staffId = req.query.staffId;
            deleteObj = await staffModel.update({ isDeleted: 'Y' }, { where: { id: staffId } });
            responce = JSON.stringify({ code: '200', message: "Staff deleted successfully", data: deleteObj });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    addStaffAttendance: async (req, res) => {
        try {
            staffId = req.body.staffId;
            attendanceDate = req.body.attendanceDate,
                staffAttendanceObj = await staffAttendanceModel.findOne({ where: { staffId: staffId, attendanceDate: attendanceDate } })
            if (staffAttendanceObj === null) {
                staffObj = await staffAttendanceModel.create({
                    staffId: req.body.staffId,
                    attendanceDate: req.body.attendanceDate,
                    status: req.body.status,
                    isDeleted: 'N'
                });
                if (staffObj === null) {
                    responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                    res.status(404).send(responce);
                } else {
                    responce = JSON.stringify({ code: '200', message: "Staff Attendance added successfully", data: staffObj });
                    res.status(200).send(responce);
                }
            } else {
                updateStaff = await staffAttendanceModel.update({
                    status: req.body.status
                }, {
                    where: {
                        staffId: req.body.staffId,
                        attendanceDate: req.body.attendanceDate,
                        isDeleted: 'N'
                    }
                });

                responce = JSON.stringify({ code: '200', message: "Staff Attendance updated successfully", data: staffObj });
                res.status(200).send(responce);
            }

        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    updateStaffAttendance: async (req, res) => {
        try {
            updateStaff = await staffAttendanceModel.update({
                attendanceDate: req.body.attendanceDate,
                status: req.body.status,
            }, {
                where: {
                    id: req.body.attendanceId
                }
            });
            responce = JSON.stringify({ code: '200', message: "Staff attendance updated successfully", data: updateStaff });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    staffLogin: async (req, res) => {
        try {
            let userName = req.body.userName;
            let staffPassword = req.body.password;
            var userData = await staffModel.findOne({ attributes: { exclude: ['staffPassword'] }, where: { email: userName, staffPassword: staffPassword, isDeleted: 'N', status: 'active' } });

            if (userData !== null) {
                const token = jwt.sign({ id: userData['id'] }, process.env.secrete);
                responce = JSON.stringify({ code: '200', message: 'Verified', data: userData, token: token });
                res.status(200).send(responce)
            } else {
                responce = JSON.stringify({ code: '404', message: 'Invalid User', data: '' });
                res.status(404).send(responce)
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while login", data: '' });
            res.status(500).send(responce);
        }
    },
}