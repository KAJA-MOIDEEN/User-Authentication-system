const userAuth = (req,res,next)=>{
    try {
        const token = req.cookie()
    } catch (error) {
        
    }
}


module.exports = {userAuth}