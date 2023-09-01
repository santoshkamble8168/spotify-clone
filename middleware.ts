import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const supabase = createMiddlewareClient({
		req: request,
		res: response,
	});

	await supabase.auth.getSession();
	return response;
}
