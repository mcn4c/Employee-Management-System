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
	database: 'employee_managementDB'
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
				'Add departments, roles, or employees',
				'View departments, roles, or employees',
				'Update employee roles',
				'Quit'
			]
		})
		.then((answer) => {
			switch (answer.choice) {
				case 'Add departments, roles, or employees':
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

const addQuery = () => {
	inquirer
		.prompt([
			{
				name: 'addCategory',
				type: 'list',
				message: 'Select from list below',
				choices: [ 'Add department', 'Add role', 'Add employee', 'Go back to main menu' ]
			}
		])
		.then((answer) => {
			switch (answer.addCategory) {
				case 'Add department':
					addDepartment();
					break;

				case 'Add role':
					addRole();
					break;

				case 'Add employee':
					addEmployee();
					break;

				case 'Go back to main menu':
					chooseStart();
					break;

				default:
			}
		});
};

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
				'Go back to main menu'
			]
		})
		.then((answer) => {
			switch (answer.view) {
				case 'List of Departments':
					displayDepartment();
					break;

				case 'Roles within all departments':
					displayRole();
					break;

				case 'Employee Information':
					displayEmployee();
					break;

				case 'Go back to main menu':
					chooseStart();

				default:
			}
		});
};

const displayDepartment = () => {
	console.log('Our departments listed by name: \n');
	connection.query('SELECT * FROM department', (err, res) => {
		if (err) throw err;
		console.table(res);
		chooseStart();
	});
};

const displayRole = () => {
	console.log('Employee roles and salaries for each department: \n');
	connection.query('SELECT title, salary, department_id FROM role', (err, res) => {
		if (err) throw err;
		console.table(res);
		chooseStart();
	});
};

const displayEmployee = () => {
	console.log('Lists out employees by name with their role and manager ids: \n');
	connection.query('SELECT firstName, lastName, role_id, manager_id FROM employee', (err, res) => {
		if (err) throw err;
		console.table(res);
		chooseStart();
	});
};

const addDepartment = () => {
	inquirer
		.prompt([
			{
				name: 'whichDepartment',
				type: 'input',
				message: 'What is the name of the department you wish to add?',
				validate(value) {
					if (value === null) {
						return false;
					}
					return true;
				}
			}
		])
		.then((answer) => {
			connection.query(
				'INSERT INTO department SET ?',
				{
					dep_name: answer.whichDepartment
				},
				(err) => {
					if (err) throw err;
					console.log("You've created a " + answer.whichDepartment + ' department.');
					chooseStart();
				}
			);
		});

// 	const addRole = () => {
// 		connection.query(
// 			'SELECT department.id, department.dep_name, role.department_id, role.title, role.salary FROM role WHERE role.department_id = department.id',
// 			(err, results) => {
// 				if (err) throw err;
// 				// once you have the items, prompt the user for which they'd like to bid on
// 				inquirer
// 					.prompt([
// 						{
// 							name: 'depChoice',
// 							type: 'rawlist',
// 							choices() {
// 								// inquirer prompt with function
// 								const choiceArray = [];
// 								//results coming from query
// 								results.forEach(({ dep_name }) => {
// 									choiceArray.push(dep_name);
// 								});
// 								//need the return choiceArray because choices must have array to be query
// 								return choiceArray;
// 							},
// 							message: 'To which department would you like to add a role?'
// 						},
// 						{
// 							name: 'roleAdd',
// 							type: 'input',
// 							message: 'What role would you like to add?'
// 						},
// 						{
// 							name: 'salaryAdd',
// 							type: 'input',
// 							message: "What is the new role's starting salary?",
// 							validate(value) {
// 								if (isNaN(value) === false) {
// 									return true;
// 								}
// 								return false;
// 							}
// 						}
// 					])
// 					.then((answer) => {
// 						let depChosenId;
// 						results.forEach((dep) => {
// 							if (dep.dep_name === answer.depChoice) {
// 								depChosenId = dep.department_id;

// 								connection.query('UPDATE role SET ? WHERE ?', [
// 									{
// 										tile: answer.roleAdd
// 									},
// 									{ salary: answer.salaryAdd },

// 									{
// 										department_id: depChosenId
// 									}
// 								]);
// 							}
// 							console.log('Please choose an existing department (may need to capitalize first letter).');
// 							addRole();
// 						});
// 					});
// 			}
// 		);
// 	};
// };
