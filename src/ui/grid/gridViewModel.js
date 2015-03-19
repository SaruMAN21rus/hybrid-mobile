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
                    dataSource: this.modelData,
                    height: window.innerHeight - $("#gridView > header").height(),
                    columns: [
                        { field: "Id", title: "Идентификатор", width: 120},
                        { field: "name", title: "Наименование", width: 450},
                        { field: "checkbox", title: "Чекбокс", width: 100},
                        { field: "radio", title: "Свойство", width: 200},
                        { command: ["edit", "destroy"], title: "&nbsp;", width: 300}
                    ],
                    editable: "inline",
                    toolbar: ["create"],
                    groupable: true,
                        sortable: true,
                        pageable: {
                            refresh: true,
                            pageSizes: true,
                            buttonCount: 5
                        },
                });
            }
        })
    };

})(app); //pass in global namespace