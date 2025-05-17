import jwt from "jsonwebtoken";



const isAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"User not authenticated"
            })
        }
        // if auth
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        // req.user = decoded this will provide all data from payload
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuth;