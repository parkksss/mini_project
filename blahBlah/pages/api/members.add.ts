// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import checkSupportMethod from "@/controllers/error/check_support_method";
import handleError from "@/controllers/error/handle_error";
import MemberCtrl from "@/controllers/member.ctrl";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const supportMethod = ['POST'];
    try {
        checkSupportMethod(supportMethod, method);
        await MemberCtrl.add(req, res);
    } catch (err) {
        console.error(err);
        // 에러 처리
        handleError(err, res);
    }
}
