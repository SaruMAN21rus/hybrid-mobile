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

                $('#menuPageView #currentDate').text(app.currentDate);

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
            },
            rightMenuViewModel: app.rightMenu.viewModel

        })
    };
})(app); //pass in global namespace