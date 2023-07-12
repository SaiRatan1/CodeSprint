const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const authenticate = require('../middleware/userAuth');

const Question = require('../models/questionsSchema')

router.get('/getQuestions', async (req,res)=>{
	try{

		const data = await Question.find();
		if(!data){
			res.status(400).json({message:'Couldnt get questions data'});
		}
		res.status(201).json(data);
	}
	catch(err){
		console.log(err,'in getQuestions');
		res.status(500).json({message:'Internal server error at getQuestions'})
	}
})

router.get('/:id',async (req,res)=>{
    // const id = req.params.id;
    const data = await Question.findById(req.params.id);
    if(!data){
        res.status(500).json({message:'Couldn\'t get the questions data'})
    }
    res.status(201).json(data);
})


//SUBMIT CODE
router.post('/submitcode',authenticate,async (req,res)=>{
	try{

		const { code,id } = req.body;
		
		let result = Math.round(Math.random());
		const currentDateAndTime = new Date();
		
		const months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		
		const month = months[currentDateAndTime.getMonth()];
		const date = currentDateAndTime.getDate();
		const year = currentDateAndTime.getFullYear();
		const hours = currentDateAndTime.getHours();
		const minutes = currentDateAndTime.getMinutes();
		const seconds = currentDateAndTime.getSeconds();
		
		const submissionDateTime = `${month} ${date}, ${year} ${hours}:${minutes}:${seconds}`;

		
		if(result==1){
			result  = 'Accepted'
		}
		else{
			result = 'Rejected'
		}
		const questionID = id;
		const submission = {questionID,code,result,submissionDateTime};
		
		const user = req.rootUser;
		user.questionsList.push(submission);
		await user.save();
		res.status(201).json({submission})

	}
	catch(err){
		res.status(500).json({message:'Internal Server Error'})
	}
	
})

router.get('/submissions/:id',authenticate, async (req,res)=>{
	try{
		const id  = req.params.id;
		
		const allSubmissions = req.rootUser.questionsList.filter((item)=>{
			return item.questionID==id
		});
		if(allSubmissions.length===0){
			res.json({message:'No submissions data found'})
		}
		else{

			res.status(201).json({allSubmissions})
		}
	}
	catch(err){
		res.status(500).json({error:'Internal Server Error'})
	}
})


module.exports = router;