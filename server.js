const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

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


// connection.connect(function(){
// connection.query(
//})
//  function(error, date) {}
// )

const connection = mysql.createConnection(connectionConfig);


connection.connect(function (err) {
    if (err) throw err
    startToDo();
});



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
                "Add role",
                "Add department",
                "Exit",
            ]
        }
        //use case switch? make it easier with and cleaner code. 
    ]).then(function (response) {
        switch (response.todo) {
            case "Add an employee?":
                newEmployee();
                break;

            case "Add a role?":
                newRole();
                break;

            case "Add a department?":
                newDepartment();
                break;

            case "View all Employees?":
                viewEmployees();
                break;

            case "View all employees by department?":
                viewDepartment();
                break;

            case "View all employees by role?":
                viewRole();
                break;

            case "Exit":
                connection.end();
                break;

        }
    })
}

async function newEmployee() {
    const employeeResponses = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is your employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is your employee's last name?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the employee's role id?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the managers id?"
        }


    ]);
    
    var employee = { 
        firstName: employeeResponses[0].name, 
        lastName: employeeResponses[1].name, 
        roleId: employeeResponses[2].name, 
        managerId: employeeResponses[3].name}
         connection.query(
                "INSERT INTO employee SET ?",
               {
                    first_name = employee.firstName,
                    last_name = employee.lastName,
                    role_id = employee.roleId,
                    manager_id = employee.managerId 
              },
                     function (error) {
                    if (error) throw error;
                    startToDo();
                    connection.end();
                });
    
    }
    
    



                // use async return promises to recieve responses? and put into database?

