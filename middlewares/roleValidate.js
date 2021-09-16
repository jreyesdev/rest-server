class RoleValidate{
    isAdmin(req, res, next){
        if(!req.usuario){
            res.status(500).json({
                msg: 'Error al validar usuario sin token'
            })
        }
        const { role, name } = req.usuario
        if(role !== 'ADMIN' || role !== 'SUPER_ADMIN'){
            return res.status(401).json({
                msg: 'Acción no permitida'
            })
        }
        next()
    }
}

module.exports = new RoleValidate()