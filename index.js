const inquirer = require("inquirer");
const fs = require("fs");

//run function that calls employee prompt and iniates field prompts for specific questions
const buildHTML = ({
  role,
  name,
  employeeId,
  email,
  officeNumber,
  gitHub,
  school,
}) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header>Team Profile<header>

    ${role}
    ${name}
    ${employeeId}
    ${email}
    ${officeNumber}

    ${role}
    ${name}
    ${employeeId}
    ${email}
    ${gitHub}

    ${role}
    ${name}
    ${employeeId}
    ${email}
    ${school}

</body>
</html>`;

inquirer
  .prompt([
    //ENTER ROLE
    {
      type: "list",
      message: "What is thier role?",
      name: "role",
      choices: ["Manager", "Engineer", "Intern", "N/A"],
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Please choose a choose another team member to continue. If you did not add another person please choose N/A";
        }
      },
    },
    // ENTER NAME
    {
      type: "input",
      message: "Please enter thier name:",
      name: "name",
      // this checks if the user enters a title into prompt
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Please enter a name to continue!";
        }
      },
    },
    //ENTER EMPLOYEE NUMBER
    {
      type: "input",
      message: "Please enter their Employee Id #:",
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
    //ENTER ADDRESS
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
    //ENTER OFFICE NUMBER ** FOR MANAGER ONLY **
    {
      type: "input",
      message: "Please enter an office #:",
      name: "officeNumber",
      // this checks if the user enters a title into prompt
      when: (value) => value.role === "Manager",
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Please enter a office # to continue!";
        }
      },
    },
    // ENTER GIT HUB USERNAME ** FOR ENGINEER ONLY **
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
    {
      type: "confirm",
      message: "Would you like to add a new employee?",
      name: "confirmNewEmployee",
      default: false,
    },

    // BUILD HTML PAGE
  ])
  .then((answers) => {
    fs.writeFile("./index.html", buildHTML(answers), (err) =>
      err ? console.error(err) : console.log("Success!")
    );
  });
