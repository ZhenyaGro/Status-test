const tree = require('../index.js');
const expects = require('./expect.js');
const assert = require('assert');

it('Получить исходный массив', () => {
  assert.equal(JSON.stringify(tree.getAll()), JSON.stringify(expects.test1))
})

it('Получить элемент с id = 7', () => {
  assert.equal(JSON.stringify(tree.getItem(7)), JSON.stringify(expects.test2))
})

it('Получить массив дочерних элементов родительского с id = 4', () => {
  assert.equal(JSON.stringify(tree.getChildren(4)), JSON.stringify(expects.test3))
})

it('Получить массив дочерних элементов родительского с id = 5', () => {
  assert.equal(JSON.stringify(tree.getChildren(5)), JSON.stringify(expects.test4))
})

it('Получить массив дочерних элементов родительского с id = 2', () => {
  assert.equal(JSON.stringify(tree.getChildren(2)), JSON.stringify(expects.test5))
})

it('Получить массив всех дочерних элементов, включая вложенные, родительского с id = 2', () => {
  assert.equal(JSON.stringify(tree.getAllChildren(2)), JSON.stringify(expects.test6))
})

it('Получить массив родительских элементов дочернего с id = 7', () => {
  assert.equal(JSON.stringify(tree.getAllParents(7)), JSON.stringify(expects.test7))
})