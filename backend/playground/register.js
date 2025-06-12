const bcryptjs = require('bcryptjs')
const password = 'secret123'

//promise approach
/*bcryptjs.genSalt()
   .then((salt) => {
    console.log('salt', salt, salt.length)
    bcryptjs.hash(password, salt)
      .then((encrypted) => {
        console.log('encrypted password', encrypted, encrypted.length)
      })
   })*/

   // async await approach
   async function createPassword() {
      try{
        const salt = await bcryptjs.genSalt()
        const encrypted = await bcryptjs.hash(password, salt)
        console.log(encrypted)
      } catch(err) {
          console.log(err)
      }

   }
   createPassword()