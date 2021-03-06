window.onload = function () {      // so funciona depois do carregamento da janela

    var stage = document.getElementById('stage');     // declaração do palco
    var ctx = stage.getContext("2d");                 // aqui onde fica toda a parte visual
    document.addEventListener("keydown", keyPush);    // teclas de movimentação serem ativadas 

    setInterval(game, 180);     // define um intervelo para a função ser chamada várias vezes (function "game" no caso)

    const vel = 1;          // quantidade de casas qua cobra vai andar
    var vx = vy = 0;        // velocidade do início igual a zero 
    var px = py = 10;       // posição de início (cobra)       
    var tp = 20;			// tamanho das peças
    var qp = 30;			// quantidade de peças
    var ax = ay = 15;	    // posição de início (maçã)
    var trail = [];
    tail = 5;               // tamanho da calda

    var my_gradient = ctx.createLinearGradient(10, 0, 600, 0);   //Gradient
    my_gradient.addColorStop(0, '#7CBB91');
    my_gradient.addColorStop(.5, '#4E9C68');
    my_gradient.addColorStop(1, '#7CBB91');


    function game() {        // function para cobra entrar em um lado e sair em outro (atualiza a cabeça da cobra)

        px += vx;           // poçisão da cabeça da cobra recebe a velocidade que por enquanto é 0
        py += vy;           // poçisão da cabeça da cobra recebe a velocidade que por enquanto é 0

        if (px < 0) {
            px = qp - 1;      // se ela chegar na borda do palco, ela vai para o final  (borda esquerda)
        }
        if (px > qp - 1) {
            px = 0;         // se ela chegar na borda do palco, ela vai para o final  (borda direita)
        }
        if (py < 0) {
            py = qp - 1;      // se ela chegar na borda do palco, ela vai para o final  (borda cima)
        }
        if (py > qp - 1) {
            py = 0;         // se ela chegar na borda do palco, ela vai para o final  (borda baixo)
        }

        // ctx.fillStyle = "#95945C";      // cor tabuleiro
        ctx.fillStyle = "rgba(200, 255, 200, .8)";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "#D91900";       // cor maçã
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = "#A75300";       // cor cobra 

        for (var i = 1; i < trail.length; i++) {       // verificação se a cobra bater
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;    // caso a posição da cabeça tenha a mesma posição do rabo, recebe o tamanho de início e a velocidade
                tail = 5;
            }
        }

        trail.push({ x: px, y: py })        // movimentação da cobra
        while (trail.length > tail) {
            trail.shift();              // pinta a última peça da calda
        }

        if (ax == px && ay == py) {
            tail++;               // se a cabeça estiver na mesma poçisão da maçã a calda recebe mais uma peça

            ax = Math.floor(Math.random() * qp);        // pocisioando a maçã em outro lugar (aleatório) 
            ay = Math.floor(Math.random() * qp);
        }
    }

    function keyPush(event) {      // movimentação da cobra

        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;
            default:

                break;
        }
    }
}