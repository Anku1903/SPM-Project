const express = require("express");
const router = require("./router/routes");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 7000;
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://mydb01:Mydb01@firstdb.yskyo.mongodb.net/firstdb?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on('connected',()=>{
console.log('system connceted to cloud database');
});

app.get("/",(req,res) => {
    return res.json({msg: "server is working..."})
})
app.use("/api",router);



app.listen(PORT,() => {
    console.log("Server is live....")
})