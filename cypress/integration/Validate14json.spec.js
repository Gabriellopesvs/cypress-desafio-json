import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("Validate JSON 14", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.masterComplexo);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("VAlidate the amount of money the user has to buy the car and if it is a VIP which car he is entitled to", () => {
    let userArray = res.users;
    for (let userObj of userArray) {
      let productArray = res.products;
      for (let productObj of productArray) {
        let nameVip = userObj.name;
        let part = nameVip.split(" ");
        let print = `Eu sou ${userObj.name} tenho ${userObj.money} e posso comprar um ${productObj.car} ${productObj.color} que custa ${productObj.value}`;
        if (productObj.value <= userObj.money && part[1] === "not-VIP") {
          cy.log(print);
          request.ExpectAssert(userObj.name);
          request.ExpectAssert(userObj.money);
          request.ExpectAssert(productObj.car);
          request.ExpectAssert(productObj.value);
          request.ExpectAssert(productObj.color);
        }
        if (productObj.value <= userObj.money && part[1] === "VIP") {
          request.ExpectAssert(productArray[5].VIPs[0].car);
          request.ExpectAssert(productArray[5].VIPs[1].car);
          request.ExpectAssert(productArray[5].VIPs[2].car);
          cy.log(
            print +
              `, Você é ${part[1]} e tem direito os carros ${productArray[5].VIPs[0].car}, ${productArray[5].VIPs[1].car} e ${productArray[5].VIPs[2].car}`
          );
        }
      }
    }
  });

  it("Validate address from the store the ceo", async () => {
    let registrationArray = res.registration
    let baseArray = registrationArray.base;
    for (let baseObj of baseArray) {
        let northObj = baseObj.north.street
        let sulObj = baseObj.sul.street
        request.ExpectAssert(northObj)
        request.ExpectAssert(sulObj)
        cy.log(`A loja Sul fica localizada ${sulObj}`);
        cy.log(`A loja North fica localizada ${northObj}`);
    }
    let ceoObj = registrationArray.ceo;
    request.ExpectAssert(ceoObj)
    cy.log(ceoObj)
  });
});
