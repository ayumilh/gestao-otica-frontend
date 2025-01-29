import Cookies from 'js-cookie';

export const searchUserId = () => {
    try {
        const tokenId = Cookies.get("userId") ? JSON.parse(Cookies.get("userId")) : null;
        return tokenId ? tokenId.token : null;
    } catch (error) {
        console.error("Erro ao buscar o token do usuário:", error);
        return null;
    }
};