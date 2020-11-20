function logar() {

    // para testar se a função está funcionando:
    // window.alert("oi");


    var objeto = {
        "email": document.getElementById("txtemail").value,
        "senha": document.getElementById("txtsenha").value
    }

    var cabecalho = {
        method: "POST",
        body: JSON.stringify(objeto),

        headers: {
            "Content-type": "application/json"
        }

    }

    //fetch é um "send" do post

    fetch("http://localhost:8080/login", cabecalho)
        .then(res => res.json())
        .then(res => {
            window.alert(res.nome);
        })
        .catch(err => {
            window.alert("Deu ruim");
        });






}
