const Exam  = require('../models/exam');
// const User = require('../models/user');

module.exports = {
    addExam: (req, res, next) =>{
        const newExam = new Exam({ ...req.value.body, by : req.user._id });
        newExam.save((err, exam)=>{
            if(err) return res.status(403).json({error:err});
            return res.send(exam);
        });
        
    },

    updateExam : (req, res, next) => {
        const { _id : user_id } = req.user
        const { _id : exam_id} = req.value.body
        // console.log(user_id, exam_id)
        
        Exam.findOneAndUpdate({ _id : exam_id }, {"$set" : {...req.value.body, "by" : user_id, "scribe":null}}, { upsert:true }, (err, exam)=>{
            if(err) return res.status(500).json({error:err});
            if(!exam) return res.status(403).json({error:"No exam present"});
            return res.json({ ...exam._doc, message : "Scribe added" });
        });
    },

    deleteExam : (req, res, next) => {
        const { _id : exam_id} = req.value.body
        Exam.findOneAndRemove({ _id : exam_id }, (err, exam)=>{
            if(err) return res.status(500).json({error:err});
            if(!exam) return res.status(403).json({error:"No exam present"});
            return res.json(exam);
        })
    },

    listExams : (req, res, next) => {

        let user_id;
        if(req.user.as === "scribe") {
            user_id = req.user._id;
            Exam.find({ scribe : user_id }, (err, exam)=>{
                if(err) return res.status(500).json({error:err});
                if(!exam) return res.json({});
                return res.json(exam);
            })
        }else {
            user_id = req.user._id;
            Exam.find({ by : user_id }, (err, exam)=>{
                if(err) return res.status(500).json({error:err});
                if(!exam) return res.json({});
                return res.json(exam);
            })
        }
    },

    addScribeToExam : (req, res, next) => {
        
        const { _id : exam_id } = req.body;
        const { _id : user_id, as : reg} = req.user;

        if(reg === "scribe"){
            Exam.findOneAndUpdate({ _id : exam_id }, {"$set" : {"scribe" : user_id}}, { upsert:true }, (err, exam)=>{
                if(err) return res.status(500).json({error:err});
                if(!exam) return res.status(403).json({error:"No exam present"});
                return res.json({ ...exam._doc, message : "Scribe added" });
            });
        }
        else{
            return res.status(400).json({error:"Not allowed to"})
        }
    
    },

    removeScribeFromExam: (req, res, next)=>{
        const { _id : exam_id } = req.value.body
        Exam.findOneAndUpdate({ _id : exam_id }, {"$set" : {"scribe":null}}, { upsert:true }, (err, exam)=>{
            if(err) return res.status(500).json({error:err});
            if(!exam) return res.status(403).json({error:"No exam present"});
            return res.json({ ...exam._doc, message : "Scribe added" });
        });
    }
}