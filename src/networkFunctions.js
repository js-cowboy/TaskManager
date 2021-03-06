import {urlCardData, urlCardCreate, urlCardSettings, urlSignUp, urlLogin, urlUserInfo} from './Data';

async function serverRequest({url, json = true, method = 'GET', headers, body}) {    
    let response = await fetch(url, {
        method,
        headers,
        body
    }).catch(error => {
        throw new Error('Response Error!');
    });

    return json ? jsonRequest(response) : response
}

async function jsonRequest(responseServer) {
    let jsonObj = await responseServer.json().catch(error => {
        throw new Error('Json Error!');
    });   

    return jsonObj;
}

export function getSettings() {
    return serverRequest({url: urlCardSettings});
}

export function getDataCards() {
    return serverRequest({url: urlCardData});
}

export function cardCreate(body) {
    return serverRequest({
        url: urlCardCreate, 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
}

export function cardDelete(id) {
    return serverRequest({
        url: `${urlCardCreate}/${id}`,
        json: false,
        method: 'DELETE'
    }).then(({ok}) => {
        return ok;
    });
}

export async function login(body) {
    let response = await serverRequest({
        url: urlLogin,        
        method: 'POST',
        json: false,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });

    return response.ok ? await jsonRequest(response) : response
}

export function signUp(body) {
    return serverRequest({
        url: urlSignUp,        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
}

export function cardChange(id, body) {
    return serverRequest({
        url: `${urlCardCreate}/${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)                
    });
}

export function userInfo(body) {
    return serverRequest({
        url: urlUserInfo,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })
}