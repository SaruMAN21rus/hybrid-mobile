(function(app){
    'use strict';

    app.rightMenu = {
        viewModel: kendo.observable({
            init: function() {
                var buttons = $("#right-menu .km-button");
                var menu = $("#right-menu");
                
                app.rightMenuButtonSize = $(window).height()/9;
                menu.width(app.rightMenuButtonSize);
                buttons.each(
                    function () {
                        $(this).height(app.rightMenuButtonSize-2);
                        $(this).width(app.rightMenuButtonSize-2);
                        $(this).css({
                            fontSize: app.rightMenuButtonSize*0.7,
                            lineHeight: app.rightMenuButtonSize+"px"
                        });
                    }
                );
            },
            showRightMenu: function(e){
                if (!app.rightMenu.viewModel.isVisible) {
                    app.rightMenu.viewModel.isVisible = true;
                    $("#right-menu").show({duration: 400});
                    app.rightMenu.viewModel.view = app.app.view();
                    $(app.app.view().id).animate({
                        width: "-=" + app.rightMenuButtonSize
                    }, 400);
                } else {
                    app.rightMenu.viewModel.exitMenu(e);
                }
            },
            exitMenu: function(e) {
                if (typeof app.app !== "undefined" && app.rightMenu.viewModel.isVisible && app.rightMenu.viewModel.view !== null) {
                    app.rightMenu.viewModel.isVisible = false;
                    var duration = typeof e.view !== "undefined" ? 0 : 400; 
                    $(app.rightMenu.viewModel.view.id).animate({
                        width: "100%"
                    }, duration);
                    $("#right-menu").hide({duration: duration});
                    app.rightMenu.viewModel.view = null;
                }
            },
            isVisible: false,
            view: null
        })
    };
})(app);