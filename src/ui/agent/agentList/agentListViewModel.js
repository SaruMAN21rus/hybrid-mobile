(function(app){
    'use strict';
 
    app.agentList = {
        viewModel: kendo.observable({
            modelData: app.db.Tests.asKendoDataSource({pageSize: 100}),
            init:function(){
                /*for(var i = 1; i <= 300000; i++)
                    ketraDB.Tests.addMany([{ name: 'наименование ' + i, delay: i, sum: 123.22, status: 1 }]);
                ketraDB.saveChanges();*/
                $('#agentListView #currentDate').text(app.currentDate);
                var filterOption = {
                    field : "delay"
                };
                this.filter = new app.Filter($('#agentListView div[data-role="navbar"]'), this.modelData, filterOption, $("#agentList"));
                $('#agentListView header .km-listview-wrapper').hide();

                $("#agentList").kendoMobileListView({
                    dataSource: this.modelData,
                    template: $("#agentListItemTemplate").text(),
                    endlessScroll: true
                });
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
                this.rightMenuViewModel.exitMenu(e);
            },
            hide:function(e){
                this.filter._clearFilter(e);
            },
            show: function(){
                var listView = $("#agentList").data("kendoMobileListView");
                listView.scroller().scrollTo(0,0);
                listView._itemBinder.list.refresh();
            },
            rightMenuViewModel: app.rightMenu.viewModel
        })
    };

})(app);