import jwt from 'jsonwebtoken';
import apiError  from '../utils/ApiError.js'; // Adjust path as needed
import DB from '../models/db.js';

const userAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
        throw new apiError(401, 'No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded)
    const userResult = await DB.query("select * from users where user_id = $1", [decoded.id]);
    const user = userResult?.rows?.[0];
    if (!user) {
        throw new apiError(401, 'User not found');
    }
    // Remove password field if it exists
    if (user.password) {
        delete user.password;
    }
    console.log(user)
    req.user = user;
    next();
};

export { userAuth };
