import Joi from "joi";
import { COMMON_STATUS, LANGUAGE, STATUS_MSG } from "../config/AppConstraints.js";

export const authorizationHeader = Joi.object({
    authorization: Joi.string().required(),
    'accept-language': Joi.string().required().valid(LANGUAGE.EN),
}).unknown();

export const verifyToken = async token => {
    try {
        console.log(token, "========verifyToken========");
        if (token.data._id && token.data.loginTime && token.data.userType) {
            let data = await DAO.getDataOne(
                User,
                { _id: token.data._id, userType: token.data.userType },
                { password: 0 },
                { lean: true },
            );
            if (!data) return STATUS_MSG.ERROR.INVALID_TOKEN;
      

        } else return STATUS_MSG.ERROR.INVALID_TOKEN;
    } catch (err) {
        console.log(err, '=======');
    }
};