(function(app){

    'use strict';
    
    $(window).resize(function() {
        
        app.rightMenuButtonSize = $(window).height()/9;
        
        var rightMenu = $("#right-menu");
        var rightMenuButtons = $("#right-menu .km-button");
        var icons = $(".bigButtonWithIcon .icon");
        var texts = $(".bigButtonWithIcon .text");
        var tasksExecutionMenuButtons = $('#tasksExecutionView #menu-pane a[data-role="button"]');
        var tasksExecutionMenuButtonHeight = $(tasksExecutionMenuButtons[0]).outerHeight(true);

        rightMenuButtons.each(
            function () {
                $(this).height(app.rightMenuButtonSize-1);
                $(this).width(app.rightMenuButtonSize);
                $(this).css({
                    fontSize: app.rightMenuButtonSize*0.7,
                    lineHeight: app.rightMenuButtonSize+"px"
                });
            }
        );
        
        if(app.rightMenu.viewModel.isVisible){
            $(app.app.view().id).width($(window).width() - app.rightMenuButtonSize);
        }
        rightMenu.width(app.rightMenuButtonSize-1);
                  
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

        tasksExecutionMenuButtons.each(
            function () {
                $(this).height($(this).width());
            }
        );

        $('#tasksExecutionView #menu-pane #menu-tree').height($('#tasksExecutionView #menu-pane').height() - tasksExecutionMenuButtonHeight);
        $('#tasksExecutionView #menu-pane #menu-tree').css('margin-top', tasksExecutionMenuButtonHeight + 'px');

        $("#tasksExecutionView #content-pane #comment > div").each( function() {
            $(this).height($("#tasksExecutionView #content-pane #comment").height() - $("#tasksExecutionView #content-pane #comment ul").outerHeight(true) - ($(this).outerHeight(true) - $(this).height()));
            $("#tasksExecutionView #content-pane #comment > div > div[data-role=\"scroller\"]").height($(this).height() - $("#tasksExecutionView #content-pane #comment > div > .grid").height());
        });
        
        var dlStandartBtn = $('#taskExecutionDetail #right-content #end-task');
        $('#taskExecutionDetail #left-content #document-list a').each(function(){
            $(this).height(dlStandartBtn.height());
        });
        $('#taskExecutionDetail #left-content #add-document').height(dlStandartBtn.height());
        $("#taskExecutionDetail #document-list-scroller").height($("#taskExecutionDetail #left-content").outerHeight() - $("#taskExecutionDetail #document-list-scroller").position().top - ($("#taskExecutionDetail #left-content").outerHeight() - $("#taskExecutionDetail #left-content").height())/2);
    });
})(app);