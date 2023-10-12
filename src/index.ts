// Тип для возможных объектов
type Item = {
  id: string | number;
  parent: string | number;
  type?: string | null;
};

class TreeStore {
  private items: Item[];

  constructor(items: Item[]) {
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
  public getAll(): Item[] {
    return this.items;
  }

  /**
   * 
   * @param id id элемента
   * @returns объект элемента
   */
  public getItem(id: string | number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  /**
  * 
  * @param id id элемента
  * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
  */
  public getChildren(id: string | number): Item[] {
    return this.items.filter((item) => item.parent === id);
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
  getAllParents(id: string | number): Item[] {
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

module.exports = ts;
