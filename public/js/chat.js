const url = window.location.origin + "/api/auth/";
let usuario = null;

const validaJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if(token.length < 10){
        window.location = 'index.html';
        throw new Error('No hay token');
    }
    try {
        const resp = await fetch(url,{ headers: { 'x-token': token } });
        const { user, token: tok } = await resp.json();
        localStorage.setItem('token',tok);
        usuario = user;
        document.title = 'Socket Chat - ' + user.name;
        await conectarSocket();
    }catch(err){
        console.log(err);
    }
}

const conectarSocket = async () => {
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });
}

const main = async () => {
    await validaJWT();
}

main();
