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
        name: "github",
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
      let {
        role,
        name,
        employeeId,
        email,
        github,
        school,
        confirmNewEmployee,
      } = employeeValues;
      let employee = {};
      if (role === "Engineer") {
        employee = new Engineer(name, employeeId, email, github);
        // console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, employeeId, email, school);
        // console.log(employee);
      }
      teamArray.push(employee);

      if (confirmNewEmployee) {
        return newEmployee(teamArray);
      } else {
        writeFile(buildTeamCards(teamArray));
        console.log(buildTeamCards(teamArray));
        return teamArray;
      }
    });
};

// TAKE EACH ROLE WITH DESIGNATED CHAR AND PRINT THEM TO DESIGNATED CARD
function buildTeamCards(teamArray) {
  //Array of HTML strings from the generated cards
  documentArray = [];
  for (let i = 0; i < teamArray.length; i++) {
    const employeeChars = teamArray[i];
    // console.log(employeeChars);
    const role = employeeChars.getRole();
    // console.log(role);
    if (role === "Manager") {
      const managerCard = createManager(employeeChars);
      documentArray.push(managerCard);
    } else if (role === "Engineer") {
      const engineerCard = createEngineer(employeeChars);
      documentArray.push(engineerCard);
    } else if (role === "Intern") {
      const internCard = createIntern(employeeChars);
      documentArray.push(internCard);
    }
  }
  // return documentArray.join(" ");

  const createDocument = createDocumentPage(documentArray.join(""));
  return createDocument;
}

//HTML Template for generated team roster
function createDocumentPage(employeeProfiles) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
      <link href="./css/style.css" rel="stylesheet">
      <title>The Team</title>
    </head>
    <header>
        <h1 class="mx-auto mt-5 mb-5" style="width: 300px;">Team Profiles</h1>
    </header>
    <body>
      <div class="container row mx-auto">
        ${employeeProfiles}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
          crossorigin="anonymous"
        ></script>
      </div>
    </body>
  </html>
  `;
}

// CREATE HTML FOR EACH PROFILE
function createManager(manager) {
  return `<div class="card .col-xs-6 .col-md-4 mx-auto" style="width: 25rem">
  <div class="card-body card-header">
    <h4 class="card-title">${manager.name}</h4>
    <h6 class="card-subtitle mb-2"><i class="bi bi-cup-hot"></i> Manager</h6>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${manager.employeeId}</li>
      <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
      <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
    </ul>
  </div>
</div>`;
}

function createEngineer(engineer) {
  return `<div class="card .col-xs-6 .col-md-4 mx-auto" style="width: 25rem">
  <div class="card-body card-header">
    <h4 class="card-title">${engineer.name}</h4>
    <h6 class="card-subtitle mb-2"><i class="bi bi-eyeglasses"></i> Engineer</h6>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${engineer.employeeId}</li>
      <li class="list-group-item">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
      <li class="list-group-item">GitHub Name: <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></li>
    </ul>
  </div>
</div>`;
}

function createIntern(intern) {
  return `<div class="card .col-xs-6 .col-md-4 mx-auto" style="width: 25rem">
  <div class="card-body card-header">
    <h4 class="card-title">${intern.name}</h4>
    <h6 class="card-subtitle mb-2"><i class="bi bi-mortarboard"></i> Intern</h6>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${intern.employeeId}</li>
      <li class="list-group-item">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
      <li class="list-group-item">School: ${intern.school}</li>
    </ul>
  </div>
</div>`;
}

// WRITING CARDS CARDS TO HTML PAGE
const writeFile = (value) => {
  fs.writeFile("./assets/index.html", value, (err) => {
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

newManager();
