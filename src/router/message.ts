import express from 'express';
import { rejectRes, resolveRes } from '../utils/respone';
const router = express.Router();

router.post('/', (req, res) => {
    // db.query("SELECT * FROM user", (err, result) => {
    //     if (err) {
    //         res.send(rejectRes(err));
    //     } else {
    //         res.send(resolveRes(result));
    //     }
    // });
});

module.exports = router;