$data.Entity.extend("settings", {
    id:         { type: "int", key: true, computed: true },
    server_url: {type: String}, //Адрес сервера
    login:      {type: String}, //Имя пользователя
    password:   {type: String}, //Пароль
    id_user:    {type: "int"},  //Идентификатор пользователя
    label:      {type: String}, //Фаимлия И.О.
    sid:        {type: String},
    dt_sync:    {type: Date}   //Дата синхронизации с сервером
});