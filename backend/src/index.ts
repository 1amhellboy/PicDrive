import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Better place than Google Drive")
});

app.listen(PORT,()=>{
    console.log('listening on port',PORT)
})

