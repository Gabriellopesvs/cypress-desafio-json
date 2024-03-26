import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("validate JSON 7", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.complexmedium);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("validate user camp and joining name and year", async () => {
    for (let array of res) {
      let arrays = array.users;
      for (let userArray of arrays) {
        let names = userArray.name;
        let years = userArray.year;
        request.ExpectAssert(names);
        request.ExpectAssert(years);
        cy.log(`Eu sou ${names} e tenho ${years}`);
      }
    }
  });

  it("Validate camp products and which car available for purchase", async () => {
    for (let array of res) {
      let arrays = array.products;
      for (let product of arrays) {
        let cars = product.car;
        cy.log(`Carro ${cars} Disponivel para compra`);
      }
    }
  });

  it("Validate camp registration and address da loja e o ceo", async () => {
    for (let array of res) {
      let arrays = array.registration;
      for (let regist of arrays.base) {
        let addressNorth = regist.north.street;
        let addressSul = regist.sul.street;
        cy.log(`O endereço da loja North é ${addressNorth}`);
        cy.log(`O endereço da loja Sul é ${addressSul}`);
      }
      let campCeo = arrays.ceo
      cy.log(`Campo Ceo ${campCeo}`)
    }
  });
});
