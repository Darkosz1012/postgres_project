import { createAuthProvider } from 'react-token-auth';


export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'accessToken',
        onUpdateToken: (token) => fetch('/api/update-token', {
            method: 'POST',
            body: token.refreshToken
        })
            .then(r => r.json().token)
    });


export var Role = (function () {
    var _role = '';

    return {
        setRole: function (role) {
            _role = role;
        },
        getRole: function () {
            return _role;
        }
    };
})();