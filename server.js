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
            type: "list",
            name: "todo",
            message: "Hello! What would you like to do?",
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
            case "Add employee":
                newEmployee();
                break;

            case "Add role":
                newRole();
                break;

            case "Add department":
                newDepartment();
                break;

            case "View all employees":
                viewEmployees();
                break;

            case "View all employees by department":
                viewDepartment();
                break;

            case "View all employees by role":
                viewRole();
                break;

            case "Update employee role":
                updateRole();
                break;

            case "Exit":
                connection.end();
                break;

        }
    })
}

function newEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
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


    ]).then(function (response) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.roleId,
                manager_id: response.managerId
            },
            function (error) {
                if (error) throw error;
                startToDo();
            }
        );
    });
}

function newRole() {
    inquirer.prompt([
        {
            type: "list",
            name: "title",
            message: "What is the title of the employee?",
            choices: [
                "Sales Person",
                "Sales Lead",
                "Accountant",
                "Softwear Engineer",
                "Lead Engineer",
                "Lawyer",
                "Legal Team Lead",
            ]
        },
        {
            type: "input",
            name: "salary",
            message: "What is the employees salary?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },

        {
            type: "input",
            name: "departmentId",
            message: "What is the employees department id?"
        },

    ]).then(function (response) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: response.title,
                salary: response.salary,
                department_id: response.departmentId
            },
            function (error) {
                if (error) throw error;
                startToDo();
            }
        )
    })
}

function newDepartment() {
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "What department is this employee in?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal",
            ]
        },
    ]).then(function (response) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: response.department
            },
            function (error) {
                if (error) throw error;
                startToDo();
            }
        )
    })
}

//function updateRole() {
   // connection.query(
      ///  "UPDATE role SET ? WHERE ?",

   /// )
//}


function viewEmployees() {
    connection.query(
       "SELECT employee.id, first_name, last_name, name AS department, title, salary, manager_id FROM employee JOIN role ON employee.role_id = role_id JOIN department ON role.department_id = department.id ORDER BY employee.id",
         function (error, data) {
            console.table(data);
            startToDo();
        }
    )
}
function viewRole() {
    connection.query(
        "SELECT first_name, last_name, title, salary FROM employee JOIN role ON role_id = role.id",
        function (error, data) {
            console.table(data);
            startToDo();
        }
    )
}

function viewDepartment() {
    connection.query(
        "SELECT first_name, last_name, name AS department FROM employee JOIN role ON role_id = role.id JOIN department ON department_id = department.id ORDER BY employee.id",
        function (error, data) {
            console.table(data);
            startToDo();
        }
    )
}

    //   var employee = { 
    //    firstName: employeeResponses[0].name, 
   //     lastName: employeeResponses[1].name, 
   //    roleId: employeeResponses[2].name, 
   //    managerId: employeeResponses[3].name}
   // function viewDepartment( {

   // })

                // use async return promises to recieve responses? and put into database?

