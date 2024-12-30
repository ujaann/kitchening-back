const express=require('express');
const userRoutes=require('./routes/user_route');
const connectDB =require('./config/db');


const app=express();

const PORT=5000;

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

connectDB().then(()=>{
    app.listen(PORT,()=>{   
        console.log(`App running in port: ${PORT}`); 
    });
});


app.use('/api/user',userRoutes);
