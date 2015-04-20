$data.EntityContext.extend("KetraDatabase", {
    Agents: { type: $data.EntitySet, elementType: Agent },
    Tasks: { type: $data.EntitySet, elementType: Task },
    Tests: { type: $data.EntitySet, elementType: Test }
});