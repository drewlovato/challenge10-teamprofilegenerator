const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern");

const teamArray = [];

// START OF NEW MANAGER
const newManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the managers name?",
        validate: (value) => {
          if (value) {
            // console.log(value);
            return true;
          } else {
            return "Please give the managers name to continue";
          }
        },
      },
      //ENTER MANAGER EMPLOYEE NUMBER
      {
        type: "input",
        name: "employeeId",
        message: "Please enter their Employee Id #:",
        // this checks if the user enters a title into prompt
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a Employee Id # to continue!";
          }
        },
      },
      //ENTER MANAGER ADDRESS
      {
        type: "input",
        name: "email",
        message: "Please enter thier email address:",
        // this checks if the user enters a title into prompt
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a email address to continue!";
          }
        },
      },
      //ENTER OFFICE NUMBER ** FOR MANAGER ONLY **
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter an office #:",
        // this checks if the user enters a title into prompt
        // when: (value) => value.role === "Manager",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a office # to continue!";
          }
        },
      },
      {
        type: "confirm",
        name: "confirmNewEmployee",
        message: "Would you like to add a new employee?",
        default: false,
      },
    ])
    // PROMISE FOR MANAGER
    .then((managerValues) => {
      const { name, employeeId, email, officeNumber, confirmNewEmployee } =
        managerValues;
      const manager = new Manager(name, employeeId, email, officeNumber);
      teamArray.push(manager);
      // console.log(manager);
      if (confirmNewEmployee) {
        return newEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

//START OF NEW EMPLOYEE
const newEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is the role of the team member you would like to add?",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        message: "What is the team members name?",
        name: "name",
        validate: (value) => {
          if (value) {
            // console.log(value);
            return true;
          } else {
            return "Please give a name to continue";
          }
        },
      },
      //ENTER EMPLOYEE NUMBER
      {
        type: "input",
        message: "Please enter their Employee's Id #:",
        name: "employeeId",
        // this checks if the user enters a title into prompt
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a Employee Id # to continue!";
          }
        },
      },
      //ENTER EMPLOYEE ADDRESS
      {
        type: "input",
        message: "Please enter thier email address:",
        name: "email",
        // this checks if the user enters a title into prompt
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a email address to continue!";
          }
        },
      },
      //ENTER EMPLOYEE GITHUB
      {
        type: "input",
        message: "Please enter git hub username:",
        name: "gitHub",
        // this checks if the user enters a title into prompt
        when: (value) => value.role === "Engineer",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a git hub username to continue!";
          }
        },
      },
      // ENTER SCHOOL NAME ** FOR INTERN ONLY **
      {
        type: "input",
        message: "Please enter school name:",
        name: "school",
        // this checks if the user enters a title into prompt
        when: (value) => value.role === "Intern",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a school name to continue!";
          }
        },
      },
      // CONFIRM IF YOU WANT TO ADD ANOTHER EMPLOYEE
      {
        type: "confirm",
        message: "Would you like to add a new employee?",
        name: "confirmNewEmployee",
        default: false,
      },
      // PROMISE FOR NEW EMPLOYEE
    ])
    .then((employeeValues) => {
      let { role, name, id, email, github, school, confirmNewEmployee } =
        employeeValues;
      let employee = {};
      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
        // console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
        // console.log(employee);
      }
      teamArray.push(employee);

      if (confirmNewEmployee) {
        return newEmployee(teamArray);
      } else {
        writeFile(buildHTML(teamArray));
        console.log(teamArray);
        return teamArray;
      }
    });
};

newManager();

const writeFile = (value) => {
  fs.writeFile("./index.html", JSON.stringify(value), (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Team Profile Successfully Created! Check out your new index.html."
      );
    }
  });
};

const buildHTML = ({
  role,
  name,
  employeeId,
  email,
  officeNumber,
  gitHub,
  school,
}) =>
  `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><header>Team Profile</header>${role}${name}${employeeId}${email}${officeNumber}${gitHub}${school}</body></html>`;
