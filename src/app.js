const express=require('express')
const app=express()
const port=process.env.PORT ||  3000

app.use(express.json())
const db=require('./db/conn')
const Student=require('./models/students')
//here student is collection name

const studentrouter=require('../src/router/studentrouter')
//3. need to register router
app.use(studentrouter)


// app.post('/students',(req,res)=>{
//     console.log(req.body)
//     const user=new Student(req.body)
//     user.save().then(()=>{ //to save in database
//         res.status(201).send(user)

//     }).catch((err)=>{
//         res.status(400).send(err)
//         console.log(err)
//     })
//     // res.send("hello from post side")
// })

// create a new students
app.post('/students',async(req,res)=>{
    try{
        console.log(req.body)
        const user=new Student(req.body)
        const createuser= await user.save()
        res.status(201).send(createuser)
    }
    catch(err){
        res.status(400).send(err)
    }

})

//read the data of registered students
app.get('/students',async(req,res)=>{
    try{
       const studentsdata=await Student.find()
       res.send(studentsdata)
    }
    catch(err){
        res.send(err)
    }
})
//read the indvidual student data using id
app.get('/students/:id',async(req,res)=>{
    try {
        const _id=req.params.id
        console.log(_id)
        // res.send(req.params)
        const studentdata =await Student.findById({_id})
        if(!studentdata)
        {
            return res.status(404).send()//page not found
        }
        else{
            res.send(studentdata)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})


//deleting the student record
app.delete('/students/:id',async(req,res)=>{
    try {
        const _id=req.params.id
        const deletestudent= await Student.findByIdAndDelete({_id})
        if(!req.params.id){
            //invalid id
            res.status(400).send()
        }
        else{
            res.send(deletestudent)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})


// update the students by id
app.patch('/students/:id',async(req,res)=>{
    try {
        const _id=req.params.id
        const updatestudent=await Student.findByIdAndUpdate(_id,req.body,{new:true})
        //if wwe here dont write new:true here db pr toh hoejga update bt not at console
        res.send(updatestudent)


    } catch (err) {
        res.status(500).send(err)
    }
})
app.listen(port,()=>{
    console.log('connection set up at port 3000')
})