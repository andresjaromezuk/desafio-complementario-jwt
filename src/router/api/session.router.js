import { Router } from 'express'
import {apiUserLogged} from '../../middleware/authorization.js'
import {appendJwtAsCookie, removeJwtFromCookies} from '../../middleware/authentication.js'
import passport from 'passport'

export const sessionRouter = Router()


sessionRouter.post('/login',
  passport.authenticate('login', {
    failWithError: true,
    session:false
  }),
  appendJwtAsCookie,
  function(req, res, next){
    res['successfullPost'](req.user)
  }
)

sessionRouter.get('/current', 
passport.authenticate('jwt',{
  failWithError: true,
  session:false
}),
apiUserLogged,
async (req, res, next) =>{
  res['successfullGet'](req.user)
})

sessionRouter.delete('/logout', 
  removeJwtFromCookies,
  (req, res) => {
    res['successfullLogout']()
  })