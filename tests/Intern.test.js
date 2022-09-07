const Intern = require("../lib/Intern");

describe("Intern", () => {
  it("This creates the Intern object", () => {
    const intern = new Intern(
      "Andrew",
      6758,
      "andrew@gmail.com",
      "Denver University"
    );
    expect(intern).toEqual({
      name: "Andrew",
      employeeId: 6758,
      email: "andrew@gmail.com",
      school: "Denver University",
    });
  });
});
