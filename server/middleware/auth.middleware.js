const tokenService = require('../services/token.service')
module.exports = (req, res, next) => {

    if(req.method === 'OPTIONS ') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token){
            console.log('ne token')
            return res.status(401).json({message: 'Unauthorized'})
        }
        const data = tokenService.validateAccess(token)
        if(!data){
            console.log('ne data')
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user = data
        next()
    } catch (error){
        console.log(error)
        return res.status(401).json({message: 'Unauthorized'})
    }
}