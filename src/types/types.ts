/**
 * Тип возможных объектов
 */
export type Item = {
  id: string | number;
  parent: string | number;
  type?: string | null;
};

/**
 * Тип-обертка для хранения списка дочерних элементов childrenId элемента родителя source
 */
export type Wrap = {
  source: Item;
  childrenId: (string | number)[];
}