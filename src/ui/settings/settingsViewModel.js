(function(app){
    'use strict';

    app.settings = {
        viewModel: kendo.observable({
            modelData: app.settingsSource,
            init:function(){
                this.modelData = app.settingsSource;
                this.saveButton = $('#settingsSaveBtn').data('kendoMobileButton');
                this.cancelButton = $('#settingsCancelBtn').data('kendoMobileButton');
                var that = this;
                $('#serverUrlInput').on('change input',function(e){
                    that.checkInputs();
                });
                $('#loginInput').on('change input',function(e){
                    that.checkInputs();
                });
                $('#passwordInput').on('change input',function(e){
                    that.checkInputs();
                });
            },
            saveSettings:function(){
                if(this.settings.server_url.replace(' ','') !== ''
                    && this.settings.login.replace(' ','') !== ''
                    && this.settings.password.replace(' ','') !== ''){
                    if (this.modelData.data().length === 0){
                        this.modelData.add(this.settings);
                    }
                    this.modelData.sync();
                    app.app.navigate('#:back');
                }
            },
            afterShow:function(e){
                e.view.element.find('#serverUrlInput').focus();
            },
            show:function(e){
                if (this.modelData && this.modelData.data().length > 0) {
                    this.edit = true;
                    this.set('settings',this.modelData.data()[0]);
                    this.saveButton.enable(true);
                } else {
                    this.saveButton.enable(false);
                    this.cancelButton.enable(false);
                }
            },
            checkInputs:function(){
                if($('#serverUrlInput').val().replace(' ','') !== ''
                    && $('#loginInput').val().replace(' ','') !== ''
                    && $('#passwordInput').val().replace(' ','') !== ''){
                    this.saveButton.enable(true);
                } else {
                    this.saveButton.enable(false);
                }
            },
            settings: {
                server_url:'', 
                login:'', 
                password:''
            },
            edit: false
        })

    };

})(app);

