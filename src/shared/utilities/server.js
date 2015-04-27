(function(app){

    app.getSid = function() {
        var s = app.settingsSource.data()[0];
        $.ajax({
            method:     "GET",
            url:        s.server_url,
            data: {
                type:   'logon',
                action: 'execute_unitech_mobile',
                __only_json: 1,
                login: s.login,
                password: s.password
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    $.each(data, function(key, val) {
                        s.set(key, val? val : '');
                    });
                    app.settingsSource.sync();
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
        var s = app.settingsSource.data()[0];
        $.ajax({
            method:     "GET",
            xhrFields: {
                withCredentials: true
            },
            url:        s.server_url,
            data: {
                type:       'tasks',
                mobile:     1,
                relation:   'all',
                sid:        s.sid
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    console.log(data);
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
        var s = app.settingsSource.data()[0];
        $.ajax({
            method:     "GET",
            xhrFields: {
                withCredentials: true
            },
            url:        s.server_url,
            data: {
                type:       'users',
                mobile:     1,
                sid:        s.sid
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    console.log(data);
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