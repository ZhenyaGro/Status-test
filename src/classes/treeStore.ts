import { Item, Wrap } from "../types/types";


module.exports = class TreeStore {
  private sourceItems: Item[];
  private tree = new Map<string | number, Wrap>(); // Создание карты для хранения и поиска элементов по id

  constructor(items: Item[]) {
    // Создание дубликата массива по правилам хорошего тона
    this.sourceItems = [...items];

    // Заполнение карты объектами типа Wrap
    this.sourceItems.forEach((item, i, items) => {
      this.tree.set(
        item.id,
        {
          source: item,
          childrenId: items.filter(potentialChild => potentialChild.parent === item.id)
            .map(child => child.id)
        }
      )
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
  private cacher(func: Function) {
    const cache = new Map<string | number, Item[]>();

    return function (id: number | string) {
      if (!cache.has(id))
        cache.set(id, func.call(this, id));

      return cache.get(id);
    };
  }

  /**
   * Метод получения изначального массива элементов
   * @returns копия массива элементов, на основании которого создан объект класса TreeStore
   */
  public getAll(): Item[] {
    return this.sourceItems;
  }

  /**
   * Метод получения объекта по id
   * @param id id элемента
   * @returns объект элемента
   */
  public getItem(id: string | number): Item | undefined {
    return this.tree.get(id)?.source;
  }

  /**
  * Метод получения списка дочерних элементов заданного элемента
  * @param id id элемента
  * @returns массив элементов, являющихся дочерними для этого элемента. Если нет дочерних, возвращает пустой массив
  */
  public getChildren(id: string | number): Item[] {
    const childrenId = this.tree.get(id).childrenId;
    return childrenId.map(id => this.getItem(id));
  }

  /**
   * Метод получения полного списка всех дочерних элементов заданного элемента, включая вложенные
   * @param id id элемента
   * @returns массив всех дочерних элементов
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
   * Метод получения списка родительских элементов по цепочке от заданного
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