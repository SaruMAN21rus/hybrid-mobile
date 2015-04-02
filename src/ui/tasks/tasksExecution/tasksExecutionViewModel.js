(function(app){

	'use strict';
 
	app.tasksExecution = {
		viewModel: kendo.observable({
			modelData: app.taskModel,
			init:function(){
                var filterOption = {
                    field : "name"
                };
                app.tasksExecution.viewModel.filter = new app.Filter($('#tasksExecutionView div[data-role="navbar"]'), app.tasksExecution.viewModel.modelData, filterOption);
                $('#tasksExecutionView header .km-listview-wrapper').hide();
            },
            initMenu:function(){
				var buttons = $('#menu-pane a[data-role="button"]');
                buttons.each(
                    function () {
                        $(this).height($(this).width());
                    }
                );
                $('#menu-pane #menu-tree').height($('#menu-pane').height() - $(buttons[0]).outerHeight(true));
                $('#menu-pane #menu-tree').css('margin-top', $(buttons[0]).outerHeight(true) + 'px');
			},
            initContentGrid:function(e){
                var scroller = e.view.scroller;
                scroller.bind("scroll", function() {
                    $('#content-pane .grid tbody').find('.active-tr').toggleClass('active-tr', false);
                });

                this.tabstrip = $("#tasksExecutionView #content-pane #comment").kendoTabStrip({
                    animation: false,
                    show: this.onHistoryTabShow
                });
            },
            showHideSearchBox: function() {
                var searchBox = $('#tasksExecutionView header .km-listview-wrapper');
                app.tasksExecution.viewModel.searchBox = searchBox;
                if (searchBox.is(':visible')) {
                    searchBox.hide({duration:300, complete: function() {
                        $("#tasksExecutionView #content-pane #comment > div").each( function() {
                            $(this).height($("#tasksExecutionView #content-pane #comment").height() - $("#tasksExecutionView #content-pane #comment ul").outerHeight(true) - ($(this).outerHeight(true) - $(this).height()));
                            $("#tasksExecutionView #content-pane #comment > div > div[data-role=\"scroller\"]").height($(this).height() - $("#tasksExecutionView #content-pane #comment > div > .grid").height());
                        });
                    }});
                } else {
                    searchBox.show({duration:300, complete: function() {
                        $("#tasksExecutionView #content-pane #comment > div").each( function() {
                            $(this).height($("#tasksExecutionView #content-pane #comment").height() - $("#tasksExecutionView #content-pane #comment ul").outerHeight(true) - ($(this).outerHeight(true) - $(this).height()));
                            $("#tasksExecutionView #content-pane #comment > div > div[data-role=\"scroller\"]").height($(this).height() - $("#tasksExecutionView #content-pane #comment > div > .grid").height());
                        });
                        searchBox.find('input[type=search]').focus();
                    }});
                }
            },
            show: function(e) {
                var filter = app.tasksExecution.viewModel.filter;
                var searchBox = app.tasksExecution.viewModel.searchBox;
                if (filter) {
                    if (searchBox && searchBox.is(':visible')){
                        searchBox.hide();
                    }
                    filter._clearFilter(e);
                }
                app.tasksExecution.viewModel.setTaskCounts();
                if ($('#content-pane').data('kendoMobilePane').view().id !== "#tasksExecutionGrid") {
                    $('#content-pane').data('kendoMobilePane').navigate('tasksExecutionGrid');
                }
                $("#tasksExecutionView .km-content").each(function(){
                    if ($(this).data("kendoMobileScroller")){
                        $(this).data("kendoMobileScroller").scrollTo(0, 0);
                    }
                });
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
                    if ($(this).text() === "0"){
                        $(this).hide();
                    }
                });
            },
            initContentDetail:function(){
                $("#tasksExecutionView #content-pane #comment > div").each( function() {
                    $(this).height($("#tasksExecutionView #content-pane #comment").height() - $("#tasksExecutionView #content-pane #comment ul").outerHeight(true) - ($(this).outerHeight(true) - $(this).height()));
                });
            },
            onHistoryTabShow:function(e){
                if($(e.item).attr("aria-controls") === "comment-2"){
                    $("#tasksExecutionView #content-pane #comment #history-grid-scroller").height($("#tasksExecutionView #content-pane #comment > div").height() - $("#tasksExecutionView #content-pane #comment > div > .grid").height());
                    $("#history-grid-scroller").data("kendoMobileScroller").scrollTo(0, 0);
                }
                app.tasksExecution.viewModel.tabstrip.unbind("show", this.onHistoryTabShow);
            },
            showContentDetail:function(){
                $("#tasksExecutionView #content-pane #comment").data('kendoTabStrip').activateTab($('#tasksExecutionView #content-pane #comment .k-first'));
                var dlButtons = $('#taskExecutionDetail #left-content #document-list a');
                var btn = $('#taskExecutionDetail #left-content #add-document');
                dlButtons.each(function(){
                    $(this).height(btn.height());
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