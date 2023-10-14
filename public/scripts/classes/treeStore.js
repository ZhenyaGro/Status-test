export class TreeStore {
    constructor(items) {
        this.tree = new Map(); // Создание карты для хранения и поиска элементов по id
        // Создание дубликата массива по правилам хорошего тона
        this.sourceItems = [...items];
        // Заполнение карты объектами типа Wrap
        this.sourceItems.forEach((item, i, items) => {
            this.tree.set(item.id, {
                source: item,
                childrenId: items.filter(potentialChild => potentialChild.parent === item.id)
                    .map(child => child.id)
            });
        });
        // Оборачивание методов класса в функцию-кэшер
        this.getAllChildren = this.cacher(this.getAllChildren);
        this.getAllParents = this.cacher(this.getAllParents);
    }
    /**
     * Функция-обертка для создания и хранения кэша - известных результатов на список запросов
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
    /**
     * Метод получения изначального массива элементов
     * @returns копия массива элементов, на основании которого создан объект класса TreeStore
     */
    getAll() {
        return this.sourceItems;
    }
    /**
     * Метод получения объекта по id
     * @param id id элемента
     * @returns объект элемента
     */
    getItem(id) {
        var _a;
        return (_a = this.tree.get(id)) === null || _a === void 0 ? void 0 : _a.source;
    }
    /**
    * Метод получения списка дочерних элементов заданного элемента
    * @param id id элемента
    * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
    */
    getChildren(id) {
        const childrenId = this.tree.get(id).childrenId;
        return childrenId.map(id => this.getItem(id));
    }
    /**
     * Метод получения полного списка всех дочерних элементов заданного элемента, включая вложенные
     * @param id id элемента
     * @returns массив всех дочерних элементов
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
     * Метод получения списка родительских элементов по цепочке от заданного
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
