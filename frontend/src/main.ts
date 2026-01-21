import { io } from "socket.io-client";

const CHANNEL = "message";

function connectWs(ip: string) {
    const socket = io(`http://${ip}:3000`);
    socket.on("connect", () => console.log('Connecté au serveur WebSocket'));
    socket.on(CHANNEL, (msg) => displayMessage(msg));
}

function displayWhoami(serverIp: string) {
    const div = document.getElementById('whoami')!;
    div.textContent = serverIp;
}

function displayMessage(message: string) {
    const div = document.getElementById('message')!;
    div.textContent = message;
}

window.addEventListener('load', async () => {
    const call = await fetch('http://localhost:3000/api/whoami');
    const json = await call.json();
    
    // Comme json.ip est une liste (ex: ["192.168.1.1", "10.0.0.1"])
    // on prend la première adresse pour l'affichage et la connexion
    const firstIp = json.ip[0]; 
    
    displayWhoami(json.ip.join(', ')); // Affiche toutes les IP dans le span
    connectWs(firstIp); // Connecte le WebSocket à la première IP valide
});