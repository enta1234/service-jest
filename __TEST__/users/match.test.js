const userFunc = require('../../src/users/user.func')
jest.mock('../../src/users/user.func')

test('Common Matchers Primitive', () => {
  const result = 1 + 1
  expect(1 + 1).toBe(result)
})

test('Common Matchers Complex', () => {
  const data = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})
