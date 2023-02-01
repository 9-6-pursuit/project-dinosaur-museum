/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
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
let price = 0;

let ticketType = ticketInfo.ticketType
let entrantType = ticketInfo.entrantType
let extras = ticketInfo.extras

if(ticketData[ticketType] === undefined) {
  return `Ticket type '${ticketType}' cannot be found.`
}

if(ticketData.general.priceInCents[entrantType] === undefined) {
  return `Entrant type '${entrantType}' cannot be found.`
}


price += ticketData[ticketType].priceInCents[entrantType]

for (extraType of extras) {
  if(ticketData.extras[extraType] === undefined) {
    return `Extra type '${extraType}' cannot be found.`
  }
  price += ticketData.extras[extraType].priceInCents[entrantType]
}

return price

}



  // if(ticketInfo.ticketType !== "general" && ticketInfo.ticketType !== "membership") {
  //   return "Ticket type 'incorrect-type' cannot be found."
  // }

  // if(ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "senior") {
  //   return "Entrant type 'incorrect-entrant' cannot be found."
  // }

  // for (let index = 0; index < ticketInfo.extras.length; index++) {
  //    if (ticketInfo.extras.length === 0 || ticketInfo.extras[index] !== "education" || ticketInfo.extras[index] !== "movie" || ticketInfo.extras[index] !== "terrace") {
  //      return "Extra type 'incorrect-extra' cannot be found."
  //     }
  //    }
  //    return ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
  











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
function purchaseTickets(ticketData, purchases) {
  let totalPrice = 0;
  let receiptString = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`

  function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  for (const ticketInfo of purchases) {
    let price = calculateTicketPrice(ticketData, ticketInfo)

    if(typeof price === "string") {
      return price
    }


    totalPrice += price

    receiptString += `${titleCase(ticketInfo.entrantType)} ${ticketInfo.ticketType[0].toUpperCase()}${ticketInfo.ticketType.slice(1)} Admission: $${(price / 100).toFixed(2)}`
    let capitalizedExtras = []
   if(ticketInfo.extras.length > 0) {
    // receiptString += " ("
     
   }
    for (const extraType of ticketInfo.extras) {
      capitalizedExtras.push(titleCase(extraType))
    }
    if(capitalizedExtras.length > 1) {
      receiptString += capitalizedExtras.join(" Access, ")
    } 
    else if(capitalizedExtras === 1) {
      receiptString += capitalizedExtras[0]
    }

    if(ticketInfo.extras.length > 0) {
      receiptString +=
      ` (${titleCase(ticketInfo.extras[0])} ${ticketInfo.extras.slice(1)}Access)`
      // `(${ticketInfo.extras[0].toUpperCase()} ${ticketInfo.extras.slice(1)}Access)`
      // receiptString += ")"
    }

    receiptString += "\n"
  }
  receiptString += `-------------------------------------------\nTOTAL: $${(totalPrice /100).toFixed(2)}`
  return receiptString
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
