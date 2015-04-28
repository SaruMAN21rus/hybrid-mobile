(function(app){

    app.createKendoDataSources = function() {
        app.allTaskSource = app.db.tasks
            .filter("it.id_user_initiator == " + app.settings.id_user + " || it.id_user_executor == " + app.settings.id_user + "|| it.id_user_inspector == " + app.settings.id_user)
            .asKendoDataSource({pageSize: 100});
        app.initiateTaskSource = app.db.tasks
            .filter("it.id_user_initiator == " + app.settings.id_user)
            .asKendoDataSource({pageSize: 100});
        app.executeTaskSource = app.db.tasks
            .filter("it.id_user_executor == " + app.settings.id_user)
            .asKendoDataSource({pageSize: 100});
        app.inspectTaskSource = app.db.tasks
            .filter("it.id_user_inspector == " + app.settings.id_user)
            .asKendoDataSource({pageSize: 100});
    }       
})(app);