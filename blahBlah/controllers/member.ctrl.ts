import MemberModel from "@/models/member/member.model";
import { NextApiRequest, NextApiResponse } from "next";
import BadReqError from "./error/bad_request_error";

async function add(req: NextApiRequest, res: NextApiResponse) {
    const { uid, email, displayName, photoURL } = req.body;
    if (uid === undefined || uid === null) {
        // 에러 발생 : 에러를 만들어서 bad request 를 보내기
        throw new BadReqError('uid가 누락되었습니다.');
    }
    if (email === undefined || email === null) {
        throw new BadReqError('email가 누락되었습니다.')
    }
    const addResult = await MemberModel.add({ uid, email, displayName, photoURL });
    if (addResult.result === true) {
        return res.status(200).json(addResult);
    }
    res.status(500).json(addResult);
}

async function findByScreenName(req: NextApiRequest, res: NextApiResponse) {
    const { screenName } = req.query;
    if (screenName === undefined || screenName === null) {
        throw new BadReqError('screenName이 누락되었습니다.');
    }
    const extractScreenName = Array.isArray(screenName) ? screenName[0] : screenName;
    const findResult = await MemberModel.findByScreenName(extractScreenName);
    if (findResult === null) {
        return res.status(404).end();
    }
    res.status(200).json(findResult);
}

const MemberCtrl = {
    add,
    findByScreenName,
};

export default MemberCtrl;