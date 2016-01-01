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
	this.render('rooms')
},{
	name : 'rooms.list'
})