import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account, 
    }: {
      user: {
        email: string;
        name: string;
      };
      account: {
        provider: "google" | "github";
      };
    }) {
      // Only insert if user doesn't exist
      try {
        const existingMerchant = await prisma.merchant.findUnique({
          where: { email: user.email },
        });

        if (!existingMerchant) {
          await prisma.merchant.create({
            data: {
              email: user.email,
              name: user.name,
              auth_type: account.provider === "google" ? "Google" : "Github",
            },
          });
          console.log("🆕 New merchant inserted:", user.email);
        } else {
          console.log("✅ Merchant already exists:", user.email);
        }

        return true; // allow sign-in
      } catch (err) {
        console.error("❌ Error inserting merchant:", err);
        return false; // reject sign-in if something goes wrong
      }
    },
  },
};
