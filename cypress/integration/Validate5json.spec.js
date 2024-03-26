import { Requests } from "../support/Requests";

// let json = require(`../../fixtures/jsons/simple-simple.json`)
let request = new Requests();
let res = null;

describe("Validate JSON 5", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.mediumcomplex);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("Validate users and quantify user", async () => {
    let forJson = null;
    for (let json of res) {
      forJson = json;
    }
    request.ExpectAssert(forJson.users);
    request.ExpectAssert(forJson.users).length(2);
  });

  it("Validate o value in street of camp address", async () => {
    for (let json of res) {
      let address = json.address;
      request.ExpectAssert(address.street);
    }
  });

  it("Validate inside in camp geo the camp long it is planet", async () => {
    for (let json of res) {
      let geO = json.address.geo;
      for (let geo of geO) {
        request.ExpectAssert(geo.state.long);
        let planeT = geo.state.planet;
        for (let planet of planeT) {
          request.ExpectAssert(planet);
        }
      }
    }
  });

  it("validate camp others", async () => {
    for (let json of res) {
      let others = json.address.others;
      for (let othersValue of others) {
        request.ExpectAssert(othersValue);
      }
    }
  });
});
