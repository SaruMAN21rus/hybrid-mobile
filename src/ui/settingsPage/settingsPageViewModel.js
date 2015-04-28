(function(app){
    'use strict';

    app.settingsPage = {
        viewModel: kendo.observable({
            init:function(){
                this.set('settings', app.settings);
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
                    app.settings.server_url = this.settings.server_url;
                    app.settings.login = this.settings.login;
                    app.settings.password = this.settings.password;
                    app.settings.save();
                    app.app.navigate('#:back');
                }
            },
            afterShow:function(e){
                e.view.element.find('#serverUrlInput').focus();
            },
            show:function(e){
                if (this.settings && this.settings.login && this.settings.login !== '') {
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
            settings: app.settings
        })

    };

})(app);

