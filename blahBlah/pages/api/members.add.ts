// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import CustomServerError from "@/controllers/error/custom_server_error";
import handleError from "@/controllers/error/handle_error";
import MemberCtrl from "@/controllers/member.ctrl";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const supportMethod = ['POST'];
    try {
        if (supportMethod.indexOf(method!) === -1) {
            // 에러 반환
            throw new CustomServerError({ statusCode: 400, message: '지원하지 않는 method' })
        }
        await MemberCtrl.add(req, res);
    } catch (err) {
        console.error(err);
        // 에러 처리
        handleError(err, res);
    }
}
