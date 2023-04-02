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
 * @param {Object} ticketInfo - An object representing data for a single ticket. See examples below of input.
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
  //STEP 1:Find the ticketInfo price for our entrantType & ticketType
  //STEP 2:For each extra, find the price for our entrantType for that entrant and add that to the total
  //PRICE OF TICKET: ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]
  //Return total
  //console.log(ticketData);
  //console.log(ticketInfo);

//THE TYPE OF TICKET IS COMING FROM THE TICKET INFO OBJECT TICKET-TYPE KEY/PROPERTY
  const ticketType = ticketInfo.ticketType;
//IF THE TYPE OF TICKET IS NOT FOUND IN THE TICKET-DATA OBJECT, RETURN MESSAGE
  if (!ticketData[ticketType]) {
    return `Ticket type '${ticketType}' cannot be found.`
  };
//THE TYPE OF ENTRANT IS COMING FROM THE TICKET INFO OBJECT ENTRANT-TYPE KEY/PROPERTY
  const entrantType = ticketInfo.entrantType;
//IF THE TYPE OF TICKET IS IN THE TICKET-DATA OBJECT BUT THE ENTRANT TYPE IS NOT, RETURN MESSAGE
  if (ticketData[ticketType].priceInCents[entrantType] === undefined) {
    return `Entrant type '${entrantType}' cannot be found ever.`
  };
//TOTAL COST FOR ONE TICKET W/OUT EXTRAS
  let total = ticketData[ticketType].priceInCents[entrantType];

//Find the price OF TICKET W/ENTRANT TYPE & W/EXTRAS. LOOP THRU EXTRAS ARRAY INSIDE OBJECT
  for (const extra of ticketInfo.extras) {
    const extraType = ticketData.extras[extra];
    if (extraType === undefined) {
      return `Extra type '${extra}' cannot be found.`
    };
//EXTRA PRICE = ticketData.extras[extra].priceInCents[entrantType]
    const extraPrice = extraType.priceInCents[entrantType];
//TOTAL = total + ticketData.extras[extra].priceInCents[entrantType]
    total = total + extraPrice
  };
  return total
};
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
//HELPER FUNCTION THAT'LL CAPITALIZE THE FIRST LETTER IN A WORD
function capFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
};
//THIS FUNCTION WILL INVOKE THE FIRST FUNCTION TO FIND TICKET PRICE
function purchaseTickets(ticketData, purchases) {
  //console.log(purchases)
  let ticketPrice = 0;
  let receipt = "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";
//LOOP THRU PURCHASES ARRAY 
  for (let purchase of purchases) {
    let cost = calculateTicketPrice(ticketData, purchase);
    
    if (typeof cost === 'string') {
      return cost
    };
    ticketPrice = ticketPrice + cost;
//NESTED LOOP THRU EXTRAS ARRAY INSIDE OF PURCHASE OBJECT 
    for (let i = 0; i < purchase.extras.length; i++) {
      purchase.extras[i] = capFirst(purchase.extras[i]) + ' Access' 
    }
    //CHECKING IF THERE ARE EXTRAS TO INCLUDE
    if (purchase.extras.length != 0){
      receipt += `${capFirst(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${(cost/100).toFixed(2)} (${purchase.extras.join(', ')})\n`
    } else {
      receipt += `${capFirst(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${(cost/100).toFixed(2)}\n`
    };
  };
  return receipt + `-------------------------------------------\nTOTAL: $${(ticketPrice/100).toFixed(2)}`
};


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
