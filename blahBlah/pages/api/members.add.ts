// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MemberCtrl from "@/controllers/member.ctrl";
import MemberModel from "@/models/member/member.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const supportMethod = ['POST'];
    try {
        if (supportMethod.indexOf(method!) === -1) {
            // 에러 반환
        }
        await MemberCtrl.add(req, res);
    } catch (err) {
        console.error(err);
        // 에러 처리
    }
}
