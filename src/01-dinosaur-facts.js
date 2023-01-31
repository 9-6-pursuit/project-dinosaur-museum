/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  // Returns an object with the longest dinosaur from the list; meters converted to feet.
  // create an empty object to be returned
  const resultObject = {};
  let temporaryLongestLength = 0;
  let currentLongestDino = null;
  if(dinosaurs.length === 0) {
    return {}
  }
  for (let i = 0; i < dinosaurs.length; i++) {
    let element = dinosaurs[i];
    if(temporaryLongestLength < element.lengthInMeters){
      currentLongestDino = element;
      temporaryLongestLength = currentLongestDino.lengthInMeters
    }
  }
  resultObject[currentLongestDino.name] = currentLongestDino.lengthInMeters * 3.281;
  //console.log("resultObject: ",resultObject);
  return resultObject;
}


/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  
  for (const dino of dinosaurs) {
    let returnStr = "";
  
    //let str = buildResultStr(dino)

    if (dino.mya.length === 2 && dino.dinosaurId === id) {
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[1]} million years ago.`;
    } else if (dino.mya.length === 1 && dino.dinosaurId === id) {
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[0]} million years ago.`;
      } 
    }
    return `A dinosaur with an ID of '${id}' cannot be found.`
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */


function getDinosaursAliveMya(dinosaurs, mya, key) {
  let resultArray = []  //blank array
  let dinoKey = (key) ? key : "dinosaurId";
    for (const dino of dinosaurs) {
      if(dino.mya.includes(mya) || dino.mya[0] > mya && dino.mya[1]< mya || dino.mya.length === 1 && dino.mya - 1 === mya)  {
        resultArray.push(dino[dinoKey])
      }
    }
    return resultArray
  }
  
  // for (let index = 0; index < dinosaurs.length; index++) {
  // if(dinosaurs[index].mya.includes(mya)||dinosaurs[index].mya[0] > mya && dinosaurs[index].mya[1]< mya || dinosaurs[index].mya.length === 1 && dinosaurs[index].mya-1  === mya ){

   //Although MYA at both indexes show when the dinosaurs lived, index 1 demonstrates when they both lived and died. Dinosaurs with only index 0 lived at that specific year. Checks to see if there are two MYAs in the range of lived and died. If there is only one number, it will check to see if the MYA is within the specified MYA range.

  //   if(!key) {

  //           dinosaurArray.push(dinosaurs[index].dinosaurId)
  //         } else {
  //           dinosaurArray.push(dinosaurs[index][key])
  //         }   
  // }

// For dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.

// }
//   return dinosaurArray

//   let resultArray = [] //dinosaurs who were alive at mya
//   //resultArray.push(dinosaurs[0].dinosaurId)
//   let dinoKey = (key) ? key : "dinosaurId";
  
//   for (const dino of dinosaurs) {
    
//     if(dino.mya[0] > mya && dino.mya[1] < mya || dino.mya.length === 1 && dino.mya === mya){
//       resultArray.push(dino[dinoKey])
//     }
//     console.log("resultArray: ",resultArray, "dinoKey: ", dinoKey)
//  }
  
//   return resultArray

// }

// function getDinosaursAliveMya(dinosaurs, mya, key) {
  
//   let aliveDinosaurs = [];

//   for (let i = 0; i < dinosaurs.length; i++) {
//       let dinosaur = dinosaurs[i];

//       if (dinosaur.mya.includes(mya) || (dinosaur.mya.length === 1 && dinosaur.mya[0] === mya.length - 1)) {
//           if (key) {
//               aliveDinosaurs.push(dinosaur[key]);

//           } else {
//               aliveDinosaurs.push(dinosaur.dinosaurId);
//           }
//       }
//   }

//   return aliveDinosaurs;
// }

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
