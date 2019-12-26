var mysql = require("mysql");
var inquirer = require("inquirer");
//import inquirer
 var connection = mysql.createConnection({
     host: "localhost",
  
     // Your port; if not 3306
     port: 3306,
  
     // Your username
     user: "root",
  
     // Your password
     password: "Drake_8596",
     database: "CMSDB"
   });
   
  connection.connect(function(err){
    if (err) throw err;
    addDepartment();
  })

function queryAllDepartments(){
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        console.table(res);
    })
}

function addDepartment(){
    //inquirer to get info
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the deparment name"
    }).then(function(response){

        connection.query("INSERT INTO departments SET ?",
        {
            name: response.name
        },
        function(err, res){
            if (err) throw err;
            console.log(res)
        })
    })

}

//add role
//ask which department
//select id from deparments where name = (whatever user entered)