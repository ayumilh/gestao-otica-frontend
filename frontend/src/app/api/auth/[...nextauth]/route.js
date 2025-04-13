import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "senha", type: "password" }
      },

      async authorize(credentials, req){
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userauth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include', // 👈 isso garante que cookies e headers sejam mantidos
            body: JSON.stringify({
              email: credentials.email,
              senha: credentials.password
            })
          });
      
          const user = await response.json()

          console.log('RESPOSTA DA API:', user);
      
          if (user && user.id) {
            console.log('Usuário autenticado:', user);
            return user; // ✅ NextAuth cria a sessão com base nesse objeto
          } else {
            console.warn('Credenciais inválidas ou user.id ausente:', user);
            return null;
          }
        } catch (error) {
          console.error('Erro no authorize:', error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async session({ session, token }) {
      // Adiciona o ID do usuário na sessão
      if (token) {
        session.user.id = token.id;
        session.user.nome = token.nome; // opcional
        session.user.email = token.email;
        session.user.token = token.token; // se quiser usar no client depois
      }
  
      return session;
    },
    async jwt({ token, user }) {
      // Quando o usuário loga, "user" está disponível
      if (user) {
        token.id = user.id;
        token.nome = user.nome;
        token.email = user.email;
        token.token = user.token; // token JWT do backend, se quiser usar
      }
  
      return token;
    }
  }
  
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }