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
function calculateTicketPrice(ticketData, ticketInfo)
{
  // Ticket Type Error
  if(!ticketData.hasOwnProperty(ticketInfo.ticketType))
  {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }

  // Entrant Type Error
  if(!ticketData["general"].priceInCents.hasOwnProperty(ticketInfo.entrantType))
  {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  // Extras Error
  for (const extra of ticketInfo.extras)
  {
    if(!ticketData["extras"].hasOwnProperty(extra))
    {
      return `Extra type '${extra}' cannot be found.`;
    } 
  }

  // If there were no errors, just go ahead and calculate the cost
  let ticketCostInCents = 0;

  if(ticketInfo.ticketType && ticketInfo.entrantType)
  {
    if(ticketInfo.extras.length > 0)
    {
      for (const extra of ticketInfo.extras)
      {
        ticketCostInCents += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
      }
    }
    ticketCostInCents += ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
  }


  return ticketCostInCents;
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
function purchaseTickets(ticketData, purchases)
{
  // We'll be storing all of our admissions in this
  let ticketReceipts = [];

  // This will be formatted a string at the end of the function
  let total = 0;

  // Looping through the ticket purchases to get the cost and admissions
  for (const purchase of purchases)
  {
    /* 
       I was using this for hours, trying to figure out why it wasn't working lol
       if(Number.isNaN(calculateTicketPrice(ticketData, purchase)))
       {
        return calculateTicketPrice(ticketData, purchase);
       } 
    */

    if(typeof calculateTicketPrice(ticketData, purchase) === 'number')
    {
      let entrantString = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1, purchase.entrantType.length);

      let ticketTypeString = purchase.ticketType[0].toUpperCase() + purchase.ticketType.slice(1, purchase.ticketType.length);

      let extrasString = "";

      purchase.extras.map((extra, index)=>{
        if(index + 1 === purchase.extras.length && ticketData.extras[extra].description)
          extrasString += ticketData.extras[extra].description;
        else if(index + 1 !== purchase.extras.length)
          extrasString += ticketData.extras[extra].description + ", "
      });

      let finalString = `${entrantString} ${ticketTypeString} Admission: $${(calculateTicketPrice(ticketData, purchase) * 0.01).toFixed(2)}`;

      if(extrasString.length > 0)
      {
        finalString += ` (${extrasString})`;
      }

      ticketReceipts.push(finalString);

      total += calculateTicketPrice(ticketData, purchase) * 0.01;
    }
    else
    {
      return calculateTicketPrice(ticketData, purchase);
    }
  }

  // Formatting all of the admissions into a string
  let stringListOfAdmissions = "";

  ticketReceipts.forEach((element,i)=>{
    if(i !== ticketReceipts.length - 1)
      stringListOfAdmissions += element + "\n";
    else
      stringListOfAdmissions += element;
  });

  // Formatting the final cost into a string
  let stringTotal = `TOTAL: $${total.toFixed(2)}`;

  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${stringListOfAdmissions}\n-------------------------------------------\n${stringTotal}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
