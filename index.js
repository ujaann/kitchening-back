const express=require('express');
const userRoutes=require('./routes/user_route');

const app=express();

const PORT=5000;
app.listen(PORT,()=>{   
    console.log(`App running in port: ${PORT}`);
    
})

app.use(express.json());

app.get('/',(req,res)=>res.json({"message":"Hello World"}));

app.use('/user',userRoutes);
