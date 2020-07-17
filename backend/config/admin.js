module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.type === 'admin' || req.user.type === 'superAdmin') {
            middleware(req, res, next)
        } else {
            res.status(401).send("You don't have the authorization required to complete this action")
        }
    }
}