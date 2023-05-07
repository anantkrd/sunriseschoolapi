const { json } = require('body-parser');

const moment = require('moment');
const staffModel = require('../../models/staff');
const staffAttendanceModel = require('../../models/staffAttendance');
const studentModel = require('../../models/student');
const studentAttendanceModel = require('../../models/studentAttendance');
const studentFeesModel = require('../../models/studentFees');
const classesModel = require('../../models/Classes');
const academicYearModel = require('../../models/academicYear');
const feesCollectionModel = require('../../models/feesCollection');
const sequelize=require('../../config/database');

module.exports = {

    getFeesCollectionReport: async (req, res) => {
        try {
            classId = req.query.classId;
            academicYear = req.query.academicYear;
            let studentFees = await studentFeesModel.findAll({ where: { isDeleted: 'N', classId: classId, academicYear: academicYear } });
            studentFeesData = [];
            let totalFees=0;
            let totalPendingFees=0
            let totalPaidFees=0;
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    
                    let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                    if (studentDataObj !== null) {
                        studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                        academicYear = studentDataObj['academicYear'];
                    }
                    let className = '';
                    let classesModelDataObj = await classesModel.findOne({ where: { isDeleted: 'N', id: classId } });
                    if (classesModelDataObj !== null) {
                        className = classesModelDataObj['className'];
                    }
                    totalFees=totalFees+studentData['total'];
                    totalPaidFees=totalPaidFees+studentData['paid'];
                    totalPendingFees=totalPendingFees+studentData['pending'];
                    data['id'] = studentData['id'];
                    data['classId'] = studentData['classId'];
                    data['studentId'] = studentData['studentId'];
                    data['studentName'] = studentName;
                    data['className'] = className;
                    data['academicYear'] = academicYear;
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
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData,totalFees:totalFees,totalPendingFees:totalPendingFees,totalPaidFees:totalPaidFees });
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
    
    getFeesCollectionDetails: async (req, res) => {
        try {
            classId = req.query.classId;
            studentId = req.query.studentId;
            let studentFees = await feesCollectionModel.findAll({ where: { isDeleted: 'N', classId: classId, studentId: studentId } });
            studentFeesData = [];
            let totalFees=0;
            let totalPendingFees=0
            let totalPaidFees=0;
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let academicYear='';
                    let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                    if (studentDataObj !== null) {
                        studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                        academicYear = studentDataObj['academicYear'];
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
                    data['academicYear'] = academicYear;
                    data['collectionAmount'] = studentData['collectionAmount'];
                    data['pendingAmount'] = studentData['pendingAmount'];
                    data['collectionDate'] = studentData['collectionDate'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData});
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
    getStudentAttendanceReport: async (req, res) => {
        try {
            classId = req.query.classId;
            studentId = req.query.studentId;
            let studentAttendanceObj = await studentAttendanceModel.findAll({ where: { isDeleted: 'N', classId: classId, studentId: studentId } });
            studentFeesData = [];
            if (studentAttendanceObj !== null) {
                for (const studentData of studentAttendanceObj) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let academicYear='';
                    let studentDataObj = await studentModel.findOne({ where: { isDeleted: 'N', id: studentId } });
                    if (studentDataObj !== null) {
                        studentName = studentDataObj['firstName'] + " " + studentDataObj['lastName'];
                        academicYear = studentDataObj['academicYear'];
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
                    data['academicYear'] = academicYear;
                    data['attendanceDate'] = studentData['attendanceDate'];
                    data['status'] = studentData['status'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData});
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
    
    getStaffAttendanceReport: async (req, res) => {
        try {
            classId = req.query.classId;
            studentId = req.query.studentId;
            let studentFees = await feesCollectionModel.findAll({ where: { isDeleted: 'N', classId: classId, studentId: studentId } });
            studentFeesData = [];
            let totalFees=0;
            let totalPendingFees=0
            let totalPaidFees=0;
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let academicYear='';
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
                    data['academicYear'] = academicYear;
                    data['collectionAmount'] = studentData['collectionAmount'];
                    data['pendingAmount'] = studentData['pendingAmount'];
                    data['collectionDate'] = studentData['collectionDate'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData});
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
    
    getHomeTop: async (req, res) => {
        try {
            academicYear = req.query.academicYear;
            attendanceDate=moment().format("YYYY-MM-DD");
            let studentCount = await studentModel.count({ where: { isDeleted: 'N', academicYear: academicYear, status: 'active' }});
            let staffCount = await staffModel.count({ where: { isDeleted: 'N', status: 'active' }});

            let homeDataTop = await studentFeesModel.findAll({ attributes: [[sequelize.fn('sum', sequelize.col('total')), 'totalFess'],[sequelize.fn('sum', sequelize.col('paid')), 'totalPaid'],[sequelize.fn('sum', sequelize.col('pending')), 'totalPending']],where: { isDeleted: 'N', academicYear: academicYear } });
            let homeData = {};
            let totalFees=0;
            let totalPendingFees=0;
            let totalPaidFees=0;
            console.log("homeDataTop="+JSON.stringify(homeDataTop[0]))
            homeData['feesData']={};
            homeData['studentCount']=studentCount;
            homeData['staffCount']=staffCount;
            if (homeDataTop !== null) {                
                homeData['feesData']=homeDataTop[0];
                console.log("homeTopData="+JSON.stringify(homeData));                
            } 
            let attendanceData=[];
            let classList=[];
            let presentStudent=[];
            let absentStudent=[];
            let totalStudent=[];
            let classObj = await classesModel.findAll({ where: { isDeleted: 'N' } });
            for (const classData of classObj) {
                
                classId=classData['id'];
                className=classData['className'];
                classList.push(className);
                let classWiseStudent = await studentModel.count({ where: { isDeleted: 'N', status: 'active', classId:classId }});
                let presentStudentCount = await studentAttendanceModel.count({ where: { isDeleted: 'N', status: 'present',attendanceDate:attendanceDate, classId:classId }});
                let absentStudentCount=parseInt(classWiseStudent)-parseInt(presentStudentCount);
                presentStudent.push(presentStudentCount);
                absentStudent.push(absentStudentCount);
                totalStudent.push(classWiseStudent);
            }
            let attendateData={};
            attendateData['classList']=classList;
            attendateData['presentStudent']=presentStudent;
            attendateData['absentStudent']=absentStudent;
            attendateData['totalStudent']=totalStudent;
            homeData['attendateData']=attendateData;
            responce = JSON.stringify({ code: '200', message: 'Fees details', data: homeData});
            res.status(200).send(responce);
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some Internal server error", data: '' });
            res.status(500).send(responce);
        }
    },
    
    getHomeAttendance: async (req, res) => {
        try {
            classId = req.query.classId;
            studentId = req.query.studentId;
            let studentFees = await feesCollectionModel.findAll({ where: { isDeleted: 'N', classId: classId, studentId: studentId } });
            studentFeesData = [];
            let totalFees=0;
            let totalPendingFees=0
            let totalPaidFees=0;
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let academicYear='';
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
                    data['academicYear'] = academicYear;
                    data['collectionAmount'] = studentData['collectionAmount'];
                    data['pendingAmount'] = studentData['pendingAmount'];
                    data['collectionDate'] = studentData['collectionDate'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData});
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
    
    getCollectionDetails: async (req, res) => {
        try {
            let start = 0;
            let perPage = 10;
            let dataObj = [];
            //const Op = Sequelize.Op;
            classId = req.query.classId;
            studentId = req.query.studentId;

            let studentFees = await feesCollectionModel.findAll({ where: { isDeleted: 'N',classId:classId,studentId:studentId }, order: [['id', 'desc']]});
            studentFeesData = [];
            let totalFees=0;
            let totalPendingFees=0;
            let DotalPaidFees=0;
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let academicYear='';
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
                    data['academicYear'] = academicYear;
                    data['collectionAmount'] = studentData['collectionAmount'];
                    data['pendingAmount'] = studentData['pendingAmount'];
                    data['collectionDate'] = studentData['collectionDate'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData});
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
    getHomeFees: async (req, res) => {
        try {
            let start = 0;
            let perPage = 10;
            let dataObj = [];
            //const Op = Sequelize.Op;
            
            let studentFees = await feesCollectionModel.findAll({ where: { isDeleted: 'N' }, offset: start, limit: perPage, order: [['id', 'desc']]});
            studentFeesData = [];
            let totalFees=0;
            let totalPendingFees=0;
            let DotalPaidFees=0;
            if (studentFees !== null) {
                for (const studentData of studentFees) {
                    data = {};
                    let classId = studentData['classId'];
                    let studentId = studentData['studentId'];
                    let studentName = '';
                    let academicYear='';
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
                    data['academicYear'] = academicYear;
                    data['collectionAmount'] = studentData['collectionAmount'];
                    data['pendingAmount'] = studentData['pendingAmount'];
                    data['collectionDate'] = studentData['collectionDate'];
                    studentFeesData.push(data);
                }
                responce = JSON.stringify({ code: '200', message: 'Fees details', data: studentFeesData});
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
    

}