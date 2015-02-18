(function(app){

	  'use strict';

	  //below you place anything private you don't want exposed in the viewModel

	  //below we create the viewModel 
	  app.menuPage = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
			viewModel: kendo.observable({
				//the actual model
				//modelData: app.viewerModel,
				//other properties or functions you want to observe and expose to html
				init:function() {
					
					$('#date').text(app.currentDate);

					var icons = $(".bigButtonWithIcon .icon");
					var texts = $(".bigButtonWithIcon .text");
					icons.each(
						function () {
							$(this).width($(this).height());
						}
					);
					$(window).resize(function() {
						icons.each(
							function () {
								$(this).width($(this).height());
							}
						);
						texts.each(
							function () {
								$(this).css("z-index", 1);
							}
						);
					});
				},
                goToAgents:function(){
					alert("Информация о контрагентах");
                },
                goToCalendar:function(){
					alert("Календарь");
                },
                goToAnalytics:function(){
					alert("Аналитика, Отчеты, Графики");
                },
                goToTasks:function(){
					app.app.navigate('#tasksMenuView');
                },
                goToDocuments:function(){
					alert("Документы");
                },
                goToFavorites:function(){
					alert("Избранное");
                },
			})
	  };
})(app); //pass in global namespace