(function(app){

    app.createKendoDataSources = function() {
        app.taskSource = app.db.tasks.asKendoDataSource();
        app.taskStatusSource = app.db.task_statuses.asKendoDataSource();
        app.taskStatusSource.read();
    }       
})(app);