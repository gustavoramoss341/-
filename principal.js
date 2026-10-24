
if (sessionStorage.getItem("liberado") !== "sim") {
    location.replace("index.html");
} else {

    // Notifica a Cloudflare quando a página principal é aberta
    fetch("https://wispy-sound-9e7b.josegustavoramossilva3.workers.dev/visita", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pagina: "principal"
        })
    }).catch(erro => {
        console.error("Não foi possível registrar a visita:", erro);
    });

    const encontro = new Date("2026-10-29T19:00:00-03:00").getTime();

    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const dia = hora * 24;

    const elementoDias = document.getElementById("dias");
    const elementoHoras = document.getElementById("horas");
    const elementoMinutos = document.getElementById("minutos");
    const elementoSegundos = document.getElementById("segundos");

    function atualizarcontagem() {
        const agora = Date.now();
        const diferenca = encontro - agora;

        if (diferenca <= 0) {
            elementoDias.textContent = "00";
            elementoHoras.textContent = "00";
            elementoMinutos.textContent = "00";
            elementoSegundos.textContent = "00";

            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferenca / dia);
        const horas = Math.floor((diferenca % dia) / hora);
        const minutos = Math.floor((diferenca % hora) / minuto);
        const segundos = Math.floor((diferenca % minuto) / segundo);

        elementoDias.textContent = String(dias).padStart(2, "0");
        elementoHoras.textContent = String(horas).padStart(2, "0");
        elementoMinutos.textContent = String(minutos).padStart(2, "0");
        elementoSegundos.textContent = String(segundos).padStart(2, "0");
    }

    let intervalo;
    atualizarcontagem();
    intervalo = setInterval(atualizarcontagem, 1000);

    // Sistema de lanterna para a página inteira
    const elementos = document.querySelectorAll(".revelavel");
    const painel = document.querySelector(".painel-terminal");

    const alcance = 260;

    function iluminar(x, y) {
        document.documentElement.style.setProperty("--cursor-x", `${x}px`);
        document.documentElement.style.setProperty("--cursor-y", `${y}px`);

        elementos.forEach((elemento) => {
            const caixa = elemento.getBoundingClientRect();

            const pontoX = Math.max(caixa.left, Math.min(x, caixa.right));
            const pontoY = Math.max(caixa.top, Math.min(y, caixa.bottom));

            const distancia = Math.hypot(x - pontoX, y - pontoY);

            let intensidade = Math.max(0, 1 - distancia / alcance);
            intensidade = intensidade * intensidade * (3 - 2 * intensidade);

            elemento.style.setProperty("--luz", intensidade.toFixed(3));

            if (elemento === painel) {
                painel.classList.toggle("revelado", intensidade > 0.08);
            }
        });
    }

    document.addEventListener("pointermove", (evento) => {
        if (evento.pointerType === "touch") return;
        iluminar(evento.clientX, evento.clientY);
    });

    document.addEventListener("touchstart", (evento) => {
        const toque = evento.touches[0];
        iluminar(toque.clientX, toque.clientY);
    }, { passive: true });

    document.addEventListener("touchmove", (evento) => {
        const toque = evento.touches[0];
        iluminar(toque.clientX, toque.clientY);
    }, { passive: true });
}
