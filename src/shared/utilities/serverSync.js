(function(app){

    app.getSid = function() {
        $.ajax({
            method:     "GET",
            url:        app.settings.server_url,
            data: {
                type:   'logon',
                action: 'execute_unitech_mobile',
                __only_json: 1,
                login: app.settings.login,
                password: app.settings.password
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    $.each(data, function(key, val) {
                        eval('app.settings.' + key + ' = ' + val);
                    });
                    app.settings.save();
                } else {
                    alert(data.error);
                }
            },
            fail: function(error){
                alert(error);
            }
        });
    };

    app.getTasks = function() {
        $.ajax({
            method:     "GET",
            xhrFields: {
                withCredentials: true
            },
            url:        app.settings.server_url,
            data: {
                type:       'tasks',
                mobile:     1,
                relation:   'all',
                sid:        app.settings.sid
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    app.db.tasks.addMany(data.tasks);
                    app.db.saveChanges();
                } else {
                    alert(data.error);
                }
            },
            fail: function(error){
                alert(error);
            }
        });
    };   

    app.getUsers = function() {
        $.ajax({
            method:     "GET",
            xhrFields: {
                withCredentials: true
            },
            url:        app.settings.server_url,
            data: {
                type:       'users',
                mobile:     1,
                sid:        app.settings.sid
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    app.db.users.addMany(data.users);
                    app.db.saveChanges();
                } else {
                    alert(data.error);
                }
            },
            fail: function(error){
                alert(error);
            }
        });
    }  
})(app);