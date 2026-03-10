import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(AuthOptions);
    const user: User = session?.user as User;

    if (!session || !session?.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated",
            },
            { status: 401 },
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        // TODO: find the what it returns
        const userMessages = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } },
        ]).exec();

        if (!userMessages || userMessages.length === 0) {
            return Response.json(
                {
                    success: true,
                    messages: [],
                },
                { status: 200 },
            );
        }

        return Response.json(
            {
                success: true,
                messages: userMessages[0].messages,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log("Unexpected error", error);
        return Response.json(
            {
                success: false,
                message: "Unexpected error",
            },
            { status: 500 },
        );
    }
}
