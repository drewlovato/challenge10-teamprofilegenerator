const Employee = require("../Employee.js");

test("should return an object that lists the different postions that the employees hold", () => {
  const questions = [
    {
      type: "list",
      message: "What liscense did you use for your project?",
      name: "liscence",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ];

  expect(Employee(questions)).toEqual(questions);
});
