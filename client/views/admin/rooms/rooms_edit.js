Template.roomsEdit.onCreated(function(){

});

Template.roomsEdit.helpers({
	rooms : function(){
		return rooms.find({},{sort : {serial_number:1}}).fetch();
	}
})

Template.roomsEdit.events({
	'click .add-room' : function(event,template){
		var newRoom = {
			image_id : '',
			name : '',
			description : '',
			bookable : 0,
			capacity : 1,
			features : [],
			serial_number : rooms.find().fetch().length+1
		}

		rooms.insert(newRoom,function(error,id){
			if(!error){
				Router.go('rooms.view',{_id : id});
			}
		})
	}
})