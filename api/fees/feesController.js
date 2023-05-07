const { json } = require('body-parser');

const moment = require('moment');
const staffModel = require('../../models/staff');
const staffAttendanceModel = require('../../models/staffAttendance');
const studentModel = require('../../models/student');
const studentAttendanceModel = require('../../models/studentAttendance');
const studentFeesModel = require('../../models/studentFees');
const feesModel = require('../../models/fees');
const classesModel = require('../../models/Classes');
const feesCollectionModel = require('../../models/feesCollection');
const { constrainedMemory } = require('process');

//const { Sequelize, DataTypes, Model, where } = require('sequelize');
module.exports = {

    getFeesStudentById: async (req, res) => {
        try {
            studentId = req.query.studentId;
            classId = req.query.classId;
            //acadmicYear = req.query.acadmicYear;
            let studentData = await studentFeesModel.findOne({ where: { isDeleted: 'N', classId: classId, studentId: studentId } });
            if (studentData !== null) {

                data = {};
                let classId = studentData['classId'];
                let studentId = studentData['studentId'];
                let studentName = '';
                let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                if (studentDataObj !== null) {
                    studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                }
                let className = '';
                let classesModelDataObj = await classesModel.findOne({ where: { isDeleted: 'N', id: classId } });
                if (classesModelDataObj !== null) {
                    className = classesModelDataObj['className'];
                }
                data['id'] = studentData['id'];
                data['classId'] = studentData['classId'];
                data['studentId'] = studentData['studentId'];
                data['studentName'] = studentName;
                data['className'] = className;
                data['academicYear'] = studentData['academicYear'];
                data['admissionFees'] = studentData['admissionFees'];
                data['tutionFees'] = studentData['tutionFees'];
                data['dressFees'] = studentData['dressFees'];
                data['bookFees'] = studentData['bookFees'];
                data['libraryFees'] = studentData['libraryFees'];
                data['cabFees'] = studentData['cabFees'];
                data['other'] = studentData['other'];
                data['total'] = studentData['total'];
                data['paid'] = studentData['paid'];
                data['pending'] = studentData['pending'];
                //studentFeesData.push(data);

                responce = JSON.stringify({ code: '200', message: 'Fees details', data: data });
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
    getStuentFeesByClass: async (req, res) => {
        try {
            classId = req.query.classId;
            academicYear = req.query.academicYear;
            let studentFees = await studentFeesModel.findAll({ where: { isDeleted: 'N', classId: classId, academicYear: academicYear } });
            studentFeesData = [];
            //[{"classId":1,"studentId":1,"academicYear":"2023-24","":1000,"":3000,"":100,"":500,"":100,"":2000,"":100,"":6800,"":0,"":6800,"status":"active","isDeleted":"N","createdAt":"2023-04-24T17:16:38.000Z","updatedAt":"2023-04-24T17:16:38.000Z"}]}
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                    if (studentDataObj !== null) {
                        studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                    }
                    let className = '';
                    let classesModelDataObj = await classesModel.findOne({ where: { isDeleted: 'N', id: classId } });
                    if (classesModelDataObj !== null) {
                        className = classesModelDataObj['className'];
                    }
                    data['id'] = studentData['id'];
                    data['classId'] = studentData['classId'];
                    data['studentId'] = studentData['studentId'];
                    data['studentName'] = studentName;
                    data['className'] = className;
                    data['academicYear'] = studentData['academicYear'];
                    data['admissionFees'] = studentData['admissionFees'];
                    data['tutionFees'] = studentData['tutionFees'];
                    data['dressFees'] = studentData['dressFees'];
                    data['bookFees'] = studentData['bookFees'];
                    data['libraryFees'] = studentData['libraryFees'];
                    data['cabFees'] = studentData['cabFees'];
                    data['other'] = studentData['other'];
                    data['total'] = studentData['total'];
                    data['paid'] = studentData['paid'];
                    data['pending'] = studentData['pending'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData });
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
    addStudentFees: async (req, res) => {
        try {

            studentId = req.body.studentId;
            let academicYear = '';
            let studentData = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
            if (studentData == null || studentData.length == 0) {
                responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                res.status(404).send(responce);
            } else {
                academicYear = studentData['academicYear'];
            }
            let totalFees = parseInt(req.body.admissionFees) + parseInt(req.body.tutionFees) + parseInt(req.body.dressFees) + parseInt(req.body.bookFees) + parseInt(req.body.libraryFees) + parseInt(req.body.cabFees) + parseInt(req.body.other);
            studentFeesObj = await studentFeesModel.create({
                classId: req.body.classId,
                studentId: req.body.studentId,
                academicYear: academicYear,
                admissionFees: req.body.admissionFees,
                tutionFees: req.body.tutionFees,
                dressFees: req.body.dressFees,
                bookFees: req.body.bookFees,
                libraryFees: req.body.libraryFees,
                cabFees: req.body.cabFees,
                other: req.body.other,
                total: totalFees,
                paid: 0,
                pending: totalFees,
                status: 'active',
                isDeleted: 'N'
            });
            if (studentFeesObj === null) {
                responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                res.status(404).send(responce);
            } else {
                responce = JSON.stringify({ code: '200', message: "student fees added successfully", data: studentFeesObj });
                res.status(200).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    updateStudentFees: async (req, res) => {
        try {
            let totalFees = parseInt(req.body.admissionFees) + parseInt(req.body.tutionFees) + parseInt(req.body.dressFees) + parseInt(req.body.bookFees) + parseInt(req.body.libraryFees) + parseInt(req.body.cabFees) + parseInt(req.body.other);
            let paid = req.body.paid;
            if(paid==null || paid=='' || paid==undefined){
                paid=0;
            }
            let pending = parseInt(totalFees) - parseInt(paid);
            console.log("pending="+pending+" paid="+paid)
            updateStudent = await studentFeesModel.update({
                academicYear: req.body.academicYear,
                admissionFees: req.body.admissionFees,
                tutionFees: req.body.tutionFees,
                dressFees: req.body.dressFees,
                bookFees: req.body.bookFees,
                libraryFees: req.body.libraryFees,
                cabFees: req.body.cabFees,
                other: req.body.other,
                total: totalFees,
                paid: paid,
                pending: pending,
            }, {
                where: {
                    studentId: studentId,
                    classId: classId,
                    isDeleted: 'N'
                }
            });
            responce = JSON.stringify({ code: '200', message: "Student Fees updated successfully", data: updateStudent });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    deletetFeesCollection: async (req, res) => {
        try {
            let collectionId = req.query.collectionId;
            studentFeesCollectionObj = await feesCollectionModel.findOne({ where: { id: collectionId, isDeleted: 'N' } });
            if (studentFeesCollectionObj == null) {
                responce = JSON.stringify({ code: '404', message: "No record found", data: '' });
                res.status(404).send(responce);
            } else {
                let collectionAmount = studentFeesCollectionObj['collectionAmount'];
                let classId = studentFeesCollectionObj['classId'];
                let studentId = studentFeesCollectionObj['studentId'];
                studentFeesObj = await studentFeesModel.findOne({ where: { classId: classId, studentId: studentId, isDeleted: 'N' } });
                if (studentFeesObj !== null) {
                    let totalFees = studentFeesObj['total'];
                    let paid = studentFeesObj['paid'];
                    let pending = studentFeesObj['pending'];
                    let newPaid = parseInt(paid) - parseInt(collectionAmount);
                    let newPending = parseInt(pending) - parseInt(collectionAmount);
                    updateStudent = await studentFeesModel.update({
                        paid: newPaid,
                        pending: newPending,
                    }, {
                        where: {
                            studentId: studentId,
                            classId: classId,
                            isDeleted: 'N'
                        }
                    });
                    //console.log("collectionDate==" + req.body.collectionDate);
                    feesCollectionObj = await feesCollectionModel.update({
                        isDeleted: 'Y'
                    }, {
                        where: {
                            id: collectionId,
                            isDeleted: 'N'
                        }
                    });
                    responce = JSON.stringify({ code: '200', message: "Fees updated successfully", data: updateStudent });
                    res.status(200).send(responce);
                } else {
                    responce = JSON.stringify({ code: '404', message: "No record found", data: '' });
                    res.status(404).send(responce);
                }
            }

        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },

    getStudentFeescollection: async (req, res) => {
        try {
            let studentId = req.query.studentId;
            let classId = req.query.classId;
            let studentData = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
            studentName = studentData['firstName'] + " " + studentData['lastName'];
            mobileNo = studentData['mobileNo'];

            let classData = await classesModel.findOne({ where: { isDeleted: 'N', id: classId } });
            className = classData['className'];
            studentFeesObj = await feesCollectionModel.findAll({ where: { classId: classId, studentId: studentId, isDeleted: 'N' } });
            if (studentFeesObj !== null) {
                responce = JSON.stringify({ code: '200', message: "Fees detials", data: studentFeesObj, studentName: studentName, mobileNo: mobileNo, className: className });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "No record found", data: '' });
                res.status(404).send(responce);
            }

        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    collectStudentFees: async (req, res) => {
        try {

            let studentId = req.body.studentId;
            let classId = req.body.classId;
            let amount = req.body.amount;
            studentFeesObj = await studentFeesModel.findOne({ where: { classId: classId, studentId: studentId, isDeleted: 'N' } });
            if (studentFeesObj !== null) {
                let totalFees = studentFeesObj['total'];
                let paid = studentFeesObj['paid'];
                let pending = studentFeesObj['pending'];
                let newPaid = parseInt(paid) + parseInt(amount);
                let newPending = parseInt(totalFees) - parseInt(newPaid);
                updateStudent = await studentFeesModel.update({
                    total: totalFees,
                    paid: newPaid,
                    pending: newPending,
                }, {
                    where: {
                        studentId: studentId,
                        classId: classId,
                        isDeleted: 'N'
                    }
                });
                console.log("collectionDate==" + req.body.collectionDate);
                feesCollectionObj = await feesCollectionModel.create({
                    classId: req.body.classId,
                    studentId: req.body.studentId,
                    collectionAmount: amount,
                    pendingAmount: newPending,
                    collectionDate: req.body.collectionDate,
                    isDeleted: 'N'
                });
                responce = JSON.stringify({ code: '200', message: "Fees updated successfully", data: updateStudent });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "No record found", data: '' });
                res.status(404).send(responce);
            }

        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    updateCollectStudentFees: async (req, res) => {
        try {
            let studentId = req.body.studentId;
            let classId = req.body.classId;
            let collectionId = req.body.collectionId;
            collectionIdObj = await feesCollectionModel.findOne({ where: { id: collectionId, isDeleted: 'N' } });
            if (collectionIdObj !== null) {
                amount = collectionIdObj['collectionAmount'];
                studentFeesObj = await studentFeesModel.findOne({ where: { classId: classId, studentId: studentId, isDeleted: 'N' } });
                if (studentFeesObj !== null) {
                    let totalFees = studentFeesObj['total'];
                    let paid = studentFeesObj['paid'];
                    let pending = studentFeesObj['pending'];
                    let newPaid = parseInt(paid) - parseInt(amount);
                    let newPending = parseInt(pending) + parseInt(amount);
                    updateStudent = await studentFeesModel.update({
                        total: totalFees,
                        paid: newPaid,
                        pending: newPending,
                    }, {
                        where: {
                            studentId: studentId,
                            classId: classId,
                            isDeleted: 'N'
                        }
                    });
                    updateStudent = await feesCollectionModel.update({
                        isDeleted: 'Y',
                    }, {
                        where: {
                            id: collectionId
                        }
                    });
                    responce = JSON.stringify({ code: '200', message: "Fees updated successfully", data: updateStudent });
                    res.status(200).send(responce);
                } else {
                    responce = JSON.stringify({ code: '404', message: "No record found", data: '' });
                    res.status(404).send(responce);
                }
            }


        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
    getFees: async (req, res) => {
        try {
            let feesData = await feesModel.findAll({ include: { model: classesModel }, where: { isDeleted: 'N' } });
            if (feesData !== null) {
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: feesData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'Fees not added', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    getFeesByClass: async (req, res) => {
        try {
            classId = req.query.classId;
            let feesData = await feesModel.findOne({ where: { isDeleted: 'N', classId: classId } });
            if (feesData !== null) {
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: feesData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: 'Fees not added for this class', data: '' });
                res.status(404).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    addClassFees: async (req, res) => {
        try {
            let classId = req.body.classId;
            let feesData = await feesModel.findAll({ where: { isDeleted: 'N', classId: classId } });

            if (feesData === null || feesData.length == 0) {
                studentFeesObj = await feesModel.create({
                    classId: req.body.classId,
                    admissionFees: req.body.admissionFees,
                    tutionFees: req.body.tutionFees,
                    dressFees: req.body.dressFees,
                    bookFees: req.body.bookFees,
                    libraryFees: req.body.libraryFees,
                    cabFees: req.body.cabFees,
                    other: req.body.other,
                    status: 'active',
                    isDeleted: 'N'
                });
                if (studentFeesObj === null) {
                    responce = JSON.stringify({ code: '404', message: "something went wrong", data: '' });
                    res.status(404).send(responce);
                } else {
                    responce = JSON.stringify({ code: '200', message: "Fees added successfully", data: studentFeesObj });
                    res.status(200).send(responce);
                }
            } else {
                responce = JSON.stringify({ code: '400', message: "class fees already exist", data: '' });
                res.status(200).send(responce);
            }

        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "some internal error. Please try after sometime", data: '' });
            res.status(500).send(responce);
        }
    },
    updateClassFees: async (req, res) => {
        try {
            let feesId = req.body.feesId,
                updateStudent = await feesModel.update({
                    admissionFees: req.body.admissionFees,
                    tutionFees: req.body.tutionFees,
                    dressFees: req.body.dressFees,
                    bookFees: req.body.bookFees,
                    libraryFees: req.body.libraryFees,
                    cabFees: req.body.cabFees,
                    other: req.body.other,
                }, {
                    where: {
                        id: feesId
                    }
                });
            responce = JSON.stringify({ code: '200', message: "Fees updated successfully", data: updateStudent });
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrive data", data: '' });
            res.status(500).send(responce);
        }
    },
}