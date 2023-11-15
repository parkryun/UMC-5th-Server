import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

import { joinUser } from "../services/user.service.js"

export const userSignin = async (req, res, next) => {
    console.log('회원가입을 요청하였습니다.')
    console.log("body:", req.body) // 값 확인

    res.send(response(status.SUCCESS, await joinUser(req.body)))
}