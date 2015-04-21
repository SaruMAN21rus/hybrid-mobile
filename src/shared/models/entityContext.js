$data.EntityContext.extend("KetraDatabase", {
    Agents: { type: $data.EntitySet, elementType: Agent },
    Tasks: { type: $data.EntitySet, elementType: tasks },
    Tests: { type: $data.EntitySet, elementType: Test },
    Users: { type: $data.EntitySet, elementType: users },
    Task_status: {type: $data.EntitySet, elementType: task_status }
});