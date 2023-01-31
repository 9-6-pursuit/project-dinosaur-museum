/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { extras } = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */



function calculateTicketPrice(ticketData, ticketInfo) {
  

  if (!ticketData[ticketInfo.ticketType]) {
     return `Ticket type '${ticketInfo.ticketType}' cannot be found.` 
  }

  if (ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "senior") {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.` 
  }

  let ticketPrice = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

 
  for (const extra of ticketInfo.extras) {
    if (!ticketData.extras[extra]) {
    return `Extra type '${extra}' cannot be found.` 

    }
    ticketPrice += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
  }

  return ticketPrice;
}



/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */

    //function purchaseTickets(ticketData, purchases) {}

    

function purchaseTickets(ticketData, purchases) {

  // console.log(purchases)
  for (i = 0; i < purchases.length; i ++){
    if (!ticketData[purchases[i].ticketType]){
      return `Ticket type '${purchases[i].ticketType}' cannot be found.`
    } else if (!ticketData.general.priceInCents[purchases[i].entrantType]){
      return `Entrant type '${purchases[i].entrantType}' cannot be found.`
    } 
    for (element in purchases[i].extras){
      if(!ticketData.extras[purchases[i].extras[element]]){
        return `Extra type '${purchases[i].extras}' cannot be found.`
      }
    }
  }
  
  let price = 0
  let totalPrice = 0
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------`
  // console.log(purchases)
  for (let i = 0; i < purchases.length; i++) {
    if (purchases[i].extras.length === 0){
      if (purchases[i].ticketType === "general"){
        if (purchases[i].entrantType === "child"){
          price = (ticketData[purchases[i].ticketType].priceInCents.child)
          totalPrice += price
          receipt += `\nChild ${ticketData.general.description}: $${(price / 100).toFixed(2)}`

        }else if (purchases[i].entrantType === "adult"){
          price = ticketData[purchases[i].ticketType].priceInCents.adult
          totalPrice += price
          receipt += `\nAdult ${ticketData.general.description}: $${(price / 100).toFixed(2)}`
          // console.log(purchases[i].extras.length)
  
        }else if (purchases[i].entrantType === "senior") {
          price = ticketData[purchases[i].ticketType].priceInCents.senior
          totalPrice += price
          receipt += `\nSenior ${ticketData.general.description}: $${(price / 100).toFixed(2)}`

        }
      } else if (purchases[i].ticketType === "membership"){
        if (purchases[i].entrantType === "child"){
          price = (ticketData[purchases[i].ticketType].priceInCents.child)
          totalPrice += price
          receipt += `\nChild ${ticketData.membership.description}: $${(price / 100).toFixed(2)}`

        }else if (purchases[i].entrantType === "adult"){
          price = ticketData[purchases[i].ticketType].priceInCents.adult
          totalPrice += price
          receipt += `\nAdult ${ticketData.membership.description}: $${(price / 100).toFixed(2)}`

        }else if (purchases[i].entrantType === "senior") {
          price = ticketData[purchases[i].ticketType].priceInCents.senior
          totalPrice += price
          receipt += `\nSenior ${ticketData.membership.description}: $${(price / 100).toFixed(2)}`
       }
      }
    }
  }

  for (let i = 0; i < purchases.length; i++) {
    price = 0
    if (purchases[i].extras.length > 0){

      let extrasArray = []
      
      for (let x = 0; x < purchases[i].extras.length; x++){
        
        if (purchases[i].extras[x] === "education"){
          extrasArray.push(ticketData.extras.education.description)
          if (purchases[i].entrantType === "child"){
            price += ticketData.extras.education.priceInCents.child
          } else if (purchases[i].entrantType === "adult"){
            price += ticketData.extras.education.priceInCents.adult
          } else if (purchases[i].entrantType === "senior"){
            price += ticketData.extras.education.priceInCents.senior
          }
        } else if (purchases[i].extras[x] === "movie"){
          extrasArray.push(ticketData.extras.movie.description)
          if (purchases[i].entrantType === "child"){
          price += ticketData.extras.movie.priceInCents.child
          } else if (purchases[i].entrantType === "adult"){
          price += ticketData.extras.movie.priceInCents.adult
          } else if (purchases[i].entrantType === "senior"){
            price += ticketData.extras.movie.priceInCents.senior
          }
        } else if (purchases[i].extras[x] === "terrace") {
          extrasArray.push(ticketData.extras.terrace.description)
          if (purchases[i].entrantType === "child"){
            price += ticketData.extras.terrace.priceInCents.child
          } else if (purchases[i].entrantType === "adult"){
            price += ticketData.extras.terrace.priceInCents.adult
          } else if (purchases[i].entrantType === "senior"){
            price += ticketData.extras.terrace.priceInCents.senior
           }
        }
      }


      if (purchases[i].ticketType === "general"){
        if (purchases[i].entrantType === "child"){
          price += ticketData[purchases[i].ticketType].priceInCents.child
          totalPrice += price
          receipt += `\nChild ${ticketData.general.description}: $${(price / 100).toFixed(2)} (${extrasArray.toString().split(",").join(", ")})`
        } else if (purchases[i].entrantType === "adult"){
          price += ticketData[purchases[i].ticketType].priceInCents.adult
          totalPrice += price
          receipt += `\nAdult ${ticketData.general.description}: $${(price / 100).toFixed(2)} (${extrasArray.toString().split(",").join(", ")})`
        } else if (purchases[i].entrantType === "senior"){
          price += ticketData[purchases[i].ticketType].priceInCents.senior
          totalPrice += price
          receipt += `\nSenior ${ticketData.general.description}: $${(price / 100).toFixed(2)} (${extrasArray.toString().split(",").join(", ")})`
        }
      } else if (purchases[i].ticketType === "membership"){
        if (purchases[i].entrantType === "child"){
          price += ticketData[purchases[i].ticketType].priceInCents.child
          totalPrice += price
          receipt += `\nChild ${ticketData.membership.description}: $${(price / 100).toFixed(2)} (${extrasArray.toString().split(",").join(", ")})`
        } else if (purchases[i].entrantType === "adult"){
          price += ticketData[purchases[i].ticketType].priceInCents.adult
          totalPrice += price
          receipt += `\nAdult ${ticketData.membership.description}: $${(price / 100).toFixed(2)} (${extrasArray.toString().split(",").join(", ")})`
        } else if (purchases[i].entrantType === "senior"){
          price += ticketData[purchases[i].ticketType].priceInCents.senior
          totalPrice += price
          receipt += `\nSenior ${ticketData.membership.description}: $${(price / 100).toFixed(2)} (${extrasArray.toString().split(",").join(", ")})`
        }
      }
    }
  }

  return receipt + `\n-------------------------------------------\nTOTAL: $${(totalPrice / 100).toFixed(2)}`
  // return `TOTAL: $${(price / 100).toFixed(2)}`
  
    
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};

