import { login, signup } from "@/controllers/authController";

export async function POST(req) {
    const body = await req.json();

    if (body.type === "signup"){
        return Response.json(await signup(req));
    }

    if (body.type === "login"){
        return Response.json(await login(req));
    }

}