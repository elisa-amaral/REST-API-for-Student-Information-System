const bcryptjs = require('bcryptjs')

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        first_name: 'Jack',
        email: 'ultrices.vivamus@icloud.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Jess',
        email: 'rutrum.non.hendrerit@icloud.csouk',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Kyra',
        email: 'dolor.donec@protonmail.couk',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
}
