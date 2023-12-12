inteface = document.getElementById('interface')
cena = document.getElementById('cena')

inventario = []

cena.innerHTML = `
    <div id="barbies">
    <div class="barbie" onclick="iniciar(0)">
    ${foto("medica.png")} <br>
    <text>Barbie Médica</text>
    </div>
    <div class="barbie" onclick="iniciar(1)">
    ${foto("estudante.png")} <br>
    <text>Barbie Estudante</text>
    </div>
    <div class="barbie" onclick="iniciar(2)">
    ${foto("psicologa.png")} <br>
    <text>Barbie Psicóloga</text>
    </div>
    <div class="barbie" onclick="iniciar(3)">
    ${foto("atriz.png")} <br>
    <text>Barbie Atriz</text>
    </div>
</div>`

document.getElementById("relogio").innerHTML = "<h1>Barbie's World</h1>"

function iniciar(i){
    saude = 100
    higiene = 100
    energia = 100
    felicidade = 100
    dinheiro = 0
    contas = 0
    if(i == 0){
        saude += 50
        perfil = "Médica" 
        imgNome = "medica"
    }
    if(i == 1){
        energia += 50
        perfil = "Estudante"
        imgNome = "estudante"
    }
    if(i == 2){
        felicidade += 50
        perfil = "Psicóloga"
        imgNome = "psicologa"
    }
    if(i == 3){
        dinheiro += 500
        perfil = "Atriz"
        imgNome = "atriz"
    }
    atualizarAtributos()
    cenaSala()
    jogo = true
    imgPerfil = `<img id="img-perfil" src="img/${imgNome}.png">`
    document.getElementById('perfil').innerHTML = `<h3>${imgPerfil} Barbie ${perfil}</h3>`
}

function atualizarAtributos(){
    document.getElementById('atributos').innerHTML =
    'Saúde: '+saude+ '<br>' +
    'Higiene: '+higiene+'<br>'+
    'Energia: '+energia+ '<br>' +
    'Felicidade: '+felicidade+'<br>'+
    'Dinheiro: R$'+dinheiro+ '<br>' +
    'Contas: R$'+contas

    if(saude <= 0){
        interface.innerHTML = ''
        cena.innerHTML = '<i class="fa-solid fa-skull-crossbones"></i> Você faleceu.'
    }
}

function foto(foto){
    return '<img class="foto" src="img/'+foto+'">'
}

// RELÓGIO

jogo = false
hora = 0
minuto = 0
cont = 0
dm = 2

setInterval(() => {
    if(jogo){

        minuto += 1
        cont += 1

        if (cont == 5) {
            saude -= dm
            energia -= dm
            felicidade -= dm
            higiene -= dm
            atualizarAtributos()
            cont = 0
            atualizarAtributos()
        }

        if (minuto > 59) {
            minuto = 0
            hora += 1
            acao("dinheiro", 150)
            atualizarAtributos()
        }
        if (hora > 23) {
            hora = 0
            dinheiro -= contas
            contas = 0
            atualizarAtributos()
        }

        if (higiene < 6){
            dm += 2
        }

        if (energia < 6){
            dm += 2
        }

        if (felicidade < 6){
            dm += 1
        }

        document.getElementById('relogio').innerHTML = `
        <i class="fa-regular fa-clock"></i>
        <label>`+hora+`:`+minuto+`</label>`

    }
}, 1000)

// CENÁRIOS

function cenaSala(){
    cena.style.backgroundImage = 'url(img/sala.jpg)'
    cena.innerHTML = `
    <button onclick="cenaCozinha()"><i class="fa-solid fa-kitchen-set"></i> Ir pra cozinha</button>
    <button onclick="cenaBanheiro()"><i class="fa-solid fa-toilet"></i> Ir pro banheiro</button>
    <button onclick="acao('felicidade', 10); acao('contas', 5)"><i class="fa-solid fa-tv"></i> Assistir TV</button>
    <button onclick="conversar('Ken')"><i class="fa-regular fa-commenting"></i> Conversar com Ken</button>
    <button onclick="conversar('Honey')"><i class="fa-regular fa-commenting"></i> Conversar com Honey</button>`
}

function cenaCozinha(){
    cena.style.backgroundImage = 'url(img/cozinha.jpg)'
    cena.innerHTML = `
    <button onclick="cenaSala()"><i class="fa-solid fa-couch"></i> Ir pra sala</button>
    <button onclick="cenaQuarto()"><i class="fa-solid fa-bed"></i> ir pro quarto</button>
    <button onclick="acao('energia', 10); acao('contas', 5)"><i class="fa-solid fa-drumstick-bite"></i> Comer</button>
    <button onclick="conversar('Raquelle')"><i class="fa-regular fa-commenting"></i> Conversar com Raquelle</button>
    <button onclick="conversar('Ryan')"><i class="fa-regular fa-commenting"></i> Conversar com Ryan</button>`
}

function cenaBanheiro(){
    cena.style.backgroundImage = 'url(img/banheiro.jpg)'
    cena.innerHTML = `
    <button onclick="cenaQuarto()"><i class="fa-solid fa-bed"></i> ir pro quarto</button>
    <button onclick="cenaSala()"><i class="fa-solid fa-couch"></i> Ir pra sala</button>
    <button onclick="acao('higiene', 10); acao('saude', 10); acao('contas', 5)">Tomar Banho</button>`
}

function cenaQuarto(){
    cena.style.backgroundImage = 'url(img/quarto.jpg)'
    cena.innerHTML = `
    <button onclick="cenaCozinha()"><i class="fa fa-kitchen-set"></i> Ir pra cozinha</button>
    <button onclick="cenaBanheiro()"><i class="fa fa-toilet"></i> Ir pro banheiro</button>
    <button onclick="acao('energia', 15); acao('saude', 15)"><i class="fa-solid fa-bed"></i> Dormir</button>
    <button onclick="conversar('Nikki')"><i class="fa-regular fa-commenting"></i> Conversar com Nikki</button>`
   
}

function acao(atributo, v){

    if(atributo == 'saude'){ saude += v }
    if(atributo == 'higiene'){ higiene += v }
    if(atributo == 'energia'){ energia += v }
    if(atributo == 'felicidade'){ felicidade += v }
    if(atributo == 'dinheiro'){ dinheiro += v }
    if(atributo == 'contas'){ contas += v}

    atualizarAtributos()
}

// NPCs

npc = {
    'Ken': [[
    'Eu amei sua casa nova!!',
    'Ela é toda rosa!!',
    'Comprei um vaso de flor, ele vai dar vida ao seu lar.'
    ], 0],
    'Raquelle': [[
    'Que inveja da sua casa, quero uma igual',
    'Eu e o Ryan somos seus vizinhos da casa cinza',
    'Trouxemos cookies deliciosos de boas vindas'
    ], 0],
    'Honey': [[
    'au au au au au',
    'snif, snif',
    'auuuuuuuuuuuuu'
    ], 0],
    'Ryan': [[
    'A Raquelle é a melhor cozinheira que eu conheço!',
    'Eu e o Ken podemos ser amigos',
    'Quando eu fizer um churrasco lá em casa, convido vocês'
    ], 0],
    
    'Nikki': [[
    'Amiga!Precisamos fazer uma festa do pijama!!',
    'Cada uma pode trazer algo para comer',
    'E muita fofoca hahahahahahha'
    ], 0]
}

function conversar(per){

    dialogo = document.getElementById('dialogo')
    dialogo.style.display = 'flex'

    i = npc[per][1]
    fl = npc[per][0]
    iv = (fl.length - 1)

    dialogo.innerHTML = '<div>'+per+'</div>'
    +fl[i]+
    `<button onclick="dialogo.style.display = 'none'" id="btn-dialogo"><i class="fa-brands fa-x-twitter"></i></button>`

    if (i == 2 && per == "Ken"){
        npc[per][0].pop()
        inventario.unshift({img: "", name: "vaso de flor", desc: "um vaso com uma linda flor"})
    }

    else if (i == 2 && per == "Raquelle"){
        npc[per][0].pop()
        inventario.unshift({img: "", name: "cookies", desc: "deliciosos cookies recem assados"})
    }
    
    if (i == iv){
        npc[per][1] = 0
    }

    else{
        npc[per][1] += 1
    }
    
}