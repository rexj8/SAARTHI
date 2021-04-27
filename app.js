const express=require("express");
const path=require("path");
const hbs=require("hbs")
const chalk=require("chalk")
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
app.get("/globalwarming" , (req,res)=>{
    res.render("globalwarming")
})
app.get("/flood" , (req,res)=>{
    res.render("flood")
})
app.get("/volcanoeruption" , (req,res)=>{
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



app.get("*" , (req,res)=>{
    res.render("404");
})
app.get("/forestfire/*" , (req,res)=>{
    res.render("404");
})
app.get("/globalwarming/*" , (req,res)=>{
    res.render("404");
})
app.get("/flood/*" , (req,res)=>{
    res.render("404");
})
app.get("/volcano/*" , (req,res)=>{
    res.render("404");
})

app.listen(port,()=>{
    console.log(chalk.green.underline.inverse(`listening on port ${port}`));
})