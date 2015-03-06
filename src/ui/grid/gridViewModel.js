(function(app){

    'use strict';

    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel

    app.grid = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            //the actual model
            modelData: app.taskModel,
            //other properties or functions you want to observe and expose to html
            init:function(){
                this.createGrid();
            },
            createGrid:function() {
                $("#gridView #kendoGrid").kendoGrid({
                    dataSource: this.modelData.dataSource,
                    pageable: {
                        pageSize: 2
                    },
                    height: window.innerHeight - $("#gridView > header").height(),
                    columns: [
                        { field: "id", title: "Идентификатор", width: "5%"},
                        { field: "name", title: "Наименование", width: "45%"},
                        { field: "checkbox", title: "Чекбокс", width: "10%"},
                        { field: "radio", title: "Свойство", width: "20%"},
                        { command: ["edit", "destroy"], title: "&nbsp;", width: "30%"}
                    ],
                    editable: "inline",
                    toolbar: ["create"]
                });
            }
        })
    };

})(app); //pass in global namespace