$data.Entity.extend("users", {
    id:                 {type: "int", key: true, computed: true },
    id_server:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    tab_number:         {type: String}, //��������� �����
    label:              {type: String}, //���
    short_label:        {type: String}, //������� �. �.
    f:                  {type: String}, //�������
    i:                  {type: String}, //���
    o:                  {type: String}, //��������
    phone:              {type: String}, //�������
    phone_dig:          {type: String}, //����� ��������
    mobile_phone:       {type: String}, //������� �������
    mobile_phone_dig:   {type: String}, //����� �������� ��������
    mail:               {type: String}, //e-mail
    is_fired:           {type: Boolean}, //������������ ������ �� ������ ������
    login:              {type: String}, //�����
    password:           {type: String}, //������
    initiated_tasks:    {type: Array, elementType:"tasks", inverseProperty: "id_user_initiator"}, //�������������� ������������� ������
    exected_tasks:      {type: Array, elementType:"tasks", inverseProperty: "id_user_executor"}, //����������� �������������� ������
    inspected_tasks:    {type: Array, elementType:"tasks", inverseProperty: "id_user_inspector"} //�������������� ������������� ������
});