const monggoose = require("mongoose")

monggoose.connect("mongodb+srv://Rexj8:Mathura@123@nodejs-login.pv5db.mongodb.net/NodeJsLogin?retryWrites=true&w=majority" , {
    //use to not get depreciation warning
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection successful`)
}).catch((e)=>{
    console.log(`no connection`)
})

