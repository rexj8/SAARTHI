const express=require("express");
const path=require("path");
const hbs=require("hbs")
const app=express();
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
app.use(express.static('views'));

// template engine route
// app.get("",(req,res)=>{
//     res.render("index",{
//         channelName:"rexj8",
//     });
// })

app.get("/" , (req,res)=>{
    res.render("home")
})
app.get("/forestfire" , (req,res)=>{
    res.render("forestfire")
})


app.get("*" , (req,res)=>{
    res.render("404");
})
app.get("/forestfire/*" , (req,res)=>{
    res.render("404");
})

app.listen(port,()=>{
    console.log("listening");
})