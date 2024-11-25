import { CookieNames } from "@/constants/common";

// export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
  const cookie = request.headers.get(CookieNames.access_token) || null;
  if (cookie) {
    return Response.json({},{
      status: 200,
    });
  }
  return Response.json({},{
    status: 401,
  });
}