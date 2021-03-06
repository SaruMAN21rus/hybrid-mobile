(function(app){

	'use strict';
 
	app.tasksExecution = {
		viewModel: kendo.observable({
			modelData: null,
			init:function(){
                app.tasksExecution.viewModel.modelData = app.allTaskSource;
                var filterOption = {
                    field : "name"
                };
                app.tasksExecution.viewModel.filter = new app.Filter($('#tasksExecutionView div[data-role="navbar"]'), app.tasksExecution.viewModel.modelData, filterOption, null);
                $('#tasksExecutionView header .km-listview-wrapper').hide();

                $("#content-pane #tasksExecutionList").kendoMobileListView({
                    dataSource: app.tasksExecution.viewModel.modelData,
                    template: $("#tasksExecutionListItemTemplate").text(),
                    endlessScroll: true
                });
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
                var buttons = $("#tasksExecutionView #menu-pane .big-btn");
                buttons.each(
                    function () {
                        $(this).height($(this).width());
                        $(this).children(".km-icon").css({'font-size': $(this).width()});
                    }
                );
                var menu_tree = $('#menu-pane #menu-tree');
                menu_tree.height($('#menu-pane').height() - $(buttons[0]).outerHeight(true));
                menu_tree.css('margin-top', $(buttons[0]).outerHeight(true) + 'px');
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
                var that = this;
                app.allTaskSource.fetch()
                .then(function(){
                    that.set("taskCount", app.allTaskSource.total());
                })
                .then(app.initiateTaskSource.fetch()
                    .then(function(){
                        that.set("outboxTaskCount", app.initiateTaskSource.total());
                    })
                )
                .then(app.executeTaskSource.fetch()
                    .then(function(){
                        that.set("forExecutionTaskCount", app.executeTaskSource.total());
                    })
                )
                .then(app.inspectTaskSource.fetch()
                    .then(function(){
                        that.set("forControlTaskCount", app.inspectTaskSource.total());
                    })
                )
                .then(function(){
                    that.set("reworkTaskCount", 0);
                    that.set("agreementTaskCount", 0);
                    that.set("forAgreementTaskCount", 0);
                    that.set("myDocumentCount", 0);
                    menuTreeItems.each(function(){
                        if ($(this).text() === "0"){
                            $(this).hide();
                        } else {
                            $(this).show();
                        }
                    });
                    var menu_tree = $('#menu-pane #menu-tree');
                    var allTasksBranch = $(menu_tree.data('kendoMobileListView').items()[0]);
                    var a = {item : allTasksBranch};
                    app.tasksExecution.viewModel.menuTreeClick(a);
                    });
            },
            initContentDetail:function(){
                $("#tasksExecutionView #content-pane #comment > div").each( function() {
                    $(this).height($("#tasksExecutionView #content-pane #comment").height() - $("#tasksExecutionView #content-pane #comment ul").outerHeight(true) - ($(this).outerHeight(true) - $(this).height()));
                });
                $("#taskExecutionDetail #document-list").kendoMobileListView({
                    dataSource: this.modelData,
                    template: $("#documentItemTemplate").text(),
                    dataBound: function(e) {
                        var standartBtn = $('#taskExecutionDetail #right-content #end-task');
                        $('#taskExecutionDetail #left-content #document-list a').each(function(){
                            $(this).height(standartBtn.height());
                        });
                        $('#taskExecutionDetail #left-content #add-document').height(standartBtn.height());
                    }
                });
            },
            onHistoryTabShow:function(e){
                if($(e.item).attr("aria-controls") === "comment-2"){
                    $("#tasksExecutionView #content-pane #comment #history-grid-scroller").height($("#tasksExecutionView #content-pane #comment > div").height() - $("#tasksExecutionView #content-pane #comment > div > .grid").height());
                    $("#history-grid-scroller").data("kendoMobileScroller").scrollTo(0,0);
                }
                app.tasksExecution.viewModel.tabstrip.unbind("show", this.onHistoryTabShow);
            },
            showContentDetail:function(e){
                $('#tasksExecutionView .detailButton').show();
                $('#tasksExecutionView .gridButton').hide();
                $("#tasksExecutionView #content-pane #comment").data('kendoTabStrip').activateTab($('#tasksExecutionView #content-pane #comment .k-first'));
                $("#taskExecutionDetail #document-list-scroller").height($("#taskExecutionDetail #left-content").outerHeight() - $("#taskExecutionDetail #document-list-scroller").position().top - ($("#taskExecutionDetail #left-content").outerHeight() - $("#taskExecutionDetail #left-content").height())/2);
                if (e.view.params.id) {
                    app.tasksExecution.viewModel.set('task',this.modelData.get(e.view.params.id));
                    app.tasksExecution.viewModel.task.set('dt_string', this.task.dt ? kendo.toString(this.task.dt, 'dd.MM.yyyy') : '');
                    app.tasksExecution.viewModel.task.set('dt_to_plan_string', this.task.dt_to_plan ? kendo.toString(this.task.dt_to_plan, 'dd.MM.yyyy') : '');
                }
            },
            menuTreeClick: function(e){
                if (e.item.data('folder') === true) {
                    if (app.tasksExecution.viewModel.openFolder){
                        app.tasksExecution.viewModel.openFolder.toggleClass("km-open-folder");
                    } else {
                        $("#tasksExecutionView #menu-pane #menu-tree").children().first().find(".km-icon").toggleClass("km-open-folder");
                    }
                    app.tasksExecution.viewModel.openFolder = e.item.find(".km-icon");
                    app.tasksExecution.viewModel.openFolder.toggleClass("km-open-folder");
                }
                if($('#content-pane').data('kendoMobilePane').view().id !== '#tasksExecutionGrid'){
                    $('#content-pane').data('kendoMobilePane').navigate('#:back');
                }
                var group = e.item.data('group');
                if (group) {
                    if (group === "all"){
                        app.tasksExecution.viewModel.modelData = app.allTaskSource;
                    } else if (group === "outbox"){
                        app.tasksExecution.viewModel.modelData = app.initiateTaskSource;
                    } else if (group === "execution"){
                        app.tasksExecution.viewModel.modelData = app.executeTaskSource;
                    } else if (group === "control"){
                        app.tasksExecution.viewModel.modelData = app.inspectTaskSource;
                    }
                    $("#content-pane #tasksExecutionList").data('kendoMobileListView').scroller().scrollTo(0,0);
                    $("#content-pane #tasksExecutionList").data('kendoMobileListView').setDataSource(app.tasksExecution.viewModel.modelData);
                }
            },
            goBack: function(e){
                if($('#content-pane').data('kendoMobilePane').view().id === '#tasksExecutionGrid'){
                    app.app.navigate('#:back');
                } else {
                    $('#content-pane').data('kendoMobilePane').navigate('#:back');
                }
            },
            showGrid: function(){
                $('#tasksExecutionView .detailButton').hide();
                $('#tasksExecutionView .gridButton').show();
            },
            test: function(){
                console.log(app.tasksExecution.viewModel.task);
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