$data.Entity.extend("tasks", {
    id:                 {type: "int", key: true, computed: true },
    id_server:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    parent:             {type: "tasks", inverseProperty: "childs", keys: ["parent"]}, //������������ ������
    childs:             {type: Array, elementType:"tasks", inverseProperty: "parent"}, //�������� ������
    id_user_initiator:  {type: "users", inverseProperty: "initiated_tasks", keys: ["id_user_initiator"]}, //���������
    dt:                 {type: Date}, //���� ��������
    label:              {type: String}, //����� ������
    id_user_executor:   {type: "users", inverseProperty: "exected_tasks", keys: ["id_user_executor"]}, //�����������
    id_user_inspector:  {type: "users", inverseProperty: "inspected_tasks", keys: ["id_user_inspector"]}, //���������
    dt_from_plan:       {type: Date}, //���� ������ ��������
    dt_to_plan:         {type: Date}, //���� ��������� ��������
    dt_from_fact:       {type: Date}, //���� ������ �����������
    dt_to_fact:         {type: Date}, //���� ��������� �����������
    //id_task_type:       {type: "task_types"}, //���
    id_task_status:     {type: "task_status", inverseProperty: "tasks", keys: ["id_task_status"]} //������
});