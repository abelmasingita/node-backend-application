import { users } from './Data/users.js'
import products from './Data/products.js'
import { User } from './models/userModel.js'
import { Product } from './models/productModel.js'


export const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()

    const savedUsers = await User.insertMany(users)

    const adminUser = savedUsers[0]._id
    const productImport = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      }
    })

    await Product.insertMany(productImport)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
}

export const deleteData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()

    console.log('Data Deleted!')
    process.exit()
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
}
