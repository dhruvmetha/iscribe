const User  = require('../models/user');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configurations');

signToken = user => {
    return JWT.sign({
      iss: 'iscribe.in',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
  }

module.exports = {
    signUp: (req, res, next) =>{
        const { email } = req.value.body;
        User.findOne({email}, (err, existing_user)=>{
            if(err) return res.status(500).json({error:err});
            if(existing_user) return res.status(403).json({error:"User exists with this email"});

            const newUser = new User(req.value.body);
          
            newUser.save((err, user)=>{
                if(err) return res.status(403).json({error:err});
                const token = signToken(user);
                return res.send({ user, token })
            });
        })
    },
    signIn: (req, res, next) =>{
        const token = signToken(req.user);
        const { user } = req;
        return res.status(200).json({ user, token });   
    },

    details : (req, res, next) =>{
        const { user } = req;
        return res.status(200).json({ user });   
    },
    getOppor : (req, res, next) =>{
        const { _id } = req.user; 
        fetch("http://localhost:3002/getIds", {
            method: 'post',
            headers: {
              "Content-type": "application/json"
            },
            body: req.user
          }).then(data=>{
              data.json().then(ids=>{
                  User.findOneAndUpdate({_id}, {"$set" : { "opportunity" :  ids.arr }}, (err, user)=>{
                    if(err) return res.status(500).json({error:err});
                    User.findOne({_id}, (err, user)=>{
                        res.json(user)
                    })
                  })
              }).catch(err=>{
                return res.status(500).json({error:err});
              })
          }).catch(err=>{
            return res.status(500).json({error:err});
          })

    }
}