import bcrypt from "bcryptjs"

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password , 10)
    } catch (error) {
        console.log(error)
    }
}

const verifyPassword = (password , hashedPassword) =>{
  try {
    return bcrypt.compare(password , hashedPassword)
  } catch (error) {
     console.log(error)
  }
}

export {
    hashPassword,
    verifyPassword
}