const express = require('express');

const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
var nodemailer = require('nodemailer'); 
var req = require('request');

   
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
     user: 'aminejbali32@gmail.com',
     pass: 'hellokids'
 }
});






app.post('/sendmail' , (req, res)=>{



          
               
               
  var mailOptions = {
     from: req.body.from,
     to: req.body.to,
     subject: req.body.subject,
     text: req.body.message
 };
           
           
           
 transporter.sendMail(mailOptions, function(error, info){
    if (error) {
     console.log(error);
    } else {
         console.log('Email sent: ' + info.response);
         }
 });
     
     
});
 


let a = setInterval(oneSecondFunction, 60000);
async function oneSecondFunction() {

    await req('http://127.0.0.1/portfolio/index.php?controller=formation&action=consulte', function(err, res, body) {
       // console.log(res.body);
        let response = JSON.parse(body);
        let ln = response.length;
        var today = new Date();
        var time = today.getHours() * 3600 + today.getMinutes() * 60 ;
       
        let formatteur;

         req('http://127.0.0.1/portfolio/index.php?controller=user&action=getAllProf', function(err, res, body) {

             formatteur = JSON.parse(body);


             for(let i=0; i <ln ; i++){

                let formationTime = response[i].dateremise;
               
                let formation = response[i];
                let hours = parseInt(formationTime.charAt(0) +  formationTime.charAt(1)); 
                let min = parseInt(formationTime.charAt(3) +  formationTime.charAt(4));
    
               let fTime = hours * 3600 + min * 60;
                let emails = [];
               if (time == fTime){
    
                let ln = formatteur.length;
                for (let i =0; i<ln; i++){
                    if(formatteur[i].categorie === formation.categorie){
    
                        emails.push(formatteur[i].email);
                    }
                }
    
    
    
                var mailOptions = {
                    from: 'aminejbali32@gmail.com',
                    to: emails,
                    subject: 'lezem thabet l cours',
                    text: 'lezem thabet courek yehdik '
                };
                          
                          
                          
                transporter.sendMail(mailOptions, function(error, info){
                   if (error) {
                    console.log(error);
                   } else {
                        console.log('Email sent: ' + info.response);
                        }
                });
               }
               else {
                   console.log('dont send mail !!!!');
               }
            }
        });



    });


 

}








app.listen(3000,()=>{
    console.log('====================================');
    console.log("server work!!!");
    console.log('====================================');
});