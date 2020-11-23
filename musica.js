function montartabela(lista){
var saida = 
"<table border='1' align='center'> <tr>" +
"<th>Musica</th>   <th>Artista</th>   <th>Cadastro</th></tr>";

for (cont=0;cont<lista.length;cont++){
    saida+=
    "<tr>" +
    "<td>" + lista[cont].titulo + "</td>" + 
    "<td>" + lista[cont].artista.nomeArtistico + "</td>" + 
    "<td>" + lista[cont].cadastro + "</td>" + 
    "</tr>";
}

//para teste
saida +="</table>";
document.getElementById("resultado").innerHTML=saida;

}



function filtrar(){
    if (
        document.getElementById("chktitulo").checked==false && 
        document.getElementById("chkartista").checked==false
        ){

            window.alert("Escolha uma opção!!!!");
    }else{
        var rota = "relatoriopor";
        if (document.getElementById("chktitulo").checked==true){
            rota+="titulo";
        }
        if (document.getElementById("chkartista").checked==true){
            rota+="artista";
        }
        var objeto= {
            titulo: document.getElementById("txttitulo").value ,
            artista : {
                id : document.getElementById("cmbartistas").value
            }
        };

        var cabecalho = {
            method:"POST",
            body : JSON.stringify(objeto),
            headers : {
                "content-type" : "application/json"
            }
        }

        fetch("http://localhost:8080/" + rota, cabecalho)
            .then(res => res.json())
            .then(res => montartabela(res))
            .catch(err => {
                window.alert("Música não encontrada.");
            });
    }    
}

function preencherartistas(lista) {
    var saida = "";
    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            "<option value='" + lista[cont].id + "'>" + lista[cont].nomeArtistico + "</option>";
    }
    document.getElementById("cmbartistas").innerHTML = saida;
}

function carregarartistas() {
    fetch("http://localhost:8080/artistas")
        .then(res => res.json())
        .then(res => preencherartistas(res));
}

function gravar() {

    // 2020-11-23
    var data = document.getElementById("txtcadastro").value;
    var ano = data.substring(0, 4);
    var mes = data.substring(5, 7);
    var dia = data.substring(8);
    var databrasil = dia + "/" + mes + "/" + ano;

    var objeto = {
        titulo: document.getElementById("txttitulo").value,
        cadastro: databrasil,
        lancamento: document.getElementById("cmblancamento").value,
        artista: {
            id: document.getElementById("cmbartistas").value
        }
    }

    var cabecalho = {
        method: "POST",
        body: JSON.stringify(objeto),
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch("http://localhost:8080/novamusica", cabecalho)
        .then(res => res.json())
        .then(res => { window.alert("Gravado com sucesso!") })
        .catch(err => { window.alert("Ocorreu um erro") });

}