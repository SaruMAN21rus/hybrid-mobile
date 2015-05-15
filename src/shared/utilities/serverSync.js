(function(app){

    app.getSid = function() {
        $.ajax({
            method:     "GET",
            url:        app.settings.server_url,
            data: {
                type:     'logon',
                action:   'execute',
                mobile:   1,
                login:    app.settings.login,
                password: app.settings.password,
                salt:     Math.random()
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    $.each(data, function(key, val) {
                        app.settings[key] = val;
                    });
                    app.settings.save();
                    app.sync();
                } else {
                    alert(data.error);
                }
            },
            fail: function(error){
                alert(error);
            }
        });
    };

    app.sync = function() {
        $.ajax({
            method:     "POST",
            xhrFields: {
                withCredentials: true
            },
            url:        app.settings.server_url,
            headers:    {'X-Requested-With': 'XMLHttpRequest'},
            data: {
                type:       'mobile',
                mobile:     1,
                action:     'synchronize',
                sid:        app.settings.sid,
                dt_sync:    app.settings.dt_sync ? kendo.toString(app.settings.dt_sync, 'yyyy-MM-dd HH:mm:ss'): null,
                content:    null,//JSON.stringify(content),
                salt:       Math.random()
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    if (data.kickout === 1){
                        app.getSid();
                    } else {
                        if (app.settings.dt_sync){
                            var userCount = data.users.length,
                                taskCount = data.tasks.length,
                                userProcessed = 0, taskProcessed = 0;
                            if (userCount > 0){
                                $.each(data.users, function(idx, user){
                                    app.db.users.filter('uuid','==', user.uuid).toArray()
                                        .then(function(result){
                                            var userToUpdate = app.db.users.attachOrGet({uuid: user.uuid});
                                            $.each(user, function(key, val) {
                                                userToUpdate[key] = val;
                                            });
                                            if (result.length == 0){
                                                app.db.users.add(userToUpdate);
                                            }
                                            userProcessed++;
                                            if (userCount == userProcessed){
                                                app.db.saveChanges({
                                                    success: function(){
                                                        app.settings.dt_sync = data.dt_sync;
                                                        app.settings.save();
                                                        console.log(data);
                                                    }
                                                });
                                            }
                                        });
                                });
                            } else {
                                app.settings.dt_sync = data.dt_sync;
                                app.settings.save();
                                console.log(data);
                            }
                        } else {
                            app.db.users.addMany(data.users);
                            app.db.tasks.addMany(data.tasks);
                            app.db.saveChanges({
                                success: function(){
                                    app.settings.dt_sync = data.dt_sync;
                                    app.settings.save();
                                    console.log(data);
                                }
                            });
                        }
                    }
                } else {
                    alert(data.error);
                    console.log(data.error);
                }
            },
            fail: function(error){
                alert(error);
                console.log(data.error);
            }
        });
    };
})(app);