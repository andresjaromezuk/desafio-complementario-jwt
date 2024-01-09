export function errorHandler(error, req, res, next){
    if (error.message.includes('está registrado')){
        res.status(409)
    } else if (error.message.includes('incorrectas') || error.message.includes('sesión')){
        res.status(401)
    }else if(error.message.includes('no encontrado')){
        res.status(404)
    } else if(error.message.includes('recurso')){
        res.status(403)
    }
    console.log(error)

    res.json({
        status: 'error',
        message: error.message,
      })
}

