const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'employee_managementDB',
});

connection.connect((err) => {
  if (err) throw err;
  chooseStart();
  
});

const chooseStart = () => {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'What would you like to do?',
			choices: [
				'Add departments, roles, and/or employees',
				'View departments, roles, or employees',
				'Update employee roles',			
				'Quit'
			]
		})
		.then((answer) => {
			switch (answer.choice) {
				case "Add departments, roles, and/or employees":
					addQuery();
					break;

				case 'View departments, roles, or employees':
					viewQuery();
					break;

				case 'Update employee roles':
					updateQuery();
					break;

                case 'Quit':
					connection.end();
					break;

				default:
					chooseStart();
					break;
			}
		});
};

const addQuery = () => {}

const viewQuery = () => {
    inquirer
    .prompt({
        name: 'view',
        type: 'rawlist',
        message: 'Which data-set would you like to view?',
        choices: [
            'List of Departments',
            'Roles within all departments',
            'Employee Information',			
            'Quit',
        ]
    })
    .then((answer) => {
        switch (answer.view) {
            case "List of Departments":
                displayDepartment();
                break;

            case 'Roles within all departments':
                displayRole();
                break;

            case 'Employee Information':
                displayEmployee();
                break;

            case 'Quit':
                connection.end();
                break;

            default:
                
                
        }


})
}

const displayDepartment = () => {
    console.log("Our departments listed by name: \n");
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.log(res);
        chooseStart();
    });
}

const displayRole = () => {
    console.log("Employee roles and salaries for each department: \n");
    connection.query("SELECT title, salary, department_id FROM role", (err, res) => {
        if (err) throw err;
        console.log(res);
        chooseStart();
    });
}

const displayEmployee = () => {
    console.log("Lists out employees by name with their role and manager ids: \n");
    connection.query("SELECT firstName, lastName, role_id, manager_id FROM employee", (err, res) => {
        if (err) throw err;
        console.log(res);
        chooseStart();
    });
}

    
    
