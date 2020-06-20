const express = require('express')
const path = require('path')
const hbs = require('hbs')
const authenticate = require('./api/login')

const app = express()
const port = process.env.port || 3000

const staticPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')

app.set('views', viewsPath)
app.set('view engine', 'hbs')

app.use(express.static(staticPath))
app.use(express.urlencoded({extended:false}))

app.get('',(req,res) => {
    res.render('login')
})

app.post('', async(req,res) => {
    let {email,password,date} = req.body
    date = date.replace(/-/g, '')
    
    const result = await authenticate(email,password,date)
    
    if(result){
        res.render('dashboard')
    }
    else{
        res.render("login",{message:"Invalid Credentials"})
    }
})


app.listen(port, () =>{
    console.log("Server running at port " + port)
})