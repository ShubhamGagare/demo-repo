
const express = require("express");

const fs = require("fs");

const app = express();

const path = require("path");

app.get("/files/",function(req,res){
    
    fs.readdir(path.join(__dirname,'./files/'),function(err,files){

        if(err){
            return res.status(500).json({ error:"Failed to retrive data"});
        }
        res.json(files);
    });

});

app.get('/files/:filename', function(req, res) {
    const filepath = path.join(__dirname, './files/', req.params.filename);
  
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(404).send('File not found');
      }
      res.send(data);
    });
  });
  
  app.all('*', (req, res) => {
    res.status(404).send('Route not found');
  });
  
  module.exports = app;

app.listen(3000);
