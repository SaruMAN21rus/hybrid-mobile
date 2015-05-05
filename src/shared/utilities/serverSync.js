(function(app){

    app.getSid = function() {
        $.ajax({
            method:     "GET",
            url:        app.settings.server_url,
            data: {
                type:   'logon',
                action: 'execute',
                mobile: 1,
                login: app.settings.login,
                password: app.settings.password
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    $.each(data, function(key, val) {
                        app.settings[key] = val;
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

    app.sync = function() {
        var content = {
            tasks:[
                {
                    "id":598583,
                    "parent":null,
                    "id_user_initiator":918455,
                    "user_initiator_label":"Юртаева Елена Николаевна",
                    "dt":"2014-01-22T13:34:00.000Z",
                    "label":"Получить согласованный список платежей из РЖД и отметить в системе",
                    "id_user_executor":0,
                    "user_executor_label":null,
                    "id_user_inspector":null,
                    "user_inspector_label":null,
                    "dt_from_plan":"2014-01-22T13:34:00.000Z",
                    "dt_to_plan":"2014-01-24T20:59:00.000Z",
                    "dt_from_fact":null,
                    "dt_to_fact":null,
                    "task_type_label":"Согласовать список платежей",
                    "id_task_status":1,
                    "task_status_label":"Взять в работу",
                    "dt_sync":"2015-04-28T07:17:49.000Z"
                },{
                    "id":599473,
                    "parent":null,
                    "id_user_initiator":927561,
                    "user_initiator_label":"Меркушова Екатерина Константиновна",
                    "dt":"2014-01-23T12:14:31.000Z","label":"Получить согласованный список платежей из РЖД и отметить в системе",
                    "id_user_executor":0,
                    "user_executor_label":null,
                    "id_user_inspector":null,
                    "user_inspector_label":null,
                    "dt_from_plan":"2014-01-23T12:14:00.000Z",
                    "dt_to_plan":"2014-01-27T20:59:00.000Z",
                    "dt_from_fact":null,"dt_to_fact":null,
                    "task_type_label":"Согласовать список платежей",
                    "id_task_status":1,
                    "task_status_label":"Взять в работу",
                    "dt_sync":"2015-04-28T07:17:49.000Z"
                }
            ],
            users:[
                {
                    "id":2,
                    "label":"Лобзин Роман Александрович (ВПРМЗ)",
                    "short_label":"Лобзин Р. А.",
                    "dt_sync":"2015-04-28T07:17:47.000Z"
                },{
                    "id":7,
                    "label":"Митина Светлана Вячеславовна",
                    "short_label":"Митина С. В.",
                    "dt_sync":"2015-04-28T07:17:47.000Z"
                }
            ]
        };



        $.ajax({
            method:     "POST",
            xhrFields: {
                withCredentials: true
            },
            url:        app.settings.server_url,
            data: {
                type:       'tasks',
                mobile:     1,
                action:     'synchronize',
                sid:        app.settings.sid,
                dt_sync:    app.settings.dt_sync,
                content:    content,
                dt_sync:    "2015-04-28T07:17:47.000Z"
            },
            success:function(data){
                if (!data.error || data.error === '') {
                    console.log(data);
                    //app.db.tasks.addMany(data.tasks);
                    //app.db.saveChanges();
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