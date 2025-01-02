const express=require('express');
const router=express.Router();
const {findAll, save, findById, deleteById}=require('../controllers/user_controller');

router.get('/',findAll);

router.get('/:id',findById);

router.post('/',save);

router.delete('/:id',deleteById);

router.put('/',(req,res)=>{
    res.json({"message":"UPDATE a  user"});
});

module.exports= router;