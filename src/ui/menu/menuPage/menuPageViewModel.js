(function(app){
    'use strict';
    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel 
    app.menuPage = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            init:function() {

                $('#menuPageView #currentDate').text(app.currentDate);

                var icons = $(".bigButtonWithIcon .icon");
                var texts = $(".bigButtonWithIcon .text");
                icons.each(
                    function () {
                        $(this).width($(this).height());
                    }
                );
            },
            goToAgents:function(){
                app.app.navigate('#agentListView');
            },
            goToCalendar:function(){
                //alert("Календарь");
            },
            goToAnalytics:function(){
                app.app.navigate('#chartView');
            },
            goToTasks:function(){
                app.app.navigate('#tasksMenuView');
            },
            goToDocuments:function(){
                app.app.navigate('#gridView');
            },
            goToFavorites:function(){
                //alert("Избранное");
            }
        })
    };
})(app); //pass in global namespace