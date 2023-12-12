import { Op } from "sequelize";

const User = require('../model/User');

// 批量查找用户
export const getBatchUser = async (ids: Array<string>) => {
    const findResult = await User.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
    });
    return findResult;
}