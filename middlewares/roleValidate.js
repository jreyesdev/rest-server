class RoleValidate{
    isAdmin(req, res, next){
        if(!req.usuario){
            return res.status(500).json({
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
    sameRole(...roles){
        return (req, res, next) => {
            if(!roles.includes(req.usuario.role)){
                return res.status(401).json({
                    msg: `Acción no permitida, se requiere alguno de los roles ${roles.join(', ')}`
                })
            }
            next()
        }
    }
}

module.exports = new RoleValidate()