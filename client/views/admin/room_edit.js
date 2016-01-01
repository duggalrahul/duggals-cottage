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
		return _.map(_.range(1,10),function(number){return {number : number};});
	}
})

Template.roomEdit.events({
	'blur input, keyup input' : function(event,template){
		var roomObject = Template.instance().roomRV.get();
		var copy = roomObject;

		var keys = event.target.attributes.getNamedItem('myattr').value.split(' ');
		for(var i=0;i<keys.length;i++){if(!isNaN(keys[i]))keys[i]=+keys[i]};
		for(var i=0;i<keys.length-1;i++) copy = copy[keys[i]];

		if(keys[i] != 'features'){
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

		copy[keys[i]] = +event.target.value;	

		Template.instance().roomRV.set(roomObject);
	},
	'click .add-feature' : function(event,template){
		var newFeature = $('.new-feature').val();
		var roomObject = Template.instance().roomRV.get();

		roomObject.features = roomObject.features.concat([{description:newFeature,index:roomObject.features.length}]);

		Template.instance().roomRV.set(roomObject);

	},
	'click .remove-feature' : function(event,template){
		var roomObject = Template.instance().roomRV.get();

		roomObject.features.splice(this.index,1);
		_.each(roomObject.features,function(f,index){roomObject.features[index].index=index});

		Template.instance().roomRV.set(roomObject);

	},
	'click .debug' : function(event,template){
		console.log(Template.instance().roomRV.get());
	}
})