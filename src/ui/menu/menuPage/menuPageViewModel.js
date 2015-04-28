(function(app){
    'use strict';

    app.menuPage = {
        viewModel: kendo.observable({
            init:function() {

                $('#menuPageView #currentDate').text(app.currentDate);

                var icons = $("#menuPageView .btn .km-icon");
                var texts = $("#menuPageView .btn .km-text");
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
            },
            refresh:function(){
                if (app.checkConnection()){
                    app.getSid();
                }
            },
            showSettings: function(){
                app.app.navigate('#settingsPageView');
            },
            tasks:function(){
                if (app.checkConnection()){
                    app.getUsers();
                    app.getTasks();
                }
            }
        })
    };
})(app);