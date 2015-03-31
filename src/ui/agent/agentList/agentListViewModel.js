(function(app){

    'use strict';
 
    app.agentList = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            //the actual model
            modelData: app.agentModel,
            //other properties or functions you want to observe and expose to html
            init:function(){
                $('#agentListView #currentDate').text(app.currentDate);
                var filterOption = {
                    field : "name"
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