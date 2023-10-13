class TreeStore {
    constructor(items) {
        this.tree = new Map(); // Создаем карту, чтобы находить элементы по id
        // Присвоена ссылка на исходный массив, т.к. метод getAll должен возвращать исходный массив
        this.sourceItems = items;
        this.sourceItems.forEach((item, i, items) => {
            this.tree.set(item.id, {
                source: item,
                childrenId: items.filter(potentialChild => potentialChild.parent === item.id)
                    .map(child => child.id)
            });
        });
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
        return this.tree.get(id).source;
    }
    /**
    *
    * @param id id элемента
    * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
    */
    getChildren(id) {
        return this.tree.get(id).childrenId.map(id => this.getItem(id));
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
        while (current && current.parent != 'root') {
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
module.exports = ts;
