Meteor.publish('Rooms',function(){
	return rooms.find();
});
Meteor.publish('Images', function(){ 
	return images.find(); 
});