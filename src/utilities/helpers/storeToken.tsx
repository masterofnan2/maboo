type User = 'Customer' | 'Admin' | 'Seller' | 'Professional';

const storeToken = (user: User, token: string) => {
    const tokenName = user + 'Token';
    localStorage.setItem(tokenName, token);
}

export default storeToken;