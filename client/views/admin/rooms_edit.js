Template.roomsEdit.onCreated(function(){

});

Template.roomsEdit.events({
	'click .add-room' : function(event,template){
		var newRoom = {
			name : '',
			description : '',
			bookable : '',
			capacity : 0,
			features : [],
			serial_number : rooms.find().fetch().length
		}

		rooms.insert(newRoom,function(error,id){
			if(!error){
				Router.go('rooms.view',{_id : id});
			}
		})
	}
})