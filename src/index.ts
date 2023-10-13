// Тип возможных объектов
type Item = {
  id: string | number;
  parent: string | number;
  type?: string | null;
};

class TreeStore {
  private sourceItems: Item[];

  constructor(items: Item[]) {
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
  private cacher(func: Function) {
    const cache = new Map<string | number, Item[]>();

    return function (id: number | string) {
      if (!cache.has(id))
        cache.set(id, func.call(this, id));

      return cache.get(id);
    };
  }

  private cacherItem(func: Function) {
    const cache = new Map<string | number, Item>();

    return function (id: number | string) {
      if (!cache.has(id))
        cache.set(id, func.call(this, id));

      return cache.get(id);
    };
  }

  /**
   * 
   * @returns изначальный массив элементов
   */
  public getAll(): Item[] {
    return this.sourceItems;
  }

  /**
   * 
   * @param id id элемента
   * @returns объект элемента
   */
  public getItem(id: string | number): Item | undefined {
    return this.sourceItems.find(item => item.id === id);
  }

  /**
  * 
  * @param id id элемента
  * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
  */
  public getChildren(id: string | number): Item[] {
    return this.sourceItems.filter(item => item.parent === id);
  }

  /**
   * 
   * @param id id элемента
   * @returns массив всех дочерних элементов, включая вложенные
   */
  public getAllChildren(id: string | number): Item[] {
    const children: Item[] = [];
    const queue: Item[] = this.getChildren(id);

    while (queue.length > 0) {
      const current = queue.shift()!;
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
  public getAllParents(id: string | number): Item[] {
    const item = this.getItem(id);
    if (!item) return [];

    const parents: Item[] = [];
    let current: Item | undefined = item;

    while (current) {
      current = this.getItem(current.parent);

      if (current)
        parents.push(current);
    }

    return parents;
  }
}

const items: Item[] = [
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