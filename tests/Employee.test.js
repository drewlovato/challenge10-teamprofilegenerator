const Employee = require("../lib/Employee");

describe("Employee", () => {
  it("This creates the Employee main index", () => {
    const employees = new Employee("Andrew", 6758, "andrew@gmail.com", manager);
    expect(employees).toEqual({
      name: "Andrew",
      employeeId: 6758,
      email: "andrew@gmail.com",
      role: manager,
    });
  });
});
