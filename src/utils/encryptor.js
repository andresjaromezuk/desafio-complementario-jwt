import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {JWT_PRIVATE_KEY} from '../config/auth.config.js'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

export function encrypt(data){
    return new Promise ((resolve, reject) =>{
        if(!data){
            return reject(new Error('Debes agregar algo para codificar'))
        }
        delete data.password
        jwt.sign(data, JWT_PRIVATE_KEY, { expiresIn: '24h' }, (err, result) =>{
            if(err){
                return reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export function decrypt(token){
    return new Promise((resolve, reject)=>{
        if(!token){
            return reject(new Error('Debes enviar un token'))
        }
        jwt.verify(token, JWT_PRIVATE_KEY, (err, result) =>{
            if(err){
                return reject(err)
            } else {
                resolve(result)
            }
        } )
    })
}