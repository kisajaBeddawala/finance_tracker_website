import { login, logout, signup } from "@/controllers/authController";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    try{
        await connectDB();
        const body = await req.json();

        if (body.type === "signup"){
            return Response.json(await signup(body));
        }

        if (body.type === "login"){
            return Response.json(await login(body));
        }

        if (body.type === "logout"){
            return Response.json(await logout());
        }

        return Response.json(
            {
                status: 400,
                message: "Invalid request type"
            }
        , { status: 400 }
        );
    }catch(error){
        console.error("Auth error:", error);
        return Response.json(
            {
                status: 500,
                message: "Server error"
            }
        , { status: 500 }
        );
    }

}