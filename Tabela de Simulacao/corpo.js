var tempoDeExecucao ="";
var chegada_A = "";
var chegada_B = "";
var chegada_C = "";
var servico_A = "";
var servico_B = "";
var servico_C = "";
var resp_chegada_A = 0;
var resp_chegada_B = 0;
var resp_chegada_C = 0;
var resp_servico_A = 0;
var resp_servico_B = 0;
var resp_servico_C = 0;
var taxa_de_ocupacao_A = 0;
var taxa_de_ocupacao_B = 0;
var taxa_de_ocupacao_B = 0;

function montaTabela(){
      if($('#chegada_A').val() != "" && $('#chegada_B').val() != "" && $('#chegada_C').val() != "" &&
         $('#servico_A').val() != "" && $('#servico_B').val() != "" && $('#servico_C').val() != ""){

           if($('#inputMin').val() != ""){
             tempoDeExecucao = $('#inputMin').val();

             chegada_A = $('#chegada_A').val();
             chegada_B = $('#chegada_B').val();
             chegada_C = $('#chegada_C').val();


             servico_A = $('#servico_A').val();
             servico_B =  $('#servico_B').val();
             servico_C =  $('#servico_C').val();


             montarTabela1();

           } else {
             alert("Digite o tempo a ser simulado!");
           }


      } else {
        alert("Digite todos os campos");
      }

}


function montarTabela1(){


       resp_chegada_A = (tempoDeExecucao/chegada_A).toFixed(2);
       resp_chegada_B = (tempoDeExecucao/chegada_B).toFixed(2);
       resp_chegada_C = (tempoDeExecucao/chegada_C).toFixed(2);
       resp_servico_A = (tempoDeExecucao/servico_A).toFixed(2);
       resp_servico_B = (tempoDeExecucao/servico_B).toFixed(2);
       resp_servico_C = (tempoDeExecucao/servico_C).toFixed(2);


        $('#resp_chegada_A').text("" + (resp_chegada_A));
        $('#resp_chegada_B').text("" + (resp_chegada_B));
        $('#resp_chegada_C').text("" + (resp_chegada_C));
        $('#resp_servico_A').text("" + (resp_servico_A));
        $('#resp_servico_B').text("" + (resp_servico_B));
        $('#resp_servico_C').text("" + (resp_servico_C));

      $('#table-resposta').fadeIn();

      montarTabela2();

}

function montarTabela2(){

      var media_de_carros_A = (resp_chegada_A / (resp_servico_A - resp_chegada_A)).toFixed(2);
      var media_de_carros_B = (resp_chegada_B / (resp_servico_B - resp_chegada_B)).toFixed(2);
      var media_de_carros_C = (resp_chegada_C / (resp_servico_C - resp_chegada_C)).toFixed(2);

      $('#media_de_carros_A').text("" + media_de_carros_A);
      $('#media_de_carros_B').text("" + media_de_carros_B);
      $('#media_de_carros_C').text("" + media_de_carros_C);

      var tempo_medio_despendido_A = (1/(resp_servico_A - resp_chegada_A)).toFixed(2);
      var tempo_medio_despendido_B = (1/(resp_servico_B - resp_chegada_B)).toFixed(2);
      var tempo_medio_despendido_C = (1/(resp_servico_C - resp_chegada_C)).toFixed(2);

      $('#tempo_medio_despendido_A').text("" + tempo_medio_despendido_A);
      $('#tempo_medio_despendido_B').text("" + tempo_medio_despendido_B);
      $('#tempo_medio_despendido_C').text("" + tempo_medio_despendido_C);

      taxa_de_ocupacao_A = (resp_chegada_A / resp_servico_A).toFixed(2);
      taxa_de_ocupacao_B = (resp_chegada_B / resp_servico_B).toFixed(2);
      taxa_de_ocupacao_C = (resp_chegada_C / resp_servico_C).toFixed(2);

      $('#taxa_de_ocupacao_A').text("" + taxa_de_ocupacao_A);
      $('#taxa_de_ocupacao_B').text("" + taxa_de_ocupacao_B);
      $('#taxa_de_ocupacao_C').text("" + taxa_de_ocupacao_C);

       setTimeout(function(){
         $('#table-medias').fadeIn("slow");

       }, 500);

       setTimeout(function(){
            $('#form-probabilidade').fadeIn();
       }, 1000);
}

function montaTabelaProbabilidades(){

    $('#table-probabilidade').fadeIn();

    $("#corpo-tabela").find('.teste').remove();
     var quantProb =  $('#inputPessoa').val();

     for(var i=0; i<quantProb; i++){
        $("#corpo-tabela").append("<tr class='teste'><th class='text-align'>"+i+"</th><td class='text-align'>P("+i+")</td><td class='text-align'>"+((1- (taxa_de_ocupacao_A))* (Math.pow(taxa_de_ocupacao_A,i))).toFixed(2)+"</td>"+
                                                              "<td class='text-align'>"+((1- (taxa_de_ocupacao_B))* (Math.pow(taxa_de_ocupacao_B,i))).toFixed(2)+"</td>"+
                                                              "<td class='text-align'>"+((1- (taxa_de_ocupacao_C))* (Math.pow(taxa_de_ocupacao_C,i))).toFixed(2)+"</td></tr>");

     }
}
