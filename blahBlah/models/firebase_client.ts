import { Auth, getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const FirebaseCredentials = {
    apiKey: publicRuntimeConfig.apiKey,
    authDomain: publicRuntimeConfig.authDomain,
    projectId: publicRuntimeConfig.projectId,
}
export default class FirebaseClient {
    private static instance: FirebaseClient;

    private auth: Auth;

    public constructor() {
        const apps = getApps();
        if (apps.length === 0) {
            console.info('firebase client init start');
            initializeApp(FirebaseCredentials);
        }
        // 할당해주기
        this.auth = getAuth();
        console.info('firebase auth');
    }

    public static getInstance(): FirebaseClient {
        if (FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
            // FirebaseClient 를 할당
            FirebaseClient.instance = new FirebaseClient();
        }
        // 반환  
        return FirebaseClient.instance;
    }

    public get Auth(): Auth {
        // private으로 auth를 선언해 놓음
        return this.auth;
    }
}