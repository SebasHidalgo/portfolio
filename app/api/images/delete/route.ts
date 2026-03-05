import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
    try {
        const { path } = await req.json();

        if (!path) {
            return NextResponse.json({ error: "Missing path" }, { status: 400 });
        }

        const { error } = await supabaseServer.storage
            .from("projects")
            .remove([path]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
