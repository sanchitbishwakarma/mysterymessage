import NextAuth from "next-auth";
import { AuthOptions } from "./options";

const handle = NextAuth(AuthOptions)

export { handle as GET, handle as POST }