import FirebaseAdmin from "../firebase_admin";
import { InAuthUser } from "../in_auth_user";

const MEMBER_COL = 'members';
const SCR_NAME_COL = 'screen_names';

type AddResult = { result: true; id: string } | { result: false; message: string };

async function add({ uid, email, displayName, photoURL }: InAuthUser): Promise<AddResult> {
    try {
        const screenName = (email as string).replace('@gmail.com', '');
        const addResult = await FirebaseAdmin.getInstance()
            .Firestore.runTransaction(async (transaction) => {
                const memberRef = FirebaseAdmin.getInstance()
                    .Firestore.collection(MEMBER_COL).doc(uid);
                const screenNameRef = FirebaseAdmin.getInstance()
                    .Firestore.collection(SCR_NAME_COL).doc(screenName);
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
            return { result: true, id: uid };
        }
        return { result: true, id: uid };
    } catch (err) {
        // catch 구문에 걸리면 500 에러 반환
        console.error(err);
        return { result: false, message: '서버 에러' };
    }
}

async function findByScreenName(screenName: string): Promise<InAuthUser | null> {
    const memberRef = FirebaseAdmin.getInstance().Firestore.collection(SCR_NAME_COL).doc(screenName);

    const memberDoc = await memberRef.get();
    if (memberDoc.exists === false) {
        return null;
    }
    const data = memberDoc.data() as InAuthUser;
    return data;
}

const MemberModel = {
    add,
    findByScreenName
}

export default MemberModel;