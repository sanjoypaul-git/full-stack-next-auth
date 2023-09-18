import {connect} from "@/dbConfig/config";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid token"
            }, {status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({
                error: e.message
            }, {status: 500});
        }
    }
}