// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MemberModel from "@/models/member/member.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid, email, displayName, photoURL } = req.body;
    if (uid === undefined || uid === null) {
        // 에러 발생 : 에러를 만들어서 bad request 를 보내기
        return res.status(400).json({ result: false, message: 'uid가 누락되었습니다.' });
    }
    if (email === undefined || email === null) {
        return res.status(400).json({ result: false, message: 'email가 누락되었습니다.' });
    }
    const addResult = await MemberModel.add({ uid, email, displayName, photoURL });
    if (addResult.result === true) {
        return res.status(200).json(addResult);
    }
    return res.status(500).json(addResult);
}
