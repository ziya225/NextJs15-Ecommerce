import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/databaseConnection";

export async function GET(request) {
    await connectDB();
    return NextResponse.json({
        success : true,
        message: "Database connected successfully"
    });
}