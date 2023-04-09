const express=require('express')
const Student=require('../models/students')

//1. create a new router
const router=new express.Router()

//2. need to define router
router.get('/thapa',(req,res)=>{
    res.send('hlo guuys')
})

module.exports=router