export function webUserLogged(error, req, res, next){
    if (!req.isAuthenticated()){
        return res.redirect('/sessions/login')
    }
    next()
}

export function apiUserLogged(req, res, next){
    if (!req.isAuthenticated()){
        throw new Error ('Debes iniciar sesión')
    }
    next()
}

export function apiAdminAccess(req, res, next){
    if(req.user.role !== 'admin'){
        return next(new Error('No tienes permiso para acceder a este recurso'))
    }
    next()
}