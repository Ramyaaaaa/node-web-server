const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.set('view engine','hbs'); 

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = (`${now} ${req.url} ${req.method}`);
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err) {
            console.log('Error');
        }
    });
    next();
});


app.get('/', (req,res)=> {
    //res.send("<h2>Hello</h2>");
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage: "Hey there"
    });
});



app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    }); //templates are stored in views folder by default in express
});


app.use((req,res,next)=>{
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname +"/public")); //app.use is used to register middleware

app.get('/bad',(req,res)=>{
        res.send({
            errorMessage :'Bad error'
        });
});

app.listen(3000,()=>{
    console.log("Server is up");
});

