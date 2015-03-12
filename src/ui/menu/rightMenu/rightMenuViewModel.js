(function(app){
    'use strict';
    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel 
    app.rightMenu = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            showRightMenu: function(e){
                var drawer = $("#right-menu").data("kendoMobileDrawer")
                this.drawer = drawer;
                if (!drawer.visible) {
                    drawer.show();
                } else {
                    drawer.hide();
                }
            },
            onShow: function(e) {
                $(app.app.view().id).animate({
                    width: "-=100",
                    left: "+=100"
                }, 0);
            },
            onHide: function(e) {
                if (typeof app.app != "undefined") {
                    $(app.app.view().id).animate({
                        width: "+=100",
                        left: "-=100"
                    }, 0);
                }
            },
        })
    };
})(app); //pass in global namespace