const express=require("express");
const path=require("path");
const hbs=require("hbs")
const chalk=require("chalk")
const app=express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const port=3000;

const publicPath=path.join(__dirname, "public");
const viewsPath=path.join(__dirname, "views");
const partialsPath=path.join(__dirname, "views/partials");

// to set view engine
app.set("view engine" , "hbs")
app.set("views" , viewsPath)
hbs.registerPartials(partialsPath)
// {{>header}} use html for partials in index.hbs

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

var dbUrl = 'mongodb://localhost:27017/root'

app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
})


app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user},(err, messages)=> {
        res.send(messages);
    })
})
  

app.post('/messages', async (req, res) => {
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
app.get("/chat" , (req,res)=>{
    res.render("chat")
})



// app.get("*" , (req,res)=>{
//     res.render("404");
// })
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