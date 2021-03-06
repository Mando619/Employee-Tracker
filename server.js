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

const connection = mysql.createConnection(connectionConfig);

// connection start, and the start of prompt
connection.connect(function (err) {
    if (err) throw err
    startToDo();
});
// first prompt to initiate all possible prompts
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
                "Update employee role",
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
    connection.query(
        "SELECT title, id FROM role",
        function (error, response) {
            if (error) throw error;

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
                    // make into a list with choices and return integer
                    type: "list",
                    name: "roleId",
                    message: "What is the new employee's role?",
                    choices: response.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                },
                {
                    type: "list",
                    name: "managerId",
                    message: "Who is this new employee's manager?",
                    choices: response.map((employee) => {
                        return {
                            name: employee.name,
                            value: employee.id
                        }
                    })
                },

            ]).then(function (response) {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: response.roleId,
                        manager_id: response.managerId,
                    },
                    function (error) {
                        if (error) throw error;
                        startToDo();
                    }
                )
            })
        })
}

function newRole() {
    connection.query(
        "SELECT name, id FROM department",
        function (error, response) {
            if (error) throw error;
            inquirer.prompt([
                {
                    type: "input",
                    name: "role",
                    message: "What is the new role you would like to add?"
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
                    // make into a list with choices and return 
                    type: "list",
                    name: "departmentId",
                    message: "What is the new roles department?",
                    choices: response.map((department) => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    })
                },

            ]).then(function (response) {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        role: response.role,
                        salary: response.salary,
                        department_id: response.departmentId
                    },
                    function (error) {
                        if (error) throw error;
                        startToDo();
                    }
                )
            })
        })
}

function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the new department you would like to add?",
        }  
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

function updateRole() {
    connection.query(
        "SELECT title, id FROM role",
        function (error, response) {
            if (error) throw error;
            inquirer.prompt([
                {
                    type: "list",
                    name: "id",
                    message: "What role would you like to update?",
                    choices: response.map((employee) => {
                        return {
                            name: employee.name,
                            value: employee.id
                        };
                    })
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "What is the employee's new role?",
                    choices: response.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        };
                    })
                }
            ]).then(function (response) {
                connection.query(
                    "UPDATE employee SET role_id = ? WHERE id = ?",
                    [response.roleId, response.id],
                    function (error, response) {
                        if (error) throw error
                        startToDo();
                    }
                )
            })
        }
    )
}

function viewEmployees() {
    connection.query(
        "SELECT employee.id, first_name, last_name, name AS department, title, salary, manager_id FROM employee JOIN role ON role_id = role.id JOIN department ON department_id = department.id ORDER BY employee.id",
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



