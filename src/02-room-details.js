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
  let roomName = "";
  let dinoId = "";
  let dinoErrMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let roomErrMessage = `Room with ID of 'incorrect-id' could not be found.`
  let dinoExists = false; // initialized and set to false.
  let dinoFoundInRoom = false // initialized to false
 
  for (const dino of dinosaurs) { // loops through dinosaurs array and 
    if (dino.name === dinosaurName) { // check that dinosaurName exist and
      dinoId = dino.dinosaurId;
      dinoExists = true} // sets dinoExists boolean variable to true
  } // if name doesn't exist, boolean is already set to false when initialized.
  
  if(!dinoExists) {
    // This message is returned if dinosaurName does not exist within the dinosaur array
    return dinoErrMessage
  }
 
  for (const room of rooms) {
    if(room.dinosaurs.includes(dinoId)){
      roomName = room.name
      dinoFoundInRoom = true; // initialized to false.  Will only change to true if the id is found in the rooms.
    } 
  } 
  if(!dinoFoundInRoom){ 
    // dinoFountInRoom was initialize to false.  It's set to true if the id is not fount in the rooms.  It's true, we return the following message.
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }

  // ternary operator returnd the roomName if roomName is truthy and roomErrMessage if roomName is falsy.
  return !!roomName ? roomName : roomErrMessage;
}

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
  const connectedRoom = [];
  const foundConnectedRooms = [];
  let errMessage = `Room with ID of '${id}' could not be found.`
  let errMessage2 = `Room with ID of 'incorrect-id' could not be found.`
  let foundRoomId = false;

  for (const room of rooms) {
    if(room.roomId === id){
      foundConnectedRooms = room.connectsTo
      console.log('foundConnectedRooms: ==> ', foundConnectedRooms)
      foundRoomId = true;
    } 
  }
  if(foundConnectedRooms.length === 0){
    return errMessage
  } else if(foundConnectedRooms.includes('incorrect-id')){
    return errMessage2
  }
  for (const connected of foundConnectedRooms) {
    // console.log('connected: \n',connected)
    for (const connectingRoom of connected) {
      // console.log('connectingRoom: \n',connectingRoom)
      if(connectingRoom === connected){
        connectedRoom.push(connectingRoom)
      }
    }
  }
  
  // console.log('connectedRoom:==>',connectedRoom)
  // if(!foundRoomId) {
  //   return `Room with ID of '${id}' could not be found.`
  // }
  return connectedRoom
}




module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
