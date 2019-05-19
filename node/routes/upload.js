const express = require('express');
const router = express.Router()
const UploadController = require('../controllers/upload');
const passport =  require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../routesHelper/upload')

const passportJWT = passport.authenticate('jwt', { session: false });


router.route("/addUserProof").post( passportJWT, UploadController.addUserProof)
router.route("/removeUserProof").post(validateBody(schemas.removeSchema), passportJWT, UploadController.removeUserProof)

router.route("/addExamProof").post( passportJWT, UploadController.addExamProof)
router.route("/removeExamProof").post( validateBody(schemas.removeSchema), passportJWT, UploadController.removeExamProof)

router.route("/viewUserProof").post( validateBody(schemas.removeSchema), passportJWT, UploadController.viewUserProof)
router.route("/viewExamProof").post( validateBody(schemas.removeSchema), passportJWT, UploadController.viewExamProof)


module.exports = router

