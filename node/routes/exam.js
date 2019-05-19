const express = require('express');
const router = express.Router()
const ExamController = require('../controllers/exam');
const passport =  require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../routesHelper/exam')

const passportJWT = passport.authenticate('jwt', { session: false });


router.route("/addExam").post(validateBody(schemas.examSchema), passportJWT, ExamController.addExam)

router.route("/addScribeToExam").post(validateBody(schemas.updateExamSchemaId), passportJWT, ExamController.addScribeToExam)

router.route("/removeScribeFromExam").post(validateBody(schemas.updateExamSchemaId), passportJWT, ExamController.removeScribeFromExam)

router.route("/deleteExam").post(validateBody(schemas.updateExamSchemaId), passportJWT, ExamController.deleteExam)

router.route("/updateExam").post(validateBody(schemas.updateExamSchema), passportJWT, ExamController.updateExam)

router.route("/listExams").post(validateBody(schemas.listExams), passportJWT, ExamController.listExams)


// router.route("/signout").post(passportJWT, UsersController.signOut)

module.exports = router

