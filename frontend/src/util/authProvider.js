import { createAuthProvider } from 'react-token-auth';
import { decodeToken } from "react-jwt";

export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'accessToken',
        onUpdateToken: (token) => fetch('/api/update-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        })
            .then(async(r) => {
                var body = await r.json()
                return body.token
            })
    });


export var Role = (function () {
    var _role = '';

    if(localStorage.getItem("REACT_TOKEN_AUTH_KEY")){
        var tokens = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
        console.log(tokens.accessToken)
        _role = decodeToken(tokens.accessToken).role;
        console.log(_role);
    }

    return {
        setRole: function (role) {
            _role = role;
        },
        getRole: function () {
            return _role;
        }
    };
})();