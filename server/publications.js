Meteor.publish('Rooms',function(){
	return rooms.find();
});