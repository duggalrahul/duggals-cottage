Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function(){
	GoogleMaps.load();
  	this.next();
}, {
  only: ['navigate']
});

Router.route('/',function(){
	this.render('homePage');
},{
	name : 'home'
});

Router.route('/navigate',function(){
	this.render('navigate');
},{
	name : 'navigate'
})

Router.route('/rooms/list',function(){
	this.wait([Meteor.subscribe('Rooms'),Meteor.subscribe('Images'),Meteor.subscribe('Tarriffs')]);
	if(this.ready()){
		this.render('roomsList')
	}
},{
	name : 'rooms.list'
});

Router.route('/rooms/edit',function(){
	this.wait([Meteor.subscribe('Rooms'),Meteor.subscribe('Tarriffs')]);
	if(this.ready()){
		this.render('roomsEdit');
	}	
},{
	name : 'rooms.edit'
});
Router.route('/rooms/view/:_id',function(){
	this.wait([Meteor.subscribe('Rooms'),Meteor.subscribe('Images'),Meteor.subscribe('Tarriffs')]);
	if(this.ready()){
		this.render('roomEdit');	
	}	
},{
	name : 'rooms.view',
	data : function(){
				return rooms.findOne(this.params._id);
			}
})

Router.route('/tarriffs/edit',function(){
	this.wait([Meteor.subscribe('Tarriffs')]);
	if(this.ready()){
		this.render('tarriffsEdit');
	}	
},{
	name : 'tarriffs.edit'
});

Router.route('/tarriffs/view/:_id',function(){
	this.wait([Meteor.subscribe('Tarriffs')]);
	if(this.ready()){
		this.render('tarriffEdit');	
	}	
},{
	name : 'tarriffs.view',
	data : function(){
				return tarriffs.findOne(this.params._id);
			}
})

