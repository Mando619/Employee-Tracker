const mysql = require("mysql");
const cTable = require("console.table");
const inquirer =  require("inquirer");

//const Employee = require("Employee");


const connectionConfig = {
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_trackerdb"
};

const connection = mysql.createConnection(connectionConfig);

const newEmployee = [];

startToDo();

function startToDo() {
        inquirer.prompt([
            {
                type: "list"
            },
            {
                name: "todo"
            },
            {
                message: "What would you like to do?"
            },
            {
                choices: [
                   "View all employees",
                   "View all employees by department",
                   "View all employees by role",
                   "Add employee",
                   "Finished",
                ]
            }
        
        ]).then(function(response){
            if (response.startToDo === "View all employees") {
                viewEmployees();
            }
            if (response.startToDo === "View all employees by department") {
                viewDepartment();
            }
            if (response.startToDo === "View all employees by role") {
                viewRole();
            }
            if (response.startToDo === "Add employee") {
                newEmploy();
            }
            else if (response.ToDo === "Finished") {
            console.log("You Have Finished!") 
            }
            else {
                connection.end();
            }
        }) 
}

