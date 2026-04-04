import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    // This callback is called whenever a session is checked
    // We use it to attach the MongoDB user _id to the session object so our backend can use it
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // user.id comes from the MongoDB adapter
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };