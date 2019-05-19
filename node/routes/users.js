const express = require('express');
const router = express.Router()
const UsersController = require('../controllers/users');
const passport =  require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../routesHelper/users')

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

//signup
router.route("/signup").post(validateBody(schemas.signUpSchema), UsersController.signUp)

//signin
router.route("/signin").post(validateBody(schemas.signInSchema),  passportSignIn, UsersController.signIn)
//signout
// router.route("/signout").post(passportJWT, UsersController.signOut)

router.route("/details").post(validateBody(schemas.detailsSchema),  passportJWT, UsersController.details)

router.route("/getOppor").post(validateBody(schemas.detailsSchema),  passportJWT, UsersController.getOppor)



module.exports = router

