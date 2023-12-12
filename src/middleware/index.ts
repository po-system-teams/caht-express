import { loginTimeoutRes } from "../utils/respone";

const cookieParser = require('cookie-parser');

const judgeCookie = (req, res, next) => {
    // 允许get方法和login不带cookie
    if (req.method === 'GET' || req.path.includes(['/login']) || req.signedCookies.login) {
        return next();
    } else {
        return res.send(loginTimeoutRes())
    }
}
module.exports = [cookieParser('secret'), judgeCookie]