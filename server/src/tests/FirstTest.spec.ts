import { User } from '@entities/User'

test('it should be ok', () => {
  const user = new User()
  user.name = 'Victor'

  expect(user.name).toEqual('Victor')
})
