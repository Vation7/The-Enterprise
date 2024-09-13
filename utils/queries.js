// SQL queries for your application
const getDepartments = 'SELECT * FROM department';
const getRoles = `SELECT role.id, role.title, department.name AS department, role.salary 
                  FROM role 
                  JOIN department ON role.department_id = department.id`;
const getEmployees = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                       (SELECT CONCAT(manager.first_name, ' ', manager.last_name) FROM employee manager WHERE manager.id = employee.manager_id) AS manager 
                       FROM employee 
                       JOIN role ON employee.role_id = role.id 
                       JOIN department ON role.department_id = department.id`;

const addDepartment = 'INSERT INTO department (name) VALUES ($1)';
const addRole = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
const addEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
const updateEmployeeRole = 'UPDATE employee SET role_id = $1 WHERE id = $2';

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};