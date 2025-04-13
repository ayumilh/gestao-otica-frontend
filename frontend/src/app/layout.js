'use client'
import "./globals.css";
import { Poppins } from "next/font/google"
import { AuthContextProvider } from "../contexts/AuthContext";
import NextAuthSessionProvider from "../providers/sessionProvider";
import ModalVerificationLogout from "@/components/Config/ModalVerificationLogout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeProvider as ThemeMuiProvider } from "@/contexts/ThemeMuiContext";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const metadata = {
  title: "Realeza",
  description: "Sistema de gerenciamento de vendas e estoque",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>{metadata.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={`${poppins.className} max-w-full h-screen`}>
        <NextAuthSessionProvider>
          <AuthContextProvider>
            <ThemeProvider>
              <ThemeMuiProvider>
                {children}
                <ModalVerificationLogout />
              </ThemeMuiProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}