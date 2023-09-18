import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}