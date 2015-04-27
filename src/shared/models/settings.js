$data.Entity.extend("settings", {
    id:         { type: "int", key: true, computed: true },
    server_url: {type: String}, //Адрес сервера
    login:      {type: String}, //Имя пользователя
    password:   {type: String}, //Пароль
    id_user:    {type: "int"}, //Идентификатор
    label:      {type: String}, //Фаимлия И.О.
    sid:        {type: String}
});