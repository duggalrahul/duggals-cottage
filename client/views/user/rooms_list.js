Template.roomsList.helpers({
	allRooms : function(){
		return rooms.find({},{sort : {serial_number:1}}).fetch();
	},
	displayImage : function(id){
		return images.findOne(id);
	}
})