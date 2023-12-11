import { loginTimeoutRes } from "../utils/respone";

const cookieParser = require('cookie-parser');

const judgeCookie = (req, res, next) => {
    if (req.path.includes(['/login']) || req.signedCookies.login) {
        return next();
    } else {
        return res.send(loginTimeoutRes())
    }
}
module.exports = [cookieParser('secret'), judgeCookie]