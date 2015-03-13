(function(app){
    'use strict';
    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel 
    app.rightMenu = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            init: function(e) {
                var buttons = $("#right-menu .km-button");
                var menu = $("#right-menu");
                
                var buttonSize = $(window).height()/9;
                app.rightMenu.menuWidth = buttonSize;
                menu.width(buttonSize);
                console.log(buttonSize);
                buttons.each(
                    function () {
                        $(this).height(buttonSize-2);
                        $(this).width(buttonSize-2)
                        $(this).css({
                            fontSize: buttonSize*0.7,
                            lineHeight: buttonSize+"px"
                        });
                    }
                );

                $(window).resize(function() {
                    var buttonSize = window.height/9;
                    app.rightMenu.menuWidth = buttonSize;
                    menu.width(buttonSize);
                    buttons.each(
                        function () {
                            $(this).height(buttonSize-2);
                            $(this).width(buttonSize-2)
                        }
                    );
                });
            },
            showRightMenu: function(e){
                var drawer = $("#right-menu");
                var view = app.app.view();
                var visible = app.rightMenu.isVisible;
                var menuWidth = app.rightMenu.menuWidth;
                if (!visible) {
                    app.rightMenu.isVisible = true;
                    drawer.show({duration: 400});
                    $(view.id).animate({
                        width: "-=" + menuWidth
                    }, 400);
                } else {
                    app.rightMenu.isVisible = false;
                    $(view.id).animate({
                        width: "+=" + menuWidth
                    }, 400);
                    drawer.hide({duration: 400});
                }
            },
            isVisible: false,
            menuWidth: 50
        })
    };
})(app);