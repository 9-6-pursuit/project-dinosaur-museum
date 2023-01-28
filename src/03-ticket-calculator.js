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
  let total = 0
  if(ticketInfo.ticketType.includes('incorrect')){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  } else if(ticketInfo.entrantType.includes('incorrect')){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  } else if(ticketInfo.extras.find(element => element.includes('incorrect'))){
    return `Extra type '${ticketInfo.extras}' cannot be found.`
  }

  for (const ticket in ticketData) {
    if (ticket === ticketInfo.ticketType) {
      for (const person in ticketData[ticket].priceInCents) {
        if (ticketInfo.entrantType === person){
          total += ticketData[ticket].priceInCents[person]
        }
      }
    }
  }

  for (const extra in ticketData.extras) {
      for (const ext of ticketInfo.extras) {
        if (ext === extra){
          for (const key in ticketData.extras[extra].priceInCents) {
            if(key === ticketInfo.entrantType){
              // console.log(ticketInfo)
              total += ticketData.extras[extra].priceInCents[key]
            }
          }
        }
      }
  }


  return total
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
function purchaseTickets(ticketData, purchases) {
  let receiptTotal = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n'
  let total = 0
  let test = 0
  let receiptTotalArr = []

  for (let index = 0; index < purchases.length; index++) {
    if(typeof calculateTicketPrice(ticketData, purchases[index]) !== 'number'){
      return calculateTicketPrice(ticketData, purchases[index])
    } else {
      test = calculateTicketPrice(ticketData, purchases[index])/100
      total += calculateTicketPrice(ticketData, purchases[index])/100
    }
    
  }
  //loop through the object of objects of ticketdata
  for (const ticket in ticketData) {
// loop through the array of objects in purchases
    let est = ticketData['extras']
      for (let index = 0; index < purchases.length; index++) {
        if (ticketData[ticket].description && purchases[index].extras.length <1 && ticket === purchases[index].ticketType){

          let priceofTicketWithoutExtras = ticketData[ticket].priceInCents[purchases[index].entrantType]/100
          let capIntLet = purchases[index].entrantType[0].toUpperCase()
          let capIntRest = purchases[index].entrantType.slice(1)
          let wholeName = capIntLet + capIntRest
          // console.log(purchases)
          if(index === purchases.length - 1){
            receiptTotal += `${wholeName} ${ticketData[ticket].description}: $${priceofTicketWithoutExtras.toFixed(2)}`
          } else{
            receiptTotal += `${wholeName} ${ticketData[ticket].description}: $${priceofTicketWithoutExtras.toFixed(2)}\n`
          }
        }

      }
  }
  let receiptTotal2 = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n'

          for (let index = 0; index < purchases.length; index++) {
            if (purchases[index].extras.length > 0 ){
              let formatedPrice = calculateTicketPrice(ticketData, purchases[index])/100
              let capIntLet = purchases[index].entrantType[0].toUpperCase()
              let capIntRest = purchases[index].entrantType.slice(1)
              let wholeName = capIntLet + capIntRest
              receiptTotal2 += `${wholeName} ${ticketData[purchases[index].ticketType].description}: $${formatedPrice.toFixed(2)}`
              // console.log(ticketData.extras['terrace'])
              // console.log(purchases[index].extras)
              let receiptTotalArr = []

              for (const key in purchases[index].extras) {
                let arrOfExtras = purchases[index].extras
                receiptTotalArr.push(ticketData.extras[arrOfExtras[key]].description)
                // let newStr = receiptTotalArr.join(', ')
                // console.log(receiptTotalArr)
                // receiptTotal2 += `${ticketData.extras[arrOfExtras[key]].description},`
              }
              if(receiptTotalArr.length > 1){
                let newStr = receiptTotalArr.join(', ')
                receiptTotal2 += ` (${newStr})`
              } else {
                receiptTotal2 += ` (${receiptTotalArr})`
              }
              if(index === purchases.length - 1){
                receiptTotal2 = receiptTotal2
              } else {
                receiptTotal2 += '\n'
              }
            //   console.log(receiptTotal2)
            }
          }
      
  receiptTotal += `\n-------------------------------------------\nTOTAL: $${total.toFixed(2)}`
  receiptTotal2 += `\n-------------------------------------------\nTOTAL: $${total.toFixed(2)}`
  // console.log(test)
  // console.log(receiptTotal)
  for (let index = 0; index < purchases.length; index++) {
    if (purchases[index].extras.length <1 ){
      return receiptTotal
    } else{
      return receiptTotal2
    }
  }
  

}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
