const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'employee_managementDB',
	debug: false
});

connection.connect((err) => {
	if (err) throw err;
	chooseStart();
});

//app begins by prompting list
const chooseStart = () => {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'What would you like to do?',

			//set of options for user to pick from - Quit ends connection
			choices: [
				'Add departments, roles, or employees',
				'View departments, roles, or employees',
				'Update employee roles',
				'Quit'
			]
		})
		//functions to run depending on user selection
		.then((answer) => {
			switch (answer.choice) {
				case 'Add departments, roles, or employees':
					addQuery();
					break;

				case 'View departments, roles, or employees':
					viewQuery();
					break;

				case 'Update employee roles':
					updateRole();
					break;

				case 'Quit':
					connection.end();
					console.log("You have ended this session.")
					break;

				default:
					chooseStart();
					break;
			}
		});
};

//addQuery prompts user to pick where to add 
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

			//functions to run based on user selection
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


// Functions to run based on addQuery choice: addDepartment, addRole, addEmployee

//To add a department
const addDepartment = () => {

	connection.query("SELECT * FROM department, role",
	inquirer
		.prompt([
			{
				name: 'whichDepartment',
				type: 'input',
				message: 'What is the name of the department you wish to add?',
				//validate that data was entered
				validate(value) {
					if (value === null) {
						return false;
					}
					return true;
				}
			},
			

		])
		.then((answer) => {
			connection.query(
				//where to insert new data
				'INSERT INTO department SET ?',
				{
					dep_name: answer.whichDepartment
				},
				(err) => {
					if (err) throw err;
					console.log("\nYou've created a " + answer.whichDepartment + ' department\n');
					chooseStart();
					
					
				},

			);

			



		}));
		

		
};

// to add a new role
const addRole = () => {
	const choiceArray = {};

	connection.query('SELECT DISTINCT department.id, department.dep_name FROM department', (err, results) => {
		if (err) throw err;

		inquirer
			.prompt([

				
				{
					name: 'depChoice',
					type: 'rawlist',
					choices() {
						
						results.forEach(({ dep_name, id }) => {
							choiceArray[dep_name] = id;
						});
						//need the return choiceArray because choices must have array to be query
						return Object.keys(choiceArray);
					},
					message: 'To which department would you like to add a role?'
				},
				{
					name: 'roleAdd',
					type: 'input',
					message: 'What role would you like to add?',
					//validation -- but not working
					
					},
				{
					name: 'salaryAdd',
					type: 'input',
					message: "What is the new role's starting salary?",
					validate(value) {
						//make sure input is a number value
						if (isNaN(value) === false) {
							return true;
						}
						return false;
					}
				}
			])
			.then((answer) => {


				// insert role title, salary and department id into role table

				connection.query('INSERT INTO role SET ?', [
					{
						title: answer.roleAdd,

						salary: answer.salaryAdd,

						department_id: parseInt(choiceArray[answer.depChoice]),
					
					}
					

				]);
				console.log("You've added " + answer.roleAdd + " role to the " + answer.depChoice + " department");
				chooseStart();
			});
	});
};

//add an employee
const addEmployee = () => {
	const depArray ={};
	const roleArray = {};

	connection.query('SELECT department.id, dep_name, role.id, role.title, role.department_id FROM role, department', (err, results) => {
		if (err) throw err;
		
		inquirer
			.prompt([

				
				{
					name: 'roleChoice',
					type: 'rawlist',
					choices() {
						
						results.forEach(({ title, id }) => {
							roleArray[title] = id;
						});
						return Object.keys(roleArray);
					},
					message: 'Which role will the new employee have?'
				},
				{
					name: 'depChoice',
					type: 'rawlist',
					choices() {
						
						results.forEach(({ dep_name, id }) => {
							depArray[dep_name] = id;
						});
						//need the return choiceArray because choices must have array to be query
						return Object.keys(depArray);
					},
					message: 'To which department would you like to add an employee?'
				},
				{
					name: 'firstNameAdd',
					type: 'input',
					message: "What is the new employee's first name?"
				},
				{
					name: 'lastNameAdd',
					type: 'input',
					message: "What is the employee's last name?",
					
				}
				
				
			])
			.then((answer) => {

				connection.query('INSERT INTO employee SET ?', [
					{
						firstName: answer.firstNameAdd,

						lastName: answer.lastNameAdd,

						role_id: parseInt(roleArray[answer.roleChoice]),
						
						manager_id: parseInt(depArray[answer.depChoice])
					}
					
				]);
				console.log("You've added " + answer.firstNameAdd + " " + answer.lastNameAdd + " as a new employee." );
				chooseStart();
			});





		});
	}


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
	connection.query('SELECT dep_name, department.id FROM department', (err, res) => {
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
	connection.query('SELECT * FROM employee', (err, res) => {
		if (err) throw err;
		console.table(res);
		chooseStart();
	});
};


// function called if user chooses to update role
	const updateRole = () => {
		const employeeArray = {}
	

	connection.query('SELECT role_id, firstName, lastName, title, role.id FROM employee, role WHERE employee.role_id = role.id' , (err, results) => {
		if (err) throw err;

		inquirer
			.prompt([
				{
					name: 'employeeChoice',
					type: 'rawlist',
					choices() {
						
						
						results.forEach(({ lastName, firstName }) => { employeeArray[lastName] = firstName;

							
						});
						return Object.keys(employeeArray)
						console.log(employeeArray);
					},
					message: 'Choose the employee whose role you wish to change:'
				},

				
				{
					name: 'roleUpdate',
					type: 'rawlist',
					choices() {
						
						const roleChangeChoice = [];
						results.forEach(({ title }) => {

							roleChangeChoice.push(title);
						});
						//need the return choiceArray because choices must have array to be query
						// return Object.keys(employeeArray);
						return roleChangeChoice
						console.log(roleChangeChoice);
					},

					message: 'Select the new role for the employee'
				},
			
			])
			.then((answer) => {
				
				let chosenRole;
				results.forEach((item) => {
					if (item.title === answer.roleUpdate) {
						chosenRole = item;
						
					}
				})

				var chosenRoleId = chosenRole.id -1;

				

				connection.query(
					"UPDATE employee SET ? WHERE ?",
					[
						{role_id: chosenRoleId},
						{lastName: answer.employeeChoice}

					],
					(error) => {
						if (error) throw err;
						console.log("Employee role updated successfully")
						chooseStart();
					}
				)

				

			})
		})


			}


			


		