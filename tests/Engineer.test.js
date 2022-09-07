const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  it("This creates the Engineer object", () => {
    const engineer = new Engineer(
      "Andrew",
      6758,
      "andrew@gmail.com",
      "@andrewlovato"
    );
    expect(engineer).toEqual({
      name: "Andrew",
      employeeId: 6758,
      email: "andrew@gmail.com",
      gitHub: "@andrewlovato",
    });
  });
});
