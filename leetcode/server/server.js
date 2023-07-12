require('dotenv').config();

const express = require('express')
const app =  express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cors()) 
mongoose.set('strictQuery', true)

const User = require('./models/userSchema')
const Question = require('./models/questionsSchema')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const bcrypt = require("bcrypt");
const saltRounds = 5;
app.use(express.json());

const questionroutes = require('./routes/questionroutes');
// DB -
const DB = 'mongodb+srv://SaiRatan:SaiRatan@cluster0.39xb8ki.mongodb.net/leetDB?retryWrites=true&w=majority'

mongoose.connect(DB)
.then(()=>{console.log('Connection successfull')})
.catch((err)=>{console.log(`Couldn't connect to database`)})


app.use('/api/problems',questionroutes);




app.get('/api/test',(req,res)=>{
    console.log('hi in test')
    res.json({
        'name':'ratan'
    })
})



// LOGIN ROUTE
app.post('/api/loginroute', async (req, res) => {

    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email })

    if(foundUser){

        const ismatch = await bcrypt.compare(password,foundUser.password);
        if(!ismatch){
            res.status(400).json({ error: "INVALID CREDENTIALS"})
        }
        else{
            const token = await foundUser.generateAuthToken();
            await foundUser.save()

            res.cookie("access_token",token,{
                httpOnly:true
            })

            res.json({message:"User login successful"});
        }

    }
    else{
        res.status(400).json({ error: "INVALID CREDENTIALS"})

    }
})


// SIGNUP ROUTE
app.post('/api/signuproute',async (req,res)=>{
    try{
    const {email,password}  = req.body;
    
    const hash = await bcrypt.hash(password,saltRounds)

    const newUser = new User({email,password:hash})
    const token = await newUser.generateAuthToken();
    await newUser.save()

    res.cookie("access_token",token,{
        httpOnly:true
    })

    res.status(201).json({success:'sign in successfull'})
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:'Internal server error at signup'})
    }

})



app.listen(8080,()=>{console.log('Running on port 8080')})