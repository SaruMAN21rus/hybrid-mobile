(function(app){

    'use strict';

    //below you place anything private you don't want exposed in the viewModel

    //below we create the viewModel

    app.addTask = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
        viewModel: kendo.observable({
            //the actual model
            modelData: app.taskModel,
            //other properties or functions you want to observe and expose to html
            init:function(){
                this.addButton = $('#addTaskBtn').data('kendoMobileButton');
                var addButton = this.addButton;
                $('#taskNameInput').on('change input',function(e){
                    if($(e.target).val().replace(' ','') !== ''){
                        addButton.enable(true);
                    }else{
                        addButton.enable(false);
                    }
                });
            },
            createTask:function(e){
                if(this.taskName.replace(' ','') !== ''){
                    this.modelData.dataSource.add({name:this.taskName, checkbox:this.checkbox, radio:this.radio});
                    this.modelData.dataSource.sync();
                    this.set('taskName','');
                    this.set('checkbox',false);
                    this.set('radio','Свойство1');
                    this.addButton.enable(false);
                    app.app.navigate('#:back');
                }
            },
            afterShow:function(e){
                e.view.element.find('#taskNameInput').focus();
            },
            taskName:'',
            checkbox:false,
            radio: 'Свойство1'

        })

    };

})(app); //pass in global namespace

