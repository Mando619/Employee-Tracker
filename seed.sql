DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE  employee_trackerdb;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL, 
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 55000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 85000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 120000, 4);



INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mark", "Smith", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jason", "Borgs", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Vicente","Hernandez",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Janet", "Mota", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("James", "bond", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brian", "Carson", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Linda", "Marksmin", 2, 7);



INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");








SELECT first_name, last_name, department.name, role.title, 
 FROM employee JOIN role
 ON employee.role_id = role.id 
 JOIN department ON role.department_id = department.id
 ORDER BY employee.id;

 SELECT first_name, last_name, title AS title 
 FROM employee JOIN 
 role ON employee.id = role.id;