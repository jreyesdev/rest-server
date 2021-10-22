const url = window.location.origin + "/api/auth/";
let usuario = null, socket = null;

const txtUid = document.getElementById('txtUid');
const txtMensaje = document.getElementById('txtMensaje');
const ulUsuarios = document.getElementById('ulUsuarios');
const ulMensajes = document.getElementById('ulMensajes');
const btnSalir = document.getElementById('btnSalir');

txtMensaje.addEventListener('keyup',(e)=>{
    const msj = txtMensaje.value.trim().replace(/\s+/g,' ');
    const uid = txtUid.value.trim().replace(/\s+/g,' ');
    if(e.keyCode != 13) return;
    if(!msj.length) return;
    socket.emit('enviar-mensaje',{ msj, uid });
    txtMensaje.value = '';
    txtUid.value = '';
});

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
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect',()=>{
        console.log('Online');
    });

    socket.on('disconnect',()=>{
        console.log('Offline');
    });

    socket.on('recibir-mensaje',listarMensajes);

    socket.on('usuarios-activos',listarUsuarios);

    socket.on('mensaje-privado',(pay)=>{
        console.log(pay);
    });
}

const listarUsuarios = (usuarios = []) => {
    let html = '';
    usuarios.forEach(({ name, uid })=>{
        html += `
            <li>
                <h5 class="text-success">${name}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </li>
        `;
    });
    ulUsuarios.innerHTML = html;
}

const listarMensajes = (msjs = []) => {
    let html = '';
    msjs.forEach(({ mensaje, nombre, uid })=>{
        html += `
            <li>
                <small class="text-info">${nombre};</small>
                <small class="fs-6">${mensaje}</small>
            </li>
        `;
    });
    ulMensajes.innerHTML = html;
}

const main = async () => {
    await validaJWT();
}

main();
