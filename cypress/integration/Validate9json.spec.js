import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("Validate JSON 9", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.hardMedium);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("Validate the camp users according to car color", async () => {
    for (let array of res) {
      let arrayUsers = array.users;
      for (let usersObj of arrayUsers) {
        request.ExpectAssert(usersObj.name);
        request.ExpectAssert(usersObj.year);
        request.ExpectAssert(usersObj.color);
        let arrayProducts = array.products;
        for (let productsObj of arrayProducts) {
          request.ExpectAssert(productsObj.car);
          request.ExpectAssert(productsObj.color);
          if (usersObj.color === productsObj.color) {
            let print = `Sou ${usersObj.name} tenho ${usersObj.year} anos, e tenho um ${productsObj.car}`;
            cy.log(print);
          }
        }
      }
    }
  });

  it("validate the address from the store the o ceo", async () => {
    for (let array of res) {
      let ArrayRegistration = array.registration;
      let baseArray = ArrayRegistration.base;
      for (let baseObj of baseArray) {
        let north = baseObj.north.street;
        request.ExpectAssert(north);
        let sul = baseObj.sul.street;
        request.ExpectAssert(sul);
        cy.log(`O endereço da loja Norte é ${north}`);
        cy.log(`O endereço da loja Sul é ${sul}`);
      }
      let ceo = ArrayRegistration.ceo;
      request.ExpectAssert(ceo);
      cy.log(`Cadastro do Ceo é ${ceo}`);

    }
  });
});
