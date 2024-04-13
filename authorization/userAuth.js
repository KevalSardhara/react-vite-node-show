import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// why make the public and private key methods for here
// vary strong user authontication method so used her path and fs module in Authontication
// private.key -> generate token therough this private.key
// public.key -> read and varified the user token through public.key

export const authorization = ((req, res, next) => {
    try {
        const token = req.get("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECREAT_KEY); // secret key is must defined her to work properly 
        console.log(decoded); // decoded give me a object here // { email: 'c@gmail.com', iat: 1712746365 }

        // decoded value like this here as a object pass here
        // decoded = { email: 'c@gmail.com', iat: 1712746365 };

        if (decoded) {
             next();
            // return res.status(200).json({
            //     success: true,
            //     data: decoded,
            // });
        } else {
            return res.status(404).json({
                success: false,
                data: "Invalid",
            });
        }
    } catch (error) {
        return res.status(404).json({
            success: false,
            data: error.message,
        });
    }
});