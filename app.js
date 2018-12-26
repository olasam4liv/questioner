const express = require('express');
const app = express();
app.get('/', function(req, res){
    res.send('Hello world');
});

app.get('/', function(req, res){
    res.send('home', );
});

app.listen(3000, function(){
    console.log('server started on port 3000')
});
// var express =  require('express');
// var app = express();

// app.get('/', function(req, res){
// res.send('This is the home page');
// });

 

// app.listen(3000,  function(){
//     console.log('My app');
// }); 