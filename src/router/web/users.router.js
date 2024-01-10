import { Router } from 'express'
import { dbUser } from '../../dao/models/mongoose/user.mongoose.js'
import { apiUserLogged, webUserLogged } from '../../middleware/authorization.js'
import passport from 'passport'

export const userRouter = Router()

userRouter.get('/register', async (req,res)=>{
    try {
        return res.render("register")
    } catch (error) {
        res.status(500).json({status: "Error", error: error.message})
    }
})

//userRouter.post('/register',
//  passport.authenticate('register', {
//    successRedirect: '/users/profile',
//    failureRedirect: '/users/register',
//  })
//)

userRouter.get('/profile', 
passport.authenticate('jwt',{
    failWithError: true,
    session:false
  }),
  webUserLogged, 
 (req, res) =>{
    return res.render('profile')
})

userRouter.get('/resetPassword', async (req, res) =>{
    try {
        return res.render('resetPassword')
    } catch (error) {
        console.log(error.message)
        return res.redirect('/sessions/login')
    }
})

userRouter.post('/resetPassword', async (req, res) =>{
    try {
        await dbUser.resetPassword(req.body)
        console.log("funcionó")
        return res.redirect('/sessions/login')
    } catch (error) {
        console.log(error.message)
        return res.redirect('/sessions/login')
    }
})

