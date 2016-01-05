Template.tarriffEdit.onCreated(function(){
	this.tarriffRV = new ReactiveVar(tarriffs.findOne(this.data._id));
	this.tarriffStates = [{value:'ACTIVE'},{value:'DRAFT'}];
	this.tarriffTypes = [{value:'ROOM'},{value:'ROOM-SERVICE'},{value:'CAR-WASH'}];
});

Template.tarriffEdit.onRendered(function(){
	this.$('.datetimepicker').datetimepicker();
})

Template.tarriffEdit.helpers({
	tarriff : function(){
		 return Template.instance().tarriffRV.get();
	},
	tarriffStates : function(){
		return Template.instance().tarriffStates;
	},
	tarriffTypes : function(){
		return Template.instance().tarriffTypes;
	},
	isSelected : function(key1,key2){
		var tarriffObject = Template.instance().tarriffRV.get();
		return ((this[key2] == tarriffObject[key1]) ? 'selected' : '');
	}
});

Template.tarriffEdit.events({
	'blur input, keyup input' : function(event,template){
		var tarriffObject = Template.instance().tarriffRV.get();
		var copy = tarriffObject;

		var keys = event.target.attributes.getNamedItem('myattr').value.split(' ');
		for(var i=0;i<keys.length;i++){if(!isNaN(keys[i]))keys[i]=+keys[i]};
		for(var i=0;i<keys.length-1;i++) copy = copy[keys[i]];
		
		copy[keys[i]] = event.target.value;

		Template.instance().tarriffRV.set(tarriffObject);
	},
	'click option' : function(event,template){
		var tarriffObject = Template.instance().tarriffRV.get();
		var copy = tarriffObject;

		var keys = event.target.attributes.getNamedItem('myattr').value.split(' ');
		for(var i=0;i<keys.length;i++){if(!isNaN(keys[i]))keys[i]=+keys[i]};
		for(var i=0;i<keys.length-1;i++) copy = copy[keys[i]];

		copy[keys[i]] = event.target.value;	

		Template.instance().tarriffRV.set(tarriffObject);
	},
	'click .save-tarriff' : function(){
		var tarriffObject = Template.instance().tarriffRV.get();

		Meteor.call('updateTarriff',tarriffObject,function(error){
			if(!error){
				Router.go('tarriffs.edit');
			}
		});
	},
	'click .delete-tarriff' : function(){
		if(confirm('Do you really want to delete this tarriff?')){
			var tarriffObject = Template.instance().tarriffRV.get();

			Meteor.call('removeTarriff',tarriffObject,function(error){
				if(!error){
					Router.go('tarriffs.edit');
				}
			});
		}		
	},
	'click .debug' : function(event,template){
		console.log(Template.instance().tarriffRV.get());
	}
})