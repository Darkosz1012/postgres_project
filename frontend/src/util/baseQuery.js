import { authFetch } from './authProvider'

export const getData = async (url, alert) => {
    try{
        var res = await ( await authFetch(`${url}`)).json();
        if(res.success){
            //  alert.success(res.message);
            return res.res
        }else{
            alert.error(JSON.stringify(res.message));
             throw JSON.stringify(res.message);
        }
    }catch(err) {
        alert.error(JSON.stringify(err));
        // throw JSON.stringify(err);
    }
}

export const addItem = async (url, alert, data) => {
    try{
        var res = await ( await authFetch(`${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })).json();
        console.log(res)
        if(res.success){
            alert.success(res.message);
            return res.res
        }else{
            alert.error(JSON.stringify(res.message));
            throw JSON.stringify(res.message);
        }
    }catch(err) {
        alert.error(JSON.stringify(err));
        // throw JSON.stringify(err);
    }
};

export const updateItem = async (url, alert, data) => {
    try{
        var res = await ( await authFetch(`${url}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })).json();
        if(res.success){
            alert.success(res.message);
            return res.res
        }else{
            alert.error(JSON.stringify(res.message));
            throw JSON.stringify(res.message);
        }
    }catch(err) {
        alert.error(JSON.stringify(err));
        throw JSON.stringify(err);
    }
};

export const deleteItem = async (url, alert, id) => {
    try{
        var res = await ( await authFetch(`${url}`, {
            method: "DELETE"
        })).json();
        if(res.success){
            alert.success(res.message);
            return res.res
        }else{
            alert.error(JSON.stringify(res.message));
             throw JSON.stringify(res.message);
        }
    }catch(err) {
        alert.error(JSON.stringify(err));
        // throw JSON.stringify(err);
    }
};