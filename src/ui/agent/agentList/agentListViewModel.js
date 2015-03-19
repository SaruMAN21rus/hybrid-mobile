(function(app){

	'use strict';
 
	app.agentList = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
		viewModel: kendo.observable({
			//the actual model
			modelData: app.agentModel,
			//other properties or functions you want to observe and expose to html
			init:function(e){
				$('#agentListView #currentDate').text(app.currentDate);
			},
            rightMenuViewModel: app.rightMenu.viewModel
		})
	};

})(app);