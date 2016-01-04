
Template.tarriffsEdit.helpers({
	tarriffs : function(){
		return tarriffs.find().fetch();
	}
})

Template.tarriffsEdit.events({
	'click .add-tarriff' : function(event,template){
		var tarriffObject = {
			serial_number : tarriffs.find().fetch().length+1,
			name : '',
			description : '',
			period_start_date : '',
			period_end_date : '',
			state : 'DRAFT',
			cost_per_night : 0
		};

		tarriffs.insert(tarriffObject,function(error,id){
			if(!error){
				Router.go('tarriffs.view',{_id:id});
			}
		})
	}
});

