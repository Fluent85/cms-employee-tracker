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
   
// connection.connect(function(err){
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return
//     }
//     mainPrompt();
// })
connection.connect(function(err){
    if (err) {
        console.error("error connecting:" + err.stack);
        return
    }
    mainPrompt();
})

function mainPrompt(){
    inquirer.prompt([
        {
        type: "list",
        message: "What do you want to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "Quit"],
        name: "action"
    }
    ]).then(function(answer){
        switch (answer.action) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View Departments":
                queryAllDepartments()
                break;
            case "View Roles":
                queryAllRoles()
                break;
            case "View Employees":
                queryAllEmployees()
                break;
            case "Update Employee Roles":
                    updateEmployeeRoles()
                    break;
            default:
                console.log("***** THANK YOU FOR USING THE CMS DATABASE *****")
                connection.end();
        }
    })
}

// Add Department
function addDepartment(){
    //inquirer to get info
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the deparment name."
    }).then(function(response){
        //"UPDATE WHATEVER WHERE id = " + response.id;

        connection.query("INSERT INTO departments SET ?",
        {
            name: response.name
        },
        function(err, res){

            if (err) throw err;
            console.log(res)
            mainPrompt();
        })
    })
}

// Add Role
function addRole(){
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the person's title?"
            },
            {
                type: "number",
                name: "salary",
                message: "What is the person's salary?"
            },
            {
                type: "number",
                name: "department_id",
                message: "What is the person's department id?"
            }
        ]).then(function(response){
            console.log(response)
            connection.query("INSERT INTO roles SET ?",
            response,
            function(err, res){
                if (err) throw err;
                console.log(res)
                mainPrompt();
            })
        })
    })
}

// add Employee
function addEmployee(){
    // ​// inquirer to get info
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name."
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name."
        },
        {
            type: "number",
            name: "salary",
            message: "What is the person's salary?"      

        },
        {
            type: "input",
            name: "role_id",
            message: "What is the person's role id?"
        },
        {
            type: "number",
            name: "manager_id",
            message: "What is the person's manager id?"
        }
    ]).then(function(response){
        console.log(response)
        connection.query("INSERT INTO employees SET ?",
        response,
        function(err, res){
            if (err) throw err;
            console.log(res)
            mainPrompt();
        })
    })
})
}

// Updated Employee roles
function updateEmployeeRoles(){
    console.log("updateEmployeeRoles");
    connection.query("SELECT * FROM employees", function(err, res){
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the person's employee id?"
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the person's new role id?"
            },
            {
                type: "number",
                name: "salary",
                message: "What is the person's new salary?"
            }
        ]).then(function(response){
            console.log(response)
            connection.query("UPDATE employees SET ? where id = " + response.id,
            response,
            function(err, res){
                if (err) throw err;
                console.log(res)
                mainPrompt();
            })
        })
    })
} 

   
// View Departments
function queryAllDepartments(){
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        console.table(res);
        mainPrompt();
    })
}

// View roles
function queryAllRoles(){
    connection.query("SELECT title, salary, departments.name AS department_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id", function(err, res){
        if (err) throw err;
        console.table(res);
        mainPrompt();
    })
}

// View Employees
function queryAllEmployees(){
    connection.query("SELECT * FROM employees, departments.name", function(err, res){
        if (err) throw err;
        console.table(res);
        mainPrompt();
    })
}

//add role
//ask which department
//select id from deparments where name = (whatever user entered)