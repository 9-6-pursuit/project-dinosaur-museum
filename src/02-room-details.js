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
  let dinoID
  for (let dino of dinosaurs){
    if(dinosaurName === dino.name){
      dinoID = dino.dinosaurId
    } 
  }
  for (let room of rooms){
    if(room.dinosaurs.includes(dinoID)){
      return room.name
    } 
  }
  if (!dinoID){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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
  let newArr = [];
  // let finalArr =[]

  // These triple loops look insane so let me explain:
  for (let i = 0; i < rooms.length; i++){  
    if (id === rooms[i]["roomId"]){//This i loop checks which roomId matches with the id paramater

      for (let j = 0; j < rooms[i]["connectsTo"].length; j++){ //This j loop is on stand by, so it can be use with the k loop. the j stands for the index of the 'connectedTo' array

        for (let k = 0; k < rooms.length; k++){ 
          if (rooms[i]["connectsTo"][j] === rooms[k]["roomId"]){ //This k loop looks at each elements within the 'connectedTo' array and see which elements matches the Room's ID
            newArr.push(rooms[k]["name"]) //once there's a match, it will push the room's Name to the newArr array.
          }
        }       
  }
} 




} 


if(!newArr.length) {
  return `Room with ID of '${id}' could not be found.`}

  return newArr

  if (newArr.includes('incorrect-id')) {
    return `Room with ID of 'incorrect-id' could not be found.`}

// if(!newArr.length) {
//     return `Room with ID of '${id}' could not be found.`
//    } else if (!newArr.includes('incorrect-id')) {
//     return `Room with ID of 'incorrect-id' could not be found.`
  
    
//    }

 } 

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
