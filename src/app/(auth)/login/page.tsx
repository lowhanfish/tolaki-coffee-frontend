// app/login/page.tsx
'use client';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const handleSuccess = async (credentialResponse: any) => {
        // // credentialResponse.credential berisi ID Token dari Google
        // const res = await fetch('http://localhost:3000/auth/google', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ token: credentialResponse.credential }),
        // });

        // const data = await res.json();
        // // Simpan JWT access_token dari NestJS ke state / cookie / storage
        // console.log('Login sukses:', data);


        console.log(credentialResponse)
    };

    return (
        <main>
            <h1>Loginx</h1>
            <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Gagal')} />
        </main>
    );
}