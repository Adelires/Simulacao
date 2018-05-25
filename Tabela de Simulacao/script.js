var arrayTec = [];
var arrayTs = [];
var relogio = 0;


function removeTec(element) {
    arrayTec.splice(element, 1);
    mostraListaTec();
}

function removeTs(element) {
    arrayTs.splice(element, 1);
    mostraListaTs();
}

function mostraListaTec() {
    var lista = "";
    for (var i = 0; i < arrayTec.length; i++) {
        lista += '<li>' + arrayTec[i] + '<span class="remove" onclick="removeTec(' + i + ')"> x</apan></li> ';
    }
    $('.lista-tec ul').html(lista);
}

function mostraListaTs() {
    var lista = "";
    for (var i = 0; i < arrayTs.length; i++) {
        lista += '<li>' + arrayTs[i] + '<span class="remove" onclick="removeTs(' + i + ')"> x</apan></li> ';
    }
    $('.lista-ts ul').html(lista);
}

function addListaTec() {
    var entrada = $('#inputTempoTec').val();

    if (entrada != 0 && entrada != "" && arrayTec.indexOf(entrada) == -1) {
        arrayTec.push(entrada);
        $('#inputTempoTec').val("");
        mostraListaTec();
        $('#inputTempoTec').focus();
    } else {
        alert("Digite um valor valido!");
    }
}

function addListaTs() {
    var entrada = $('#inputTempoTs').val();

    if (entrada != 0 && entrada != "" && arrayTs.indexOf(entrada) == -1) {
        arrayTs.push(entrada);
        $('#inputTempoTs').val("");
        mostraListaTs();
        $('#inputTempoTs').focus();
    } else {
        alert("Digite um valor valido!");
    }
}

function numeroAleatorioTec() {
    randomTec = Math.floor(Math.random() * arrayTec.length);
    console.log(arrayTec[randomTec]);
    return parseInt(arrayTec[randomTec]);
}

function numeroAleatorioTs() {
    randomTs = Math.floor(Math.random() * arrayTs.length);
    console.log(arrayTs[randomTs]);
    return parseInt(arrayTs[randomTs]);
}

function simulacao() {

    relogio = 0;

    var tempoDeSimulacao = parseInt($('#inputTempo').val());

    var tempoTotalDaFila = 0;
    var tempoTotalDeClientesNoSistema = 0;
    var tempoLivreTotalDoOperador = 0;
    var tempoTotalDeServico = 0;

    var tempoFinalUltimoServico = 0;
    var clientes = new Array();

    if(!tempoDeSimulacao){
       alert("Digite o tempo a ser simulado!");
       return;
    } 

    while (relogio < tempoDeSimulacao) {

        var tec = numeroAleatorioTec();
        var ts = numeroAleatorioTs();

        var cliente = {
            tec: tec,
            ts: ts,
            tempoDeChegada: relogio + tec
        };

        cliente.tempoLivreDoOperador = (tempoFinalUltimoServico < cliente.tempoDeChegada) ?
            cliente.tempoDeChegada - tempoFinalUltimoServico : 0;
        cliente.tempoNaFila = (tempoFinalUltimoServico >= cliente.tempoDeChegada) ?
            tempoFinalUltimoServico - cliente.tempoDeChegada : 0;
        cliente.inicioDoServico = cliente.tempoDeChegada + cliente.tempoNaFila;
        cliente.finalDoServico = cliente.inicioDoServico + ts;
        cliente.tempoNoSistema = (cliente.finalDoServico - cliente.inicioDoServico) + cliente.tempoNaFila;

        tempoFinalUltimoServico = cliente.finalDoServico;

        tempoTotalDeServico += ts;
        tempoTotalDaFila += cliente.tempoNaFila;
        tempoTotalDeClientesNoSistema += cliente.tempoNoSistema;
        tempoLivreTotalDoOperador += cliente.tempoLivreDoOperador;

        relogio += tec;

        clientes.push(cliente);
    }

    mostrarTabelaSimulacao(clientes, {
        totalServicos: tempoTotalDeServico,
        totalTempoLivre: tempoLivreTotalDoOperador,
        totalNoSistema: tempoTotalDeClientesNoSistema,
        totalFila: tempoTotalDaFila,
    });
}

function mostrarTabelaSimulacao(clientes, info) {
    var tabela = $('#tabela-simulacao');
    tabela.find('tbody').html('');
    for (var i = 0; i < clientes.length; i++) {
        
        var linha = $('<tr></tr>');
        
        linha.append('<td>' + (i + 1) + '</td>')
             .append('<td>' + clientes[i].tec + '</td>')
             .append('<td>' + clientes[i].tempoDeChegada + '</td>')
             .append('<td>' + clientes[i].ts + '</td>')
             .append('<td>' + clientes[i].inicioDoServico + '</td>')
             .append('<td>' + clientes[i].tempoNaFila + '</td>')
             .append('<td>' + clientes[i].finalDoServico + '</td>')
             .append('<td>' + clientes[i].tempoNoSistema + '</td>')
             .append('<td>' + clientes[i].tempoLivreDoOperador + '</td>');

        tabela.find('tbody').append(linha);
    }

    // totais
    var footer = $('<tr></tr>');
    footer.append('<th colspan="3"></th>')
          .append('<th>' + info.totalServicos + '</th>')
          .append('<th></th>')
          .append('<th>' + info.totalFila + '</th>')
          .append('<th></th>')
          .append('<th>' + info.totalNoSistema + '</th>')
          .append('<th>' + info.totalTempoLivre + '</th>');

    tabela.find('tfoot').html(footer);
}
