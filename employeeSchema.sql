DROP DATABASE IF EXISTS employee_managementDB;
CREATE database employee_managementDB;

USE employee_managementDB;

CREATE TABLE department (
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 name VARCHAR(30),
 PRIMARY KEY (id)
  

);

CREATE TABLE role (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(100),
  salary INTEGER (250),
  department_id INTEGER,
  PRIMARY KEY (id)
  


);

CREATE TABLE employee (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  PRIMARY KEY (id)  
  );


