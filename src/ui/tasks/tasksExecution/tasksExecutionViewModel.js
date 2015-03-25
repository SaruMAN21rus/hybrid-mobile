(function(app){

	'use strict';
 
	app.tasksExecution = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
		viewModel: kendo.observable({
			//the actual model
			modelData: app.taskModel,
			//other properties or functions you want to observe and expose to html
			initMenu:function(e){
				var buttons = $('#menu-pane a[data-role="button"]');
                buttons.each(
                    function () {
                        $(this).height($(this).width());
                    }
                );
                $('#menu-pane #menu-tree').height($('#menu-pane').height() - $(buttons[0]).outerHeight(true));
                $('#menu-pane #menu-tree').css('margin-top', $(buttons[0]).outerHeight(true) + 'px');
			}
		})
	};

})(app);