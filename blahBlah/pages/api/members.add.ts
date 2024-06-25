// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import FirebaseAdmin from "@/models/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid, email, displayName, photoURL } = req.body;
    if (uid === undefined || uid === null) {
        // 에러 발생 : 에러를 만들어서 bad request 를 보내기
        return res.status(400).json({ result: false, message: 'uid가 누락되었습니다.' });
    }
    try {
        const addResult = await FirebaseAdmin.getInstance()
            .Firestore.collection('members').doc(uid)
            .set({
                uid,
                email: email ?? '',
                displayName: displayName ?? '',
                photoURL: photoURL ?? ''
            });
        return res.status(200).json({ result: true, id: addResult });
    } catch (err) {
        // catch 구문에 걸리면 500 에러 반환
        console.error(err);
        res.status(500).json({ result: false });
    }
}
