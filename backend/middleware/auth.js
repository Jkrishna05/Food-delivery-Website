import jwt from 'jsonwebtoken';

let auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    let token = authHeader.split(' ')[1];
    try {
        let decode= jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decode.id;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}
export default auth;