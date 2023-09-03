const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const session = require('express-session')
const multer = require('multer');
const path = require('path');
const routes = require('./routes/index');
const upload = multer({limits:{
  fieldSize: 25 * 1024 * 1024
}}); 

const app = express();
app.use(cors({
    origin: '*'
}))



// for parsing application/json data
app.use(express.json({limit:'50mb'})); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit:'50mb' })); 


// for parsing multipart/form-data
app.use(upload.array());



//To open public folder such as images
 app.use('/public', express.static(path.resolve(__dirname,'public')));

app.use(cookieParser())
app.set('trust proxy', 1)


app.use('/', routes); //to use the routes








app.use((req, res, next)=>{
    res.status(404).send('Error 404: Oops something went wrong. Request not found')
})


const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=>{
    console.log(`The program is running on port ${PORT}`)
})  
.on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });