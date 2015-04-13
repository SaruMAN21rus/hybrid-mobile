$data.Entity.extend("Test", {
    id: { type: "int", key: true, computed: true },
    name: {type: String},
    delay: {type: Number},
    sum: {type: Number},
    status: {type: String}
});