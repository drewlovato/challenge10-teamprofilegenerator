const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  it("This creates the Engineer object", () => {
    const engineer = new Engineer("Andrew", 6758, "andrew@gmail.com", 765);
    expect(engineer).toEqual({
      name: "Andrew",
      id: 6758,
      email: "andrew@gmail.com",
      officeNumber: 765,
    });
  });

  it("This retreives the Employee Id # from Manger object", () => {
    const engineer = new Engineer("Andrew", 6758, "andrew@gmail.com", 765);
    expect(engineer.getEmployeeId()).toEqual(6758);
  });
});
