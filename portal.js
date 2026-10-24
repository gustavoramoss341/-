
console.log("Portal carregado");

// Notifica a Cloudflare quando o portal é aberto
fetch("https://wispy-sound-9e7b.josegustavoramossilva3.workers.dev/visita", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        pagina: "portal"
    })
}).catch(erro => {
    console.error("Não foi possível registrar a visita:", erro);
});

const form = document.getElementById("form-chave");
const campo = document.getElementById("chave");
const mensagem = document.getElementById("mensagem");

const SENHA = "02480466e274d95b5e60b1ffcda9cbfb434bea167f831b3b7e48c25a6aee42ef";

console.log(form, campo, mensagem);

let qtd = -1;

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensagem.textContent = "";

    const tentativa = campo.value.trim().toLowerCase();

    if (tentativa === SENHA) {
        sessionStorage.setItem("liberado", "sim");
        location.href = "principal.html";
    } else {
        qtd += 1;

        const listaFrases = [
            "Garota, tô te esperando.",
            "Se ajuda, são 64 caracteres.",
            "Use o que eu já te dei.",
            "Confio bastante que você consegue."
        ];

        mensagem.textContent = listaFrases[qtd % listaFrases.length];
        campo.select();
    }
});
