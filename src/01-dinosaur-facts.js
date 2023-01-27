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
function getLongestDinosaur(dinosaurs)
{
  // "Declare" the longest dinosaur object
  let longest =  dinosaurs[0] ? {[dinosaurs[0]['name']]: dinosaurs[0].lengthInMeters} : {};

  // "Declare" the longest dinosaur object's key for accessing
  let longestKey =  dinosaurs[0] ? dinosaurs[0]['name'] : null;

  // "Loop" through the dinosaurs array
  for (const dinosaur of dinosaurs)
  {
    // "Loop" through each key in the current dinosaur object
    for (const key in dinosaur)
    {
      // "Check if" the current dinosaur in the loop has a longer length than our longest variable
      if(dinosaur.lengthInMeters > longest[longestKey] && key === 'name')
      {
        // "If true", change our longest variable to the current dinosaur in the result format
        delete longest[longestKey];
        longest[dinosaur[key]] = dinosaur.lengthInMeters;
        longestKey = dinosaur[key];
      }
    }
  }

  // (Should return an empty object if there are no dinosaurs) ==> I set this up on line 31
  if(longestKey)
  {
    longest[longestKey] *= 3.281;
  }

  // Return our result
  return longest;
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
  // Filter out the dinosaurs that don't match the id we're looking for
  let dinosaur = dinosaurs.filter(dinosaurs=>dinosaurs.dinosaurId === id)[0];

  // Not really sure about this one here... I only got it to work by closely reading the data and tests
  let mya = dinosaur ? dinosaur.mya[dinosaur.mya.length - 1] : null;

  // If we successfully got a dinosaur by id, return the formatted description, otherwise just say it cannot be found...
  return dinosaur ?  `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya} million years ago.` :
    `A dinosaur with an ID of '${id}' cannot be found.`;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, 
 * returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less.
 * For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
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
function getDinosaursAliveMya(dinosaurs, mya, key)
{
  let dinosaursAlive = [];

  // ok so apparently it was all about range and I was stuck on this for 18 hours
  let min, max = 0;

  for (const dinosaur of dinosaurs)
  {
    min = dinosaur.mya.length === 2 ? dinosaur.mya[1] : dinosaur.mya[0] - 1;
    max = dinosaur.mya[0];

    if(mya >= min && mya <= max)
    {
      if(!key)
      {
        dinosaursAlive.push(dinosaur.dinosaurId);
      }
      else if(key in dinosaur)
      {
        dinosaursAlive.push(dinosaur.name);
      }
    }
  }

  return dinosaursAlive;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
