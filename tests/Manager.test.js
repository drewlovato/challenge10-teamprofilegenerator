const Manager = require("../lib/Manager");

describe("Manager", () => {
  it("This creates the Manager object", () => {
    const manager = new Manager("Andrew", 6758, "andrew@gmail.com", 765);
    expect(manager).toEqual({
      name: "Andrew",
      id: 6758,
      email: "andrew@gmail.com",
      officeNumber: 765,
    });
  });

  it("This retreives the Employee Id # from Manger object", () => {
    const manager = new Manager("Andrew", 6758, "andrew@gmail.com", 765);
    expect(manager.getEmployeeId()).toEqual(6758);
  });
});
