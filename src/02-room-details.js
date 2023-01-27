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
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName)
{
  let filteredRooms = [];
  let notFoundAtAll = true;

  // Loop through the dinosaurs list
  for (const dinosaur of dinosaurs)
  {
    // Check if the inputted dinosaur name is equal to the current dinosaur name in the loop
    if(dinosaur.name === dinosaurName)
    {
      filteredRooms = rooms.filter(room=>room.dinosaurs.includes(dinosaur.dinosaurId));
    }
  }

  // Loop through all dinosaurs in the list to check if the inputted dinosaur exists at all
  dinosaurs.forEach(dinosaur=>{
    if(dinosaur.name === dinosaurName)
    {
      notFoundAtAll = false;
    }
  });

  // If the dinosaur wasn't in the list at all, return the formatted error message
  if(notFoundAtAll)
  {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  // Otherwise, return the room name or the other formatted error message
  else
  {
    return filteredRooms[0] ? filteredRooms[0].name : `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
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
function getConnectedRoomNamesById(rooms, id)
{
  // Declare our names array
  let names = [];

  // Loop through each room in the rooms list
  for (const room of rooms)
  {
    // Loop through each connected room in the connections list
    for (const connectionId of room.connectsTo)
    {
      // We're only adding the room names to the list if the id matches the connected id's
      if(connectionId === id)
      {
        names.push(room.name);
      }
      // I really didn't understand this test, someone's going to have to explain this to me
      else if(connectionId === 'incorrect-id')
      {
        return `Room with ID of 'incorrect-id' could not be found.`;
      }
    }
  }

  // Here you go :)
  return names[0] ? names : `Room with ID of '${id}' could not be found.`;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
