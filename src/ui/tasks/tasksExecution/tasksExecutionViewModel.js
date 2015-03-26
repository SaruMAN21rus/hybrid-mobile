(function(app){

	'use strict';
 
	app.tasksExecution = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
		viewModel: kendo.observable({
			//the actual model
			modelData: app.taskModel,
			//other properties or functions you want to observe and expose to html
			init:function(e){
                var filterOption = {
                    field : "name"
                };
                app.tasksExecution.viewModel.filter = new app.Filter($('#tasksExecutionView div[data-role="navbar"]'), app.tasksExecution.viewModel.modelData, filterOption);
                $('#tasksExecutionView header .km-listview-wrapper').hide();
            },
            initMenu:function(e){
				var buttons = $('#menu-pane a[data-role="button"]');
                buttons.each(
                    function () {
                        $(this).height($(this).width());
                    }
                );
                $('#menu-pane #menu-tree').height($('#menu-pane').height() - $(buttons[0]).outerHeight(true));
                $('#menu-pane #menu-tree').css('margin-top', $(buttons[0]).outerHeight(true) + 'px');
			},
            initContent:function(e){
                var scroller = e.view.scroller;
                scroller.bind("scroll", function(e) {
                    $('#content-pane .grid tbody').find('.active-tr').toggleClass('active-tr', false);
                });
            },
            showHideSearchBox: function(e) {
                var searchBox = $('#tasksExecutionView header .km-listview-wrapper');
                app.tasksExecution.viewModel.searchBox = searchBox;
                if (searchBox.is(':visible')) {
                    searchBox.hide({duration:300});
                } else {
                    searchBox.show({duration:300, complete: function() {
                        searchBox.find('input[type=search]').focus();
                    }});
                }
            },
            show: function(e) {
                var filter = app.tasksExecution.viewModel.filter;
                var searchBox = app.tasksExecution.viewModel.searchBox;
                if (filter) {
                    if (searchBox && searchBox.is(':visible'))
                        searchBox.hide();
                    filter._clearFilter(e);
                }
                app.tasksExecution.viewModel.setTaskCounts();
                if ($('#content-pane').data('kendoMobilePane').view().id != "#tasksExecutionGrid") {
                    $('#content-pane').data('kendoMobilePane').navigate('tasksExecutionGrid');
                }
            },
            rowSelect:function(e){
                e.sender.element.toggleClass('active-tr', true);
            },
            showTaskExecutionDetail:function(e){
                var id = e.sender.element.data().id;
                $('#content-pane').data('kendoMobilePane').navigate('#taskExecutionDetail?id=' + id);
                e.sender.element.toggleClass('active-tr', false);
            },
            rowDeselect:function(e){
                e.sender.element.toggleClass('active-tr', false);
            },
            setTaskCounts:function(){
                var menuTreeItems = $('#menu-pane #menu-tree span.count');
                this.set("taskCount", 1);
                this.set("outboxTaskCount", 0);
                this.set("forExecutionTaskCount", 0);
                this.set("forControlTaskCount", 22);
                this.set("reworkTaskCount", 3);
                this.set("agreementTaskCount", 999);
                this.set("forAgreementTaskCount", 22);
                this.set("myDocumentCount", 11);
                menuTreeItems.each(function(){
                    if ($(this).text() == 0)
                        $(this).hide();
                });
            },
            taskCount: 0,
            outboxTaskCount:0,
            forExecutionTaskCount:0,
            forControlTaskCount:0,
            reworkTaskCount:0,
            agreementTaskCount:0,
            forAgreementTaskCount:0,
            myDocumentCount:0
		})
	};

})(app);