const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
//check autherised user or not
console.log("inside jwtMiddleware");

const token = req.headers["authorization"].split(" ")[1]
console.log(token);
if (token) {
    // verify the token
    try {
        const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
        console.log(jwtResponse);
        req.userId = jwtResponse.userId  
        next()
    } catch (err) {
        res.status(401).json("Auth failed.. Please login")
    }
} else {
    res.status(404).json("Authorisation Failed.. Token is Missing")
}

}

module.exports = jwtMiddleware