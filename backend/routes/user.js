const express = require('express');
const router = express.Router();

const{signIn , logIn ,  getAllTasks,deleteTasks, updateTasks , 
    importantTasks , completeTasks , getimpTasks, getCompTasks ,getinCompTasks}= require('../controllers/User');

const{userTask}= require('../controllers/Task');
const {auth}= require('../middlewares/auth');



router.post('/signup' , signIn);
router.post('/login', logIn);
router.post('/taskcreate',auth , userTask);
router.get('/gettasks',auth, getAllTasks);
router.delete('/deletetask/:id' ,auth,  deleteTasks);
router.put('/updatetask/:id',auth , updateTasks );
router.put('/updateimptasks/:id',auth,importantTasks);
router.put('/updatecomptasks/:id', auth ,completeTasks);
router.get('/getimptasks',auth, getimpTasks);
router.get('/getcomptask',auth,  getCompTasks);
router.get('/getincompletetask' , auth, getinCompTasks)

module.exports=router;

 