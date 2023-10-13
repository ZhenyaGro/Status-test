class TreeStore {
    constructor(items) {
        this.sourceItems = [...items];
        this.getItem = this.cacherItem(this.getItem);
        this.getChildren = this.cacher(this.getChildren);
        this.getAllChildren = this.cacher(this.getAllChildren);
        this.getAllParents = this.cacher(this.getAllParents);
    }
    /**
     *
     * @param func кэшируемая функция
     * @returns результат выполнения кэшируемой функции
     */
    cacher(func) {
        const cache = new Map();
        return function (id) {
            if (!cache.has(id))
                cache.set(id, func.call(this, id));
            return cache.get(id);
        };
    }
    cacherItem(func) {
        const cache = new Map();
        return function (id) {
            if (!cache.has(id))
                cache.set(id, func.call(this, id));
            return cache.get(id);
        };
    }
    /**
     *
     * @returns изначальный массив элементов
     */
    getAll() {
        return this.sourceItems;
    }
    /**
     *
     * @param id id элемента
     * @returns объект элемента
     */
    getItem(id) {
        return this.sourceItems.find(item => item.id === id);
    }
    /**
    *
    * @param id id элемента
    * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
    */
    getChildren(id) {
        return this.sourceItems.filter(item => item.parent === id);
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
module.exports = ts;
