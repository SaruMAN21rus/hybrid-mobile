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
			},
			editTask: function(e) {
				var data = e.button.data()
				var id = data.id;
				app.app.navigate('#addTaskView?id=' + id);

			},
			deleteTask: function(e) {
				var data = e.button.data()
				var id = data.id;
				this.modelData.dataSource.remove(this.modelData.dataSource.get(id));
				this.modelData.dataSource.sync();
			}
		})
	};

})(app);