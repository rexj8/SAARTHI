const express=require("express");
const path=require("path");
const hbs=require("hbs")
const chalk=require("chalk")
const app=express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const Register=require('./models/registers')
// require("./db/conn")
const port=process.env.PORT || 3000


const publicPath=path.join(__dirname, "public");
const viewsPath=path.join(__dirname, "views");
const partialsPath=path.join(__dirname, "views/partials");

// to set view engine
app.set("view engine" , "hbs")
app.set("views" , viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static('public'));
// app.use(express.static('views'));
// app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// template engine route
// app.get("",(req,res)=>{
    //     res.render("index",{
        //         channelName:"rexj8",
        //     });
// })


var Message = mongoose.model('Message',{
    name : String,
    message : String
})

var dbUrl = 'mongodb+srv://Rexj8:Mathura@123@nodejs-login.pv5db.mongodb.net/SAARTHI?retryWrites=true&w=majority'

app.get('/world/messages', (req, res) => {
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
})


app.get('/world/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user},(err, messages)=> {
        res.send(messages);
    })
})
  

app.post('/world/messages', async (req, res) => {
    try{
        var message = new Message(req.body);
        
      var savedMessage = await message.save()
      console.log('saved');
      
      var censored = await Message.findOne({message:'badword'});
      if(censored)
      await Message.remove({_id: censored.id})
        else
        io.emit('message', req.body);
        res.sendStatus(200);
    }
    catch (error){
        res.sendStatus(500);
        return console.log('error',error);
    }
    finally{
        console.log('Message Posted')
    }
  
  })
  
  
  
  io.on('connection', () =>{
      console.log('a user is connected')
    })
    
mongoose.connect(dbUrl ,{useMongoClient : true,useNewUrlParser: true,useUnifiedTopology: true} ,(err) => {
    console.log('mongodb connected',err);
})
    
    
    

app.post('/data',function(req,res){
    return res.redirect('/details')
})

MongoClient.connect(dbUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("SAARTHI");
    var myobj = { name: "name", email: "email" , amount: 100 };
    dbo.collection("donationDetails").insertOne(myobj, function(err, res) {
      if (err) throw err;
    //   console.log("1 document inserted");
      db.close();
    });
});





app.get("/" , (req,res)=>{
    res.render("home")
})
app.get("/forestfire" , (req,res)=>{
    res.render("forestfire")
})
app.get("/globalwarming" , (req,res)=>{
    res.render("globalwarming")
})
app.get("/flood" , (req,res)=>{
    res.render("flood")
})
app.get("/volcanoerruption" , (req,res)=>{
    res.render("volcano")
})
app.get("/hurricane" , (req,res)=>{
    res.render("hurricane")
})
app.get("/earthquake" , (req,res)=>{
    res.render("earthquake")
})
app.get("/drought" , (req,res)=>{
    res.render("drought")
})
app.get("/contact" , (req,res)=>{
    res.render("contact")
})
app.get("/contact/team" , (req,res)=>{
    res.render("team")
})
app.get("/worldchat" , (req,res)=>{
    res.render("worldchat")
})
app.get("/donate" , (req,res)=>{
    res.render("donate")
})
app.get("/login" , (req,res)=>{
    res.render("login")
})
app.get("/register" , (req,res)=>{
    res.render("register")
})

app.post("/register" , async (req,res)=>{
    try{
        // console.log(req.body.name)
        // res.send(req.body.name)// use to send data at /register after submit

        const password = req.body.password
        const cpassword = req.body.confirmpassword

        
        
        if(password===cpassword){
            const registerUser = new Register({
                name:req.body.name,
                email:req.body.email,
                password:password,
                confirmpassword:cpassword
            })
            
            const registered = await registerUser.save();
            res.status(201).render("login")
            
            // res.render("index",{
            //     name:req.body.name
            // });
        }
        else{
            res.send("Password is not Matching")
        }
        
    }catch(e){
        res.status(400).send(e)
    }
})

app.post("/login",async(req,res)=>{
    try {

        const email=req.body.email;
        const password=req.body.password;

        const usermail = await Register.findOne({email:email})
        // {email:email} can only be written as {email}
        
        // res.send(usermail) // use to send data at json
        // console.log(usermail)
        
        if(usermail.password===password){
            res.status(201).render("home",{
                name:usermail.name
            });
            // res.status(201).render("index")
        }
        else{
            res.send("Incorrect Password")
        }




    } catch (error) {
        res.status(400).send("invalid Email")
    }
})



app.get("*" , (req,res)=>{
    res.render("404");
})
// app.get("/forestfire/*" , (req,res)=>{
//     res.render("404");
// })
// app.get("/globalwarming/*" , (req,res)=>{
//     res.render("404");
// })
// app.get("/flood/*" , (req,res)=>{
//     res.render("404");
// })
// app.get("/volcano/*" , (req,res)=>{
//     res.render("404");
// })

// app.listen(port,()=>{
//     console.log(chalk.green.underline.inverse(`listening on port ${port}`));
// })

var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});