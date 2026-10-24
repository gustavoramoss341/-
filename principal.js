if(sessionStorage.getItem("liberado") !== "sim") {
   location.replace("index.html");
} else {

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

        if(diferenca<=0) {
            elementoDias.textContent = "00";
            elementoHoras.textContent = "00";
            elementoMinutos.textContent = "00";
            elementoSegundos.textContent = "00";

            clearInterval(intervalo);
            return
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
        // Atualiza a posição da luz no fundo da tela
        document.documentElement.style.setProperty(
            "--cursor-x",
            `${x}px`
        );

        document.documentElement.style.setProperty(
            "--cursor-y",
            `${y}px`
        );

        // Calcula a iluminação de cada região
        elementos.forEach((elemento) => {
            const caixa = elemento.getBoundingClientRect();

            // Ponto da caixa mais próximo do cursor
            const pontoX = Math.max(
                caixa.left,
                Math.min(x, caixa.right)
            );

            const pontoY = Math.max(
                caixa.top,
                Math.min(y, caixa.bottom)
            );

            const distancia = Math.hypot(
                x - pontoX,
                y - pontoY
            );

            // Intensidade cai gradualmente com a distância
            let intensidade = Math.max(
                0,
                1 - distancia / alcance
            );

            // Suaviza a transição da luz
            intensidade =
                intensidade * intensidade * (3 - 2 * intensidade);

            elemento.style.setProperty(
                "--luz",
                intensidade.toFixed(3)
            );

            // O painel pode receber interação quando está iluminado
            if (elemento === painel) {
                painel.classList.toggle(
                    "revelado",
                    intensidade > 0.08
                );
            }
        });
    }

    // Mouse e caneta
    document.addEventListener("pointermove", (evento) => {
        if (evento.pointerType === "touch") {
            return;
        }

        iluminar(evento.clientX, evento.clientY);
    });

    // Primeiro toque: posiciona a lanterna
    document.addEventListener("touchstart", (evento) => {
        const toque = evento.touches[0];

        iluminar(toque.clientX, toque.clientY);
    }, { passive: true });

    // A lanterna acompanha o dedo durante o movimento
    document.addEventListener("touchmove", (evento) => {
        const toque = evento.touches[0];

        iluminar(toque.clientX, toque.clientY);
    }, { passive: true });

}