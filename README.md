# Employee Manager CLI Application

## Description
The Employee Manager CLI application is a command-line tool built with Node.js, Inquirer, and PostgreSQL to manage a company’s employee database. It allows users to interact with the database by viewing and managing departments, roles, and employees. The application is designed to help business owners organize and plan their workforce efficiently.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [License](#license)
## Installation
### 1. Clonne the Repository
### 2. Install Dependencies
### 3. Set Up the Database
psql -U your_username
\c employee_manager
\i /path/to/your/project/sql/schema.sql
### 4. Set Up Environment Variables
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=employee_manager
## Usage
### 1. Start the Application
node index.js
### 2. Interact with the CLI:
Upon starting, you will be prompted with the following options:
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit

Use the arrow keys to navigate through the options and press Enter to select.
## Video

[video](https://vimeo.com/1009025053?share=copy)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.