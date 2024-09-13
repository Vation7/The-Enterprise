const inquirer = require('inquirer');
const db = require('./db/db'); // PostgreSQL connection
const queries = require('./utils/queries'); // SQL queries
require('console.table'); // To display data in table format

// Main menu options
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    }
  ]);

  switch (action) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Exit':
      process.exit();
  }
};

// View all departments
const viewDepartments = async () => {
  try {
    const result = await db.query(queries.getDepartments);
    console.table(result.rows);
  } catch (err) {
    console.error('Error viewing departments:', err);
  }
  mainMenu();
};

// View all roles
const viewRoles = async () => {
  try {
    const result = await db.query(queries.getRoles);
    console.table(result.rows);
  } catch (err) {
    console.error('Error viewing roles:', err);
  }
  mainMenu();
};

// View all employees
const viewEmployees = async () => {
  try {
    const result = await db.query(queries.getEmployees);
    console.table(result.rows);
  } catch (err) {
    console.error('Error viewing employees:', err);
  }
  mainMenu();
};

// Add a department
const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
    },
  ]);

  try {
    await db.query(queries.addDepartment, [name]);
    console.log(`Added department: ${name}`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
  mainMenu();
};

// Add a role
const addRole = async () => {
  const departments = await db.query(queries.getDepartments);
  const departmentChoices = departments.rows.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for this role:',
      choices: departmentChoices,
    },
  ]);

  try {
    await db.query(queries.addRole, [title, salary, departmentId]);
    console.log(`Added role: ${title}`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
  mainMenu();
};

// Add an employee
const addEmployee = async () => {
  const roles = await db.query(queries.getRoles);
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const employees = await db.query(queries.getEmployees);
  const managerChoices = employees.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerChoices.unshift({ name: 'None', value: null });

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee\'s first name:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:',
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the employee\'s role:',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the employee\'s manager:',
      choices: managerChoices,
    },
  ]);

  try {
    await db.query(queries.addEmployee, [firstName, lastName, roleId, managerId]);
    console.log(`Added employee: ${firstName} ${lastName}`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
  mainMenu();
};

// Update an employee's role
const updateEmployeeRole = async () => {
  const employees = await db.query(queries.getEmployees);
  const employeeChoices = employees.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const roles = await db.query(queries.getRoles);
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the employee\'s new role:',
      choices: roleChoices,
    },
  ]);

  try {
    await db.query(queries.updateEmployeeRole, [roleId, employeeId]);
    console.log('Updated employee\'s role');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
  mainMenu();
};

// Start the application
mainMenu();