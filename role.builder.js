"use strict";

roleHealer = require("role.healer");

var roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {
    //Set creep job

    // If in dropoff and empty, retun to source
    if ((!creep.memory.building && creep.isEmpty) || creep.memory.target == undefined) {
      creep.memory.target = creep.memory.source;
      creep.memory.action = "harvest";
      creep.memory.building = true;
      console.log(creep.name + " harvest " + creep.memory.target);
    }

    if (creep.memory.building && creep.isFull) {
      // Find either a nearby container, else prioritize other containers.
      var target = creep.pos.findClosestByPath(creep.room.containers);
      if (target == undefined) {
        target = creep.pos.findClosestByPath(creep.room.extensions);
      }
      if (target == undefined) {
        target = creep.pos.findClosestByPath(creep.room.spawns);
      }
      if (target == undefined) {
        console.log("ERROR: No target to return to for " + creep.name);
        return;
      }
      creep.memory.action = "transfer";
      creep.memory.target = target.id;
      creep.memory.resourceType = RESOURCE_ENERGY;
      creep.memory.building = false;
      console.log(creep.name + " return to " + target.id + " using " + creep.memory.resourceType);
    }

    creep.moveAndDo();
  }
};

//     if (creep.memory.building && creep.carry.energy == 0) {
//       creep.memory.building = false;
//       creep.say("🔄 recharge");
//     }
//     if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
//       creep.memory.building = true;
//       creep.say("🚧 build");
//     }
//     if (creep.memory.building == undefined) {
//       creep.memory.building = false;
//     }
//     var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
//       filter: structure => {
//         return (
//           structure.structureType == STRUCTURE_EXTENSION ||
//           structure.structureType == STRUCTURE_TOWER ||
//           structure.structureType == STRUCTURE_ROAD ||
//           structure.structureType == STRUCTURE_WALL ||
//           structure.structureType == STRUCTURE_CONTAINER
//         );
//       }
//     });

//     if (targets.length > 0) {
//       targets.sort(function(a, b) {
//         if (a.structureType == STRUCTURE_TOWER) {
//           return -1;
//         } else {
//           if (a.structureType == STRUCTURE_ROAD) {
//             return 1;
//           } else {
//             return 0;
//           }
//         }
//       });
//     }
//     //move to healer if no healing targets
//     if (!targets.length) {
//       roleHealer.run(creep);
//     }

//     //run creep jobs
//     if (creep.memory.building) {
//       //Build
//       if (targets.length) {
//         if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(targets[0], {
//             visualizePathStyle: { stroke: "#ffffff" }
//           });
//         }
//       } else {
//         //No targets anymore
//         //creep.memory.roletemp = "healer";
//         //console.log("Reassigning " + creep.name + " to healer");
//       }
//     } else {
//       //Recharge
//       if (creep.room.energyAvailable / creep.room.energyCapacityAvailable < 0.7) {
//         //TODO add waiting state
//         return;
//       }
//       var targets = creep.room.find(FIND_STRUCTURES, {
//         filter: structure => {
//           return (
//             (structure.structureType == STRUCTURE_EXTENSION && structure.energy == structure.energyCapacity) ||
//             (structure.structureType == STRUCTURE_SPAWN && structure.energy > 250) ||
//             (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) > 0)
//           );
//         }
//       });

//       if (targets.length > 0) {
//         targets.sort(function(a, b) {
//           if (a.structureType == STRUCTURE_SPAWN) {
//             return 1;
//           } else {
//             if (a.structureType == STRUCTURE_CONTAINER || a.structureType == STRUCTURE_EXTENSION) {
//               return -1;
//             } else {
//               return 0;
//             }
//           }
//         });

//         if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(targets[0]);
//         }
//       }
//     }
//   }
// };

module.exports = roleBuilder;
