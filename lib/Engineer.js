const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, employeeId, email, gitHub) {
    super(name, employeeId, email);
    this.gitHub = gitHub;
  }
  getGitHub() {
    return this.gitHub;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
