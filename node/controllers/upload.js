const User  = require('../models/user');
const Exam = require('../models/exam');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = {
    addUserProof : (req, res, next) =>{
        const { _id } = req.user;
        let form = new formidable.IncomingForm();
        form.uploadDir = path.join("uploads","user")
        form.keepExtensions = true;
        form.parse(req, (err, fields, files)=>{
            const { name } = fields;
            const { file } = files
            if(!file || !name){
                return res.status(500).json({})
            }
            let file_name =  file.path.split(path.sep).pop();
            
            User.findOneAndUpdate({_id}, {"$set" : {[name]:file_name}}, (err, user)=>{
                if(err) return res.status(500).json({error:err});
                if(!user) return res.status(403).json({error:"login again"})
                return res.json({ file_name : file.name, file_path : file_name });
            });
            
        });

    },
    removeUserProof : (req, res, next) =>{
        const { name, file_name } = req.value.body;
        const { _id : user_id } = req.user;

        let file_path = path.join("uploads", "user", file_name);
        fs.unlink(file_path, (err)=>{
            if(err) return res.status(400).json({error:err});
            User.findOneAndUpdate({_id:user_id}, {"$set":{[name]:"test.pdf"}}, (err, user)=>{
                if(err) return res.status(500).json({error:err});
                if(!user) return res.status(403).json({error:"login again"})
                res.json({message:"Removed"})
            })            
        })
    },  

    addExamProof : (req, res, next) =>{
        let form = new formidable.IncomingForm();
        form.uploadDir = path.join("uploads","exam")
        form.keepExtensions = true;
        form.parse(req, (err, fields, files)=>{
            const { name, _id} = fields;
            const { file } = files
            if(!file || !name || !_id){
                return res.status(500).json({})
            }
            let file_name =  file.path.split(path.sep).pop();
            
            Exam.findOneAndUpdate({_id}, {"$set" : {[name]:file_name}}, (err, user)=>{
                if(err) return res.status(500).json({error:err});
                if(!user) return res.status(403).json({error:"login again"})
                return res.json({ file_name : file.name, file_path : file_name });
            });
            
        });
    },

    removeExamProof : (req, res, next) =>{
        const { name, file_name, _id } = req.value.body;

        let file_path = path.join("uploads", "exam", file_name);
        fs.unlink(file_path, (err)=>{
            if(err) return res.status(400).json({error:err});
            Exam.findOneAndUpdate({_id}, {"$set":{[name]:"test.pdf"}}, (err, user)=>{
                if(err) return res.status(500).json({error:err});
                if(!user) return res.status(403).json({error:"login again"})
                res.json({message:"Removed"})
            })            
        })
    }, 

    viewUserProof: (req, res, next) =>{
        const { name, file_name } = req.value.body;
        var file = fs.createReadStream(path.join("uploads", "user", file_name));
        var stat = fs.statSync(path.join("uploads", "user", file_name));
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${name}`);
        file.pipe(res);
    },

    viewExamProof: (req, res, next) =>{
        const { name, file_name } = req.value.body;
        var file = fs.createReadStream(path.join("uploads", "exam", file_name));
        var stat = fs.statSync(path.join("uploads", "exam", file_name));
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${name}`);
        file.pipe(res);
    },
    
    
}