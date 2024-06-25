// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import FirebaseAdmin from "@/models/firebase_admin";
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
    try {
        const screenName = (email as string).replace('@gmail.com', '');
        const addResult = await FirebaseAdmin.getInstance()
            .Firestore.runTransaction(async (transaction) => {
                const memberRef = FirebaseAdmin.getInstance()
                    .Firestore.collection('members').doc(uid);
                const screenNameRef = FirebaseAdmin.getInstance()
                    .Firestore.collection('screen_names').doc(screenName);
                // member 문서에 접근
                const memberDoc = await transaction.get(memberRef);
                if (memberDoc.exists) {
                    // 이미 추가된 상태
                    return false;
                }
                const addData = {
                    uid,
                    email,
                    displayName: displayName ?? '',
                    photoURL: photoURL ?? ''
                }
                await transaction.set(memberRef, addData);
                await transaction.set(screenNameRef, addData);
                return true;
            });
        if (addResult === false) {
            // 이미 있는 경우니까 요청을 받았다고만 전달
            return res.status(201).json({ result: true, id: uid });
        }
        return res.status(200).json({ result: true, id: uid });
    } catch (err) {
        // catch 구문에 걸리면 500 에러 반환
        console.error(err);
        res.status(500).json({ result: false });
    }
}
