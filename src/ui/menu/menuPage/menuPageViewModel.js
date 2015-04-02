(function(app){
    'use strict';

    app.menuPage = {
        viewModel: kendo.observable({
            init:function() {

                $('#menuPageView #currentDate').text(app.currentDate);

                var icons = $(".bigButtonWithIcon .icon");
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
                alert("Календарь");
            },
            goToAnalytics:function(){
                app.app.navigate('#chartView');
            },
            goToTasks:function(){
                app.app.navigate('#tasksMenuView');
            },
            goToDocuments:function(){
                alert("Документы");
            },
            goToFavorites:function(){
                alert("Избранное");
            }
        })
    };
})(app);