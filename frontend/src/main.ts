window.addEventListener('load', async () => {
   // On appelle l'API (le backend)
   const call = await fetch('http://localhost:3000');
   
   // On récupère la réponse sous forme de texte
   const text = await call.text();
   
   // On injecte le texte dans la div qui a l'id "message"
   const div = document.getElementById("message")!;
   div.textContent = text;
});