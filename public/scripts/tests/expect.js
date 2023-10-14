export const items = {
    test1: [{ "id": 1, "parent": "root" }, { "id": 2, "parent": 1, "type": "test" }, { "id": 3, "parent": 1, "type": "test" }, { "id": 4, "parent": 2, "type": "test" }, { "id": 5, "parent": 2, "type": "test" }, { "id": 6, "parent": 2, "type": "test" }, { "id": 7, "parent": 4, "type": null }, { "id": 8, "parent": 4, "type": null }],
    test2: { "id": 7, "parent": 4, "type": null },
    test3: [{ "id": 7, "parent": 4, "type": null }, { "id": 8, "parent": 4, "type": null }],
    test4: [],
    test5: [{ "id": 4, "parent": 2, "type": "test" }, { "id": 5, "parent": 2, "type": "test" }, { "id": 6, "parent": 2, "type": "test" }],
    test6: [{ "id": 4, "parent": 2, "type": "test" }, { "id": 5, "parent": 2, "type": "test" }, { "id": 6, "parent": 2, "type": "test" }, { "id": 7, "parent": 4, "type": null }, { "id": 8, "parent": 4, "type": null }],
    test7: [{ "id": 4, "parent": 2, "type": "test" }, { "id": 2, "parent": 1, "type": "test" }, { "id": 1, "parent": "root" }]
};
