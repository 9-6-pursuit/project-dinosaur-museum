/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  //VARIABLES FOR ERROR MESSAGE AND WHATEVER ROOM THE DINOSAUR WILL BE IN
let errorMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`;
let dinoRoom = "";

//LOOP THRU DINOSAURS ARRAY
for (const dinosaur of dinosaurs) {
  //IF DINOSAURS NAME ARE EQUAL, (37)DINO ROOM VARIABLE CHANGES TO THE DINOSAUR ID
  if (dinosaur.name === dinosaurName) {
    dinoRoom = dinosaur.dinosaurId
  };
};
//IF NAMES ARE NOT EQUAL, then it checks for an empty string ("") as well as an undefined value
if (dinoRoom === "") {
  //IF EITHER EXISTS, RETURN ERROR MESSAGE
  return errorMessage
};
//LOOP THRU ROOMS ARRAY
for (let j = 0; j < rooms.length; j++) {
//LOOP THRU THE OTHER dinosaurs ARRAY. THIS DINOSAUR ARRAY IS INSIDE ROOMS ARRAY: K INSIDE J
  for (let k = 0; k < rooms[j].dinosaurs.length; k++) {
  //IF THE DINOSAUR ID STORED IN DINO ROOM IS EQUAL TO A DINOSAUR ID INSIDE THE DINOSAURS ARRAY[K] THAT IS INSIDE THE ROOMS ARRAY[J], RETURN THE NAME OF THE ROOM[J]
if (dinoRoom === rooms[j].dinosaurs[k]) {
  return rooms[j].name
};
  }//ELSE
};
return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
};

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  //DEFAULT VARIABLES > [];
  let connectsId = [];
  let everyRoom = [];
  
//LOOP THRU ROOMS ARRAY FOR GIVEN ID 
  for (const room of rooms) {
//IF ID'S ARE EQUAL, (90)PUT THE CONNECTS TO ARRAY INSIDE ONE OF OUR EMPTY ARRAYS
    if(room.roomId === id) {
      connectsId = room.connectsTo
    };
  };
  if (connectsId.length === 0) {//IF rooms.connectsTo ARRAY IS EMPTY, RETURN MESSAGE
    return `Room with ID of '${id}' could not be found.`
  };
//THIS IS NOT A NESTED LOOP, THIS IS LOOPING THRU THE CONNECTS TO ARRAY (89)STORED IN CONNECTS ID 
  for (let k = 0; k < connectsId.length; k++) {
    let dinosaurID = connectsId[k]
//THIS IS A NESTED LOOP, GOING THRU ROOMS ARRAY AGAIN matching, connectsId with A roomId
    for (let t = 0; t < rooms.length; t++) {
      let room = rooms[t]
//if AN id from connectsTo array IS EQUAL TO A roomId, 
      if(dinosaurID === room.roomId) {
//push all the names of those rooms into OUR OTHER empty array
      everyRoom.push(room.name)
      };
    };
  };
  //if items in rooms.connectsTo array is not the same length as ITEMS IN EVERY ROOM array, return message 
  if (connectsId.length !== everyRoom.length) {
    return `Room with ID of 'incorrect-id' could not be found.`
  };
  //ELSE return THE array with the names OF ROOMS ["Ticket Center", "Entrance Room"]
  return everyRoom
};


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
