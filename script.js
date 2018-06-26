const express = require("express");
const hbs = require("hbs");
var $ = require('jsrender');

var app = express();


var fs = require('fs');
var pdf = require('html-pdf');


var options = { format: 'Letter',

}

app.set("view engine","hbs");

app.get("/",(req,res) =>{
    res.render("halaplay.hbs");

});

app.get("/download",(req,res) =>{
    var tmpl = fs.readFileSync('./index.html', 'utf8');
    var options = req.query;
    
    tmpl = $.templates(tmpl);
    var html = tmpl.render(options);
    pdf.create(html, options).toFile('./invoice.pdf', function(err, data) {
        if (err) return console.log(err);
        var path = require('path');     
        var file = path.join(__dirname, 'invoice.pdf'); 
        console.log('file', file);
        fs.readFile(file, function (err,data){
         response.contentType("application/pdf");
         response.send(data);
      });
    });
 
});

app.listen(3000);