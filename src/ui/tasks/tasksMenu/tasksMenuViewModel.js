﻿(function(app){
    'use strict';
    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel 
    app.tasksMenu = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            //the actual model
            modelData: app.taskModel,
            //other properties or functions you want to observe and expose to html
            init:function() {

                $('#tasksMenuView #currentDate').text(app.currentDate);

                var filterOption = {
                    field : "name"
                };

                this.filter = new app.Filter($('#tasksMenuView div[data-role="navbar"]'), this.modelData, filterOption);
                $('#tasksMenuView header .km-listview-wrapper').hide();
            },
            addTask:function(){
                app.app.navigate('#tasksListView');
            },
            showHideSearchBox: function() {
                var searchBox = $('#tasksMenuView header .km-listview-wrapper');
                this.searchBox = searchBox;
                if (searchBox.is(':visible')) {
                    searchBox.hide({duration:300});
                } else {
                    searchBox.show({duration:300, complete: function() {
                        searchBox.find('input[type=search]').focus();
                    }});
                }
            },
            beforeHide: function(e) {
                if (this.searchBox && this.searchBox.is(':visible')){
                    this.searchBox.hide();
                }
                this.filter._clearFilter(e);
                this.rightMenuViewModel.exitMenu(e);
            },
            beforeShow: function(){
                this.set("importantTasksCount", 555);
            },
            showTasksExecution: function(){
                app.app.navigate('#tasksExecutionView');
            },
            rightMenuViewModel: app.rightMenu.viewModel,
            importantTasksCount: 0,
            overdueTasksCount: 0,
            outboundTasksCount: 0,
            newPerformTasksCount: 1,
            overduePerformTasksCount: 0,
            newConformDocumentsCount: 1,
            сontrolTasksCount: 1,
            newDocumentsCount: 1,
            weekday: kendo.toString(new Date(), "dddd", "ru-RU"),
            date: (new Date()).getDate() + " " + app.genetiveMonths[(new Date()).getMonth()].toUpperCase()
        })
    };
})(app); //pass in global namespace