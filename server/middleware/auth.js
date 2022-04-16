import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
         
        let decodedToken;

        if (token && isCustomAuth) {
            const decode = jwt.verify(token, "secret");
            decodedToken = decode?.id;
            
        } else {
            const decode = jwt.decode(token);
            decodedToken = decode?.sub;
            
        }

        req.userId = decodedToken;

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;