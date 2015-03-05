(function(app){

	'use strict';
 
	app.tasksList = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
		viewModel: kendo.observable({
			//the actual model
			modelData: app.taskModel,
			//other properties or functions you want to observe and expose to html
			init:function(e){
			}, 
			addTask: function() {
				app.app.navigate('#addTaskView');
			}
		})
	};

})(app);