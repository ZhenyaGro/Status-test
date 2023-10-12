class TreeStore {
    constructor(items) {
        /*
        Создание дубликата массива по правилам хорошего тона.
        Но можно просто присвоить ссылку на items, если необходимо вернуть именно его в методе getAll
        */
        this.items = [...items];
    }
    /**
     *
     * @returns изначальный массив элементов
     */
    getAll() {
        return this.items;
    }
    /**
     *
     * @param id id элемента
     * @returns объект элемента
     */
    getItem(id) {
        return this.items.find((item) => item.id === id);
    }
    /**
    *
    * @param id id элемента
    * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
    */
    getChildren(id) {
        return this.items.filter((item) => item.parent === id);
    }
    /**
     *
     * @param id id элемента
     * @returns массив всех дочерних элементов, включая вложенные
     */
    getAllChildren(id) {
        const children = [];
        const queue = this.getChildren(id);
        while (queue.length > 0) {
            const current = queue.shift();
            children.push(current);
            queue.push(...this.getChildren(current.id));
        }
        return children;
    }
    /**
     *
     * @param id id элемента
     * @returns массив родительских элементов
     */
    getAllParents(id) {
        const item = this.getItem(id);
        if (!item)
            return [];
        const parents = [];
        let current = item;
        while (current) {
            current = this.getItem(current.parent);
            if (current)
                parents.push(current);
        }
        return parents;
    }
}
const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);
console.log(ts.getAll()); // [{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log(ts.getItem(7)); // {"id":7,"parent":4,"type":null}
console.log(ts.getChildren(4)); // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log(ts.getChildren(5)); // []
console.log(ts.getChildren(2)); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]
console.log(ts.getAllChildren(2)); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log(ts.getAllParents(7)); // [{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]
