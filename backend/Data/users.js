import bcrypt from 'bcryptjs'

export const users = [
  {
    name: 'Admin User',
    email: 'admin@user.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'abel hlongwani',
    email: 'abelmasingita9@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'masingita hlongwani',
    email: 'hlongwaniab@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
