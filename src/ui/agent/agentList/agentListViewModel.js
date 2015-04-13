(function(app){
    'use strict';
 
    app.agentList = {
        viewModel: kendo.observable({
            modelData: ketraDB.Tests.asKendoDataSource(),
            init:function(){
                /*for(var i = 100001; i <= 400000; i++)
                    ketraDB.Tests.addMany([{ name: 'наименование ' + i, delay: i, sum: 123.22, status: 1 }]);
                ketraDB.saveChanges();*/
                $('#agentListView #currentDate').text(app.currentDate);
                var filterOption = {
                    field : "delay"
                };
                this.filter = new app.Filter($('#agentListView div[data-role="navbar"]'), this.modelData, filterOption);
                $('#agentListView header .km-listview-wrapper').hide();

            },
            showHideSearchBox: function() {
                var searchBox = $('#agentListView header .km-listview-wrapper');
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
            rightMenuViewModel: app.rightMenu.viewModel
        })
    };

})(app);