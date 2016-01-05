Template.roomEdit.onCreated(function(){
	this.roomRV = new ReactiveVar(rooms.findOne(this.data._id));
	this.roomCapacity = [{number : 1},{number : 2},{number : 3},{number : 4},{number : 5}];
})

Template.roomEdit.helpers({
	room : function(){
		return Template.instance().roomRV.get();
	},
	roomCapacity : function(){
		return Template.instance().roomCapacity;
	},
	serialNumber : function(){
		return _.map(_.range(1,rooms.find().fetch().length+1),function(number){return {number : number};});
	},
	isBookable : function(){
		var roomObject = Template.instance().roomRV.get();
		return this.bookable ? 'checked' : '';
	},
	isNotBookable : function(){
		var roomObject = Template.instance().roomRV.get();
		return !this.bookable ? 'checked' : '';
	},
	isSelected : function(key1,key2){
		var roomObject = Template.instance().roomRV.get();
		return ((this[key2] == roomObject[key1]) ? 'selected' : '');
	},
	image : function(){
		var roomObject = Template.instance().roomRV.get();
		return images.findOne(roomObject.image_id);
	},
	roomTarrifs : function(){
		return tarriffs.find({state:'ACTIVE'},{sort:{cost_per_night:1}});
	},
	length : function(str){
		return str.length;
	}
})

Template.roomEdit.events({
	'blur input, keyup input' : function(event,template){
		var roomObject = Template.instance().roomRV.get();
		var copy = roomObject;

		var keys = event.target.attributes.getNamedItem('myattr').value.split(' ');
		for(var i=0;i<keys.length;i++){if(!isNaN(keys[i]))keys[i]=+keys[i]};
		for(var i=0;i<keys.length-1;i++) copy = copy[keys[i]];

		if(keys[i] != 'features' && keys[i]!='image_id'){
			copy[keys[i]] = event.target.value;
		}
		if(keys[i] == 'bookable'){
			copy[keys[i]] = +event.target.value;
		}

		Template.instance().roomRV.set(roomObject);
	},
	'click option' : function(event,template){
		var roomObject = Template.instance().roomRV.get();
		var copy = roomObject;

		var keys = event.target.attributes.getNamedItem('myattr').value.split(' ');
		for(var i=0;i<keys.length;i++){if(!isNaN(keys[i]))keys[i]=+keys[i]};
		for(var i=0;i<keys.length-1;i++) copy = copy[keys[i]];

		if(typeof event.target.value == 'string'){
			copy[keys[i]] = event.target.value;	
		}
		else{
			copy[keys[i]] = +event.target.value;
		}
		

		Template.instance().roomRV.set(roomObject);
	},
	'click .add-feature' : function(event,template){
		var newFeature = $('.new-feature').val();
		var roomObject = Template.instance().roomRV.get();

		roomObject.features = roomObject.features.concat([{description:newFeature,index:roomObject.features.length}]);

		Template.instance().roomRV.set(roomObject);

	},
	'click .remove-feature' : function(event,template){
		if(confirm('Do you really want to remove the feature?')){
			var roomObject = Template.instance().roomRV.get();

			roomObject.features.splice(this.index,1);
			_.each(roomObject.features,function(f,index){roomObject.features[index].index=index});

			Template.instance().roomRV.set(roomObject);
		}	

	},
	'click .save-room' : function(event,template){
		var roomObject = Template.instance().roomRV.get();

		Meteor.call('updateRoom',roomObject,function(error){
			if(!error){
				Router.go('rooms.edit');
			}
			else{
				alert('update failed');
			}
		});
	},
	'click .delete-room' : function(event,template){
		if(confirm('Do you really want to delete the room?')){
			var roomObject = Template.instance().roomRV.get();
			Meteor.call('removeRoom',roomObject,function(error){
				if(!error){
					Router.go('rooms.edit');
				}
				else{
					alert('update failed');
				}
			})
		}
		
	},
	'change .choose-image' : function(event,template){
		var roomObject = Template.instance().roomRV.get();
		var TemplateInstanceObject = Template.instance();
		

		FS.Utility.eachFile(event, function(file) {
	        images.insert(file, function (err, fileObj) {
	        	if(!err){
	        		console.log(fileObj)
		            roomObject.image_id = fileObj._id;
					TemplateInstanceObject.roomRV.set(roomObject);
					alert('image uploaded successfully!');
	        	}
        	});
	    });
		
	},
	'click .remove-image' : function(event,template){
		if(confirm('Do you really want to delete the image?')){
			var roomObject = Template.instance().roomRV.get();
			var TemplateInstanceObject = Template.instance();
			
			images.remove({_id:roomObject.image_id},function(error){
				if(!error){
					roomObject.image_id = '';
					TemplateInstanceObject.roomRV.set(roomObject);
				}
			})
		}
		
	},
	'click .debug' : function(event,template){
		console.log(Template.instance().roomRV.get());
	}
})