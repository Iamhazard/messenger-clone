import { authOptions } from "@/app/lib/authOptions";
import NextAuth from "next-auth";



const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };