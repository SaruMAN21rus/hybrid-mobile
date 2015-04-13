(function(app){
	'use strict';
 
	app.tasksList = {
		viewModel: kendo.observable({
			modelData: ketraDB.Tasks.asKendoDataSource(),
			init:function(){
			}, 
			addTask: function() {
				app.app.navigate('#addTaskView');
			},
			editTask: function(e) {
				var data = e.button.data();
				var id = data.id;
				app.app.navigate('#addTaskView?id=' + id);

			},
			deleteTask: function(e) {
				var data = e.button.data();
				var id = data.id;
				this.modelData.remove(this.modelData.get(id));
				this.modelData.sync();
			},
			beforeShow:function(){
				ketraDB.Tasks.Task.readAll();
			}
		})
	};

})(app);