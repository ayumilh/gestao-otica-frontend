import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions = {
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

          if (!response.ok) {
            console.error("Erro ao autenticar:", response.status);
            return null;
          }
      
          const user = await response.json()

          if (user && user.id) return user; // Retorna o usuário se tudo estiver certo
          return null; // Retorna null se não houver usuário ou erro na autenticação
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