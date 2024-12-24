import { NextRequest } from "next/server";
import { decrypt } from '../../../../../../auth';

export const GET = async (req: NextRequest) => {
    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }

    const { searchParams } = new URL(req.url!);
    let userInviteString = searchParams.get("userInviteString");

    try {
        if (!userInviteString) {
            return new Response('User invite string is required', { status: 400 });
        }

        const { email, role } = await decrypt(userInviteString);
        console.log(email, role);
        return new Response(JSON.stringify({ email, role }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ "message": 'Internal server error' }), { status: 500 });
    }
}