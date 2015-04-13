(function(app){
    'use strict';

    app.addTask = {
        viewModel: kendo.observable({
            modelData: app.tasksList.viewModel.modelData,
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
            createTask:function(){
                if(this.task.name.replace(' ','') !== ''){
                    if (typeof this.id === "undefined"){
                        this.modelData.add(this.task);
                    }
                    this.modelData.sync();
                    app.app.navigate('#:back');
                }
            },
            afterShow:function(e){
                e.view.element.find('#taskNameInput').focus();
            },
            show:function(e){
                this.id = e.view.params.id;
                if (typeof this.id !== "undefined") {
                    this.set('task',this.modelData.get(this.id));
                    this.doneButton.enable(true);
                } else {
                    this.set('task', {name:'', checkbox:false, radio:'Свойство1'});
                }
            },
            task: {
                name:'', 
                checkbox:false, 
                radio:'Свойство1'
            }
        })

    };

})(app);

