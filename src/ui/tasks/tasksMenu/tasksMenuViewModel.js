(function(app){
    'use strict';
    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel 
    app.tasksMenu = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            //the actual model
            modelData: app.taskModel,
            //other properties or functions you want to observe and expose to html
            init:function() {
                $('#tasksMenuView #currentDate').text(app.currentDate);
                this.modelData.createTable();
            },
            addTask:function(){
                this.modelData.dataSource.add({name:"test"});
                this.modelData.dataSource.sync();
            },
            showTasks:function(){
                this.modelData.dataSource.fetch(function(){
                    var data = this.data();
                    console.log(data.length);
                });
            },
            goToAnalytics:function(){
                //alert("В разработке");
            },
            goToTasks:function(){
                //alert("В разработке");
            },
            goToDocuments:function(){
                //alert("В разработке");
            },
            goToFavorites:function(){
               // alert("В разработке");
            },
            importantTasksCount: 0,
            overdueTasksCount: 0,
            newPerformTasksCount: 1,
            overduePerformTasksCount: 0,
            newConformTasksCount: 1,
            newControlTasksCount: 1,
            overdueControlTasksCount: 0,
            newDocumentsCount: 1
        })
    };
})(app); //pass in global namespace