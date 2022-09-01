const Intern = require("../lib/Intern");

describe("Intern", () => {
  it("This creates the Intern object", () => {
    const intern = new Intern("Andrew", 6758, "andrew@gmail.com", 765);
    expect(intern).toEqual({
      name: "Andrew",
      id: 6758,
      email: "andrew@gmail.com",
      officeNumber: 765,
    });
  });

  it("This retreives the Employee Id # from Manger object", () => {
    const intern = new Intern("Andrew", 6758, "andrew@gmail.com", 765);
    expect(intern.getEmployeeId()).toEqual(6758);
  });
});
