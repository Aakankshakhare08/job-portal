const bcryptjs = require('bcryptjs')
const password = 'secret123'
const encryptedPassword = ''

bcryptjsjs.compare(password, encryptedPassword)
   .then((message) => {
       console.log(message)
   })

/* manually doing comparision
const salt = bcryptjs.getSalt(encryptedPassword)
console.log(salt, salt.length)
bcryptjs.hash(password, salt)
   .then((hash) => {
      console.log(hash == encryptedPassword)
   }) */