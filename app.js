const fs = require("fs");
const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/form.html");
});

var myObj;
app.post("/result",(req,res)=>{
    var student_id = req.body.std_id;
    var std_name =  req.body.stdname;
    var address = req.body.stdadd;
    var math = parseInt(req.body.math);
    var eng = parseInt(req.body.eng);
    var phy = parseInt(req.body.phy);
    var chem = parseInt(req.body.chem);
    var sst = parseInt(req.body.sst);

    var total  = parseInt(math + eng + phy + chem + sst);
    var avg = parseInt(total/5);
    var grade;
    if (avg >= 90 && avg<=100) {
        grade = "A";
      } else if (avg >= 80 && avg<90) {
        grade = "B";
      } else if (avg >= 70 && avg<80) {
        grade = "C";
      } else if (avg >= 60 && avg<70) {
        grade = "D";
      } else if (avg >= 33 && avg < 60) {
        grade = "E";
      } else if (avg < 33) {
        grade = "F";
      }
      
      let obj={
        StudentId : parseInt(`${student_id}`),
        StudentName : `${std_name}` ,
        Address : `${address}` ,
        Total_Marks_Obtained : parseInt(`${total}`) ,
        Average : parseInt(`${avg}`) , 
        Grade : `${grade}` 
      }
    
      var data=fs.readFileSync("data.json");
      myObj=JSON.parse(data);
      myObj.push(obj);



   var updatedData=JSON.stringify(myObj);

   fs.writeFile("data.json",updatedData,(err)=>{
    if(err){
      console.log(err);
    }

    else {
      console.log("New Data added");
    }
   })


   fs.readFile("data.json",(err)=>{
    if(err){
      console.log(err);
    }

    else {
      console.log(fs.readFileSync("data.json").toString());
    }
   })

   return res.json({"Student Data":obj});
});

   
app.get("/get/all",(req,res)=>{
  return res.json({"Student Data":records});
} )


module.exports=app;