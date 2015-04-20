(function(app){
    'use strict';

    app.tasksMenu = {
        viewModel: kendo.observable({
            modelData: app.db.Tasks.asKendoDataSource(),
            init:function() {

                $('#tasksMenuView #currentDate').text(app.currentDate);

                var filterOption = {
                    field : "name"
                };

                this.filter = new app.Filter($('#tasksMenuView div[data-role="navbar"]'), this.modelData, filterOption, null);
                $('#tasksMenuView header .km-listview-wrapper').hide();

                $("#tasksMenuView #notification-list").kendoMobileListView({
                    dataSource: this.modelData,
                    template: $("#notificationItemTemplate").text()
                });
                $("#tasksMenuView #notification-list-scroller").height($('#tasksMenuView .cell-10 table').height() - 2*$('#tasksMenuView .cell-10 table tr').first().height() - 8);
                /*for(var i = 1; i <= 3; i++)
                    ketraDB.Tasks.addMany([{ name: 'наименование ' + i, datePlan: new Date(2010, 0, 1), dateFact: new Date(2013, 5, 5), status: 1 }]);
                ketraDB.saveChanges();*/
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
                $("#notification-list-scroller").data("kendoMobileScroller").scrollTo(0, 0);
                

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