import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("Validate JSON 13", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.masterMedium);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("Validate how much money the user has and which car he can buy and if he is a VIP inform which car he is also entitled to", async () => {
    for (let array of res) {
      let userArray = array.users;
      for (let userObj of userArray) {
        let productArray = array.products;
        for (let productObj of productArray) {
          let print = `Eu sou ${userObj.name} tenho ${userObj.money} e posso comprar um ${productObj.car} ${productObj.color} que custa ${productObj.value}`;
          let vipArray = array.VIPs;
          if (
            productObj.value <= userObj.money &&
            userObj.class === "NOT-VIP"
          ) {
            request.ExpectAssert(userObj.money);
            request.ExpectAssert(userObj.class);
            request.ExpectAssert(productObj.car);
            request.ExpectAssert(productObj.value);
            cy.log(print);
          }
          if (productObj.value <= userObj.money && userObj.class === "VIP") {
            cy.log(
              print +
                `, Você é ${userObj.class} e tem direito os carros ${vipArray[0].car}, ${vipArray[1].car} e ${vipArray[2].car}`
            );
          }
        }
      }
    }
  });

  it("Validate the address the store e o ceo", async () => {
    for (let array of res) {
      let registrationArray = array.registration;
      let baseArray = registrationArray.base;
      for (let baseObj of baseArray) {
        let sulAddr = baseObj.sul;
        request.ExpectAssert(sulAddr.street);
        let northAddr = baseObj.north;
        request.ExpectAssert(northAddr.street);
        cy.log(`A loja Sul fica localizada ${sulAddr.street}`);
        cy.log(`A loja North fica localizada ${northAddr.street}`);
      }
      let ceoObj = registrationArray.ceo;
      request.ExpectAssert(ceoObj);
      cy.log(ceoObj);
    }
  });
});
