// this file defines methods on the cient
// hence all these are stubs

Meteor.methods({
	updateRoom : function(roomObject){
		var oldRoomObject  = rooms.findOne(roomObject._id);

		rooms.remove({_id:roomObject._id});

		console.log(oldRoomObject.serial_number, roomObject.serial_number);

		if(oldRoomObject.serial_number < roomObject.serial_number){
			_.each(rooms.find({serial_number : {$gt:oldRoomObject.serial_number, $lt:roomObject.serial_number+1}},{sort:{serial_number:1}}).fetch(),function(room,index){
				room.serial_number = oldRoomObject.serial_number+index;
				rooms.update({_id:room._id},room);
			});
		}
		else{
			_.each(rooms.find({serial_number : {$gt:roomObject.serial_number-1}},{sort:{serial_number:1}}).fetch(),function(room,index){
				room.serial_number = roomObject.serial_number+index+1;
				rooms.update({_id:room._id},room);
			});
		}
		
		rooms.insert(roomObject);
	},
	removeRoom : function(roomObject){
		rooms.remove({_id:roomObject._id});
		_.each(rooms.find({serial_number : {$gt : roomObject.serial_number}},{sort:{serial_number:1}}).fetch(),function(room,index){
			room.serial_number = roomObject.serial_number + index;
			rooms.update({_id:room._id},room);
		})
	}
});