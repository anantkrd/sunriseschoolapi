const { json } = require('body-parser');

const moment = require('moment');
const staffModel = require('../../models/staff');
const staffAttendanceModel = require('../../models/staffAttendance');
const studentModel = require('../../models/student');
const studentAttendanceModel = require('../../models/studentAttendance');
const studentFeesModel = require('../../models/studentFees');
const classesModel = require('../../models/Classes');
const academicYearModel = require('../../models/academicYear');

/*const feesModel=require('../../models/fees');
const feesCollectionModel=require('../../models/feesCollection');
const ClassesModel=require('../../models/Classes');

*/
//const { Sequelize, DataTypes, Model, where } = require('sequelize');
module.exports = {

    getStudentById: async (req, res) => {
        try {
            id = req.query.id;
            let agentData = await studentModel.findOne({ where: { isDeleted: 'N', id: id } });
            if (agentData !== null) {
                responce = JSON.stringify({ code: '200', message: 'student details', data: agentData });
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
    getAcademicYear: async (req, res) => {
        try {
            let acadmicData = await academicYearModel.findAll({ where: { isDeleted: 'N' } });
            if (acadmicData !== null) {
                responce = JSON.stringify({ code: '200', message: 'academic Year', data: acadmicData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'Not found', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    getCurrentAcademicYear: async (req, res) => {
        try {
            let acadmicData = await academicYearModel.findOne({ where: { isDeleted: 'N', status: 'active' } });
            if (acadmicData !== null) {
                responce = JSON.stringify({ code: '200', message: 'academic Year', data: acadmicData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'Not found', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },

    getStudentByClass: async (req, res) => {
        try {
            classId = req.query.classId;
            let studentData = await studentModel.findAll({ where: { isDeleted: 'N', classId: classId, status: 'active' } });
            if (studentData !== null) {
                responce = JSON.stringify({ code: '200', message: 'student details', data: studentData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'No student found', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    addStudent: async (req, res) => {
        try {
            studentObj = await studentModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fatherName: req.body.fatherName,
                motherName: req.body.motherName,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                mobileNo: req.body.mobileNo,
                email: req.body.email,
                studentPassword: req.body.studentPassword,
                address: req.body.address,
                classId: req.body.classId,
                dateOfAdmission: req.body.admissionDate,
                academicYear: req.body.academicYear,
                status: 'active',
                isDeleted: 'N'
            });
            if (studentObj === null) {
                responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                res.status(404).send(responce);
            } else {
                responce = JSON.stringify({ code: '200', message: "student added successfully", data: studentObj });
                res.status(200).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    updateStudent: async (req, res) => {
        try {
            updateStudent = await studentModel.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fatherName: req.body.fatherName,
                motherName: req.body.motherName,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                mobileNo: req.body.mobileNo,
                email: req.body.email,
                studentPassword: req.body.studentPassword,
                address: req.body.address,
                classId: req.body.classId,
                dateOfAdmission: req.body.dateOfAdmission,
            }, {
                where: {
                    id: req.body.studentId
                }
            });
            responce = JSON.stringify({ code: '200', message: "Student updated successfully", data: updateStudent });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    deleteStudent: async (req, res) => {
        try {
            let studentId = req.query.studentId;
            deleteObj = await studentModel.update({ isDeleted: 'Y' }, { where: { id: studentId } });
            responce = JSON.stringify({ code: '200', message: "Student deleted successfully", data: deleteObj });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    addStudentAttendance: async (req, res) => {
        try {

            studentObj = await studentAttendanceModel.create({
                classId: req.body.classId,
                studentId: req.body.studentId,
                attendanceDate: req.body.attendanceDate,
                status: req.body.status,
                isDeleted: 'N'
            });
            if (studentObj === null) {
                responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                res.status(404).send(responce);
            } else {
                responce = JSON.stringify({ code: '200', message: "Staff Attendance added successfully", data: studentObj });
                res.status(200).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    updateStudentAttendance: async (req, res) => {
        try {
            updateStaff = await studentAttendanceModel.update({
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
    getClassById: async (req, res) => {
        try {
            id = req.query.id;
            let agentData = await classesModel.findOne({ where: { isDeleted: 'N', id: id } });
            if (agentData !== null) {
                responce = JSON.stringify({ code: '200', message: 'class details', data: agentData });
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
    getClass: async (req, res) => {
        try {
            let classData = await classesModel.findAll({ where: { isDeleted: 'N' } });
            if (classData !== null) {
                responce = JSON.stringify({ code: '200', message: 'classes details', data: classData });
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
    upgradStudent: async (req, res) => {
        try {
            let userId = req.body.userId;
            let classId = req.body.classId;
            let studentId = req.body.studentId;
            let nextClass = req.body.nextClass;
            let nextAcademicYear = req.body.nextAcademicYear;
            let upgradeReason = req.body.upgradeReason;
            let leftReason = req.body.leftReason;
            studentFeesObj = await studentFeesModel.findOne({ where: { classId: classId, studentId: studentId, isDeleted: 'N' } });
            if (studentFeesObj == null) {
                responce = JSON.stringify({ code: '404', message: 'Student not found', data: '' });
                res.status(404).send(responce);
                return false;
            }
            if (studentFeesObj['pending'] > 0) {
                msg = "please pay " + studentFeesObj['pending'] + " fees update student";
                responce = JSON.stringify({ code: '404', message: msg, data: '' });
                res.status(404).send(responce);
                return false;
            }
            if (upgradeReason == 'left') {
                updateStudent = await studentModel.update({
                    status: 'left',
                    leftReason: leftReason
                }, {
                    where: {
                        id: studentId
                    }
                });
                updateStudent = await studentFeesModel.update({
                    status: 'left'
                }, {
                    where: {
                        studentId: studentId,
                        classId: classId
                    }
                });
            }

            if (upgradeReason == 'pass') {

                updateStudent = await studentFeesModel.update({
                    status: 'pass'
                }, {
                    where: {
                        studentId: studentId,
                        classId: classId
                    }
                });
                updateStudent = await studentModel.update({
                    classId: nextClass,
                    academicYear: nextAcademicYear,
                }, {
                    where: {
                        id: req.body.studentId
                    }
                });

                studentFeesObj = await studentFeesModel.create({
                    classId: req.body.nextClass,
                    studentId: req.body.studentId,
                    academicYear: nextAcademicYear,
                    admissionFees: 0,
                    tutionFees: 0,
                    dressFees: 0,
                    bookFees: 0,
                    libraryFees: 0,
                    cabFees: 0,
                    other: 0,
                    total: 0,
                    paid: 0,
                    pending: 0,
                    status: 'active',
                    isDeleted: 'N'
                });
            }

            responce = JSON.stringify({ code: '200', message: 'Student updated', data: '' });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    
    getStudentAttendanceByClass: async (req, res) => {
        try {
            classId = req.query.classId;
            let studentDataObj = await studentModel.findAll({ where: { isDeleted: 'N', classId: classId, status: 'active' } });
            let studentFeesData=[];
            if (studentDataObj !== null) {
                for (const studentData of studentDataObj) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['id'];
                    let attendanceDate = moment().format("YYYY-MM-DD");
                    let attendancdeObj = await studentAttendanceModel.findOne({ where: { studentId: studentId, classId: classId, attendanceDate: attendanceDate } });
                    console.log("attendancdeObj:=" + JSON.stringify(attendancdeObj))
                    attendanceStatus='absent';
                    if (attendancdeObj !== null ) {
                        attendanceStatus = attendancdeObj['status'];
                    }
                    let mobileNo='';
                    let studentName='';
                    let academicYear='';
                    let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                    if (studentDataObj !== null) {
                        studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                        academicYear = studentDataObj['academicYear'];
                        mobileNo = studentDataObj['mobileNo'];
                    }
                    data['id'] = studentData['id'];
                    data['classId'] = classId;
                    data['studentId'] = studentId;
                    data['mobileNo'] = mobileNo;
                    data['studentName'] = studentName;
                    data['academicYear'] = academicYear;
                    data['attendanceDate'] = studentData['attendanceDate'];
                    data['status'] = attendanceStatus;
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'student attendance details', data: studentFeesData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'No student found', data: [] });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    addAttendance: async (req, res) => {
        try {
            let attendanceDate = moment().format("YYYY-MM-DD");
            let studentId = req.body.studentId;
            let classId = req.body.classId;
            //let studentData = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
            let attendancdeObj = await studentAttendanceModel.findOne({ where: { studentId: studentId, classId: classId, attendanceDate: attendanceDate } });
            console.log("attendancdeObj:=" + JSON.stringify(attendancdeObj))
            if (attendancdeObj == null ) {
                studentObj = await studentAttendanceModel.create({
                    studentId: req.body.studentId,
                    classId: req.body.classId,
                    status: req.body.status,
                    attendanceDate: attendanceDate,
                    isDeleted: 'N'
                });
                if (studentObj === null) {
                    responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                    res.status(404).send(responce);
                } else {
                    responce = JSON.stringify({ code: '200', message: "Attendance added successfully", data: studentObj });
                    res.status(200).send(responce);
                }
            } else {
                updateStudent = await studentAttendanceModel.update({
                    status: req.body.status,
                }, {
                    where: {
                        studentId: req.body.studentId,
                        classId: req.body.classId,
                    }
                });
                responce = JSON.stringify({ code: '200', message: "Attendance updated successfully", data: '' });
                res.status(200).send(responce);

            }

        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    getStudentAttendanceById: async (req, res) => {
        try {
            classId = req.query.classId;
            studentId=req.query.studentId;
            pageId = req.query.pageId;
            let start = ((pageId - 1) * 10);
            let perPage = 10;
            let rowCount = await studentAttendanceModel.count({ where: { isDeleted: 'N', classId: classId, studentId: studentId }});
            //let rowCount = await AgentDetials.count({ where: { isDeleted: 'N' }});
            totalPage = rowCount / perPage;
            totalPage = Math.ceil(totalPage);
            let studentAttendanceDataObj = await studentAttendanceModel.findAll({where: { isDeleted: 'N', classId: classId, studentId: studentId }, offset: start, limit: perPage, order: [['id', 'desc']]  });
            //let studentDataObj = await studentAttendanceModel.findAll({ where: { isDeleted: 'N', classId: classId, studentId: studentId } });
            let studentFeesData=[];
            if (studentAttendanceDataObj !== null) {
                for (const studentAttendanceData of studentAttendanceDataObj) {
                    data = {};
                    let classId = studentAttendanceData['classId'];
                    let studentId = studentAttendanceData['studentId'];
                    
                    let mobileNo='';
                    let studentName='';
                    let academicYear='';
                    let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                    if (studentDataObj !== null) {
                        studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                        academicYear = studentDataObj['academicYear'];
                        mobileNo = studentDataObj['mobileNo'];
                    }
                    data['id'] = studentAttendanceData['id'];
                    data['classId'] = classId;
                    data['studentId'] = studentId;
                    data['mobileNo'] = mobileNo;
                    data['studentName'] = studentName;
                    data['academicYear'] = academicYear;
                    data['attendanceDate'] = studentAttendanceData['attendanceDate'];
                    data['status'] = studentAttendanceData['status'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'student attendance details', data: studentFeesData,rowCount: rowCount, totalPage: totalPage  });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'No student found', data: [] });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },

}