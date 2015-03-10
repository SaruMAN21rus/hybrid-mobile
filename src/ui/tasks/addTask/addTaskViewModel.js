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
                this.doneButton = $('#addTaskDoneBtn').data('kendoMobileButton');
                var doneButton = this.doneButton;
                $('#taskNameInput').on('change input',function(e){
                    if($(e.target).val().replace(' ','') !== ''){
                        doneButton.enable(true);
                    }else{
                        doneButton.enable(false);
                    }
                });
            },
            createTask:function(e){
                if(this.taskName.replace(' ','') !== ''){
                    if (typeof this.id == "undefined")
                        this.modelData.dataSource.add({name:this.taskName, checkbox:this.checkbox, radio:this.radio});
                    else {
                        this.model.set('name',this.taskName);
                        this.model.set('checkbox',this.checkbox);
                        this.model.set('radio',this.radio);
                    }
                    this.modelData.dataSource.sync();
                    app.app.navigate('#:back');
                }
            },
            afterShow:function(e){
                e.view.element.find('#taskNameInput').focus();
            },
            show:function(e){
                this.id = e.view.params.id;
                if (typeof this.id != "undefined") {
                    this.model = this.modelData.dataSource.get(this.id);
                    this.set('taskName',this.model.name);
                    this.set('checkbox',JSON.parse(this.model.checkbox));
                    this.set('radio',this.model.radio);
                    this.doneButton.enable(true);
                } else {
                    this.set('taskName','');
                    this.set('checkbox',false);
                    this.set('radio','Свойство1');
                    this.doneButton.enable(false);
                }
            },
            taskName:'',
            checkbox:false,
            radio: 'Свойство1'

        })

    };

})(app); //pass in global namespace

