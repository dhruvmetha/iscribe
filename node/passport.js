const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./configurations');
const User = require('./models/user');

//JWT Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.JWT_SECRET,
    passReqToCallback: true
  }, async (req, payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.sub);
  
      // If user doesn't exists, handle it
      if (!user) {
        return done(null, false);
      }
  
      // Otherwise, return the user
      req.user = user;
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    // console.log(password)
    try {
      // Find the user given the email
      User.findOne({"email": email}, (err, user)=>{
          if(err)  throw err;
          if (!user) {
            return done(null, false);
          }
        
    
          // Check if the password is correct
          user.isValidPassword(password, (err, isMatch)=>{
            // If not, handle it
            if(err) throw err;
            if (!isMatch) {
                return done(null, false);
            }
            
            // Otherwise, return the user
            done(null, user);
          });
        
          

      });
      
      // If not, handle it
      
    } catch(error) {
      done(error, false);
    }
  }));