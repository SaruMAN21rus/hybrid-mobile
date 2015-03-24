(function(app){

    'use strict';
    
    $(window).resize(function() {
        
        app.rightMenuButtonSize = $(window).height()/9;
        
        var rightMenu = $("#right-menu");
        var rightMenuButtons = $("#right-menu .km-button");
        var icons = $(".bigButtonWithIcon .icon");
        var texts = $(".bigButtonWithIcon .text");
        var tasksExecutionMenuButtons = $('#tasksExecutionView #menu-pane a[data-role="button"]');

        rightMenuButtons.each(
            function () {
                $(this).height(app.rightMenuButtonSize-2);//2 - border
                $(this).width(app.rightMenuButtonSize-2);
                $(this).css({
                    fontSize: app.rightMenuButtonSize*0.7,
                    lineHeight: app.rightMenuButtonSize+"px"
                });
            }
        );
        
        if(app.rightMenu.viewModel.isVisible){
            $(app.app.view().id).width($(window).width() - app.rightMenuButtonSize);
        }
        rightMenu.width(app.rightMenuButtonSize);
                  
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
    });
})(app);