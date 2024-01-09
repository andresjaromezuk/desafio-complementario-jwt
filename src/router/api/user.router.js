import { Router } from 'express'
import { dbUser } from '../../dao/models/mongoose/user.mongoose.js'
import {appendJwtAsCookie} from '../../middleware/authentication.js'
import {apiUserLogged, apiAdminAccess} from '../../middleware/authorization.js'
import passport from 'passport'

export const userRouter = Router()

userRouter.post('/register',
  passport.authenticate('register', {
    failWithError: true,
    session:false
  }),
  appendJwtAsCookie,
  function (req, res, next) {
    res['successfullPost'](req.user)
  }
)

userRouter.get('/profile', 
  passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
  apiUserLogged,
  async (req, res, next)=> {
    res['successfullGet'](req.user)
  }
)

userRouter.get('/',
  passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
  apiAdminAccess,
  async(req, res, next)=>{
    const users = await dbUser.find({}, { password: 0 }).lean()
    res['successfullGet'](req.user)
  })

userRouter.put('/resetPassword', async (req, res) =>{
    try {
        await dbUser.resetPassword(req.body)
        res['successfullPut']("Nueva contraseña registrada")
    } catch (error) {
        next(error)
    }
})

