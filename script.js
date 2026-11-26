
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const formulario = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");

function salvarDados() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function listarClientes() {
    lista.innerHTML = "";

    clientes.forEach((cliente) => {
        const item = document.createElement("li");
        item.textContent = cliente.nome + " - " + cliente.telefone + " ";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = () => editarCliente(cliente.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirCliente(cliente.id);

        item.appendChild(editar);
        item.appendChild(excluir);
        lista.appendChild(item);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (nome.length < 3 || telefone.length < 8) {
        alert("Informe um nome e telefone válidos.");
        return;
    }

    const cliente = {
        id: Date.now(),
        nome: nome,
        telefone: telefone
    };

    clientes.push(cliente);
    salvarDados();
    listarClientes();
    formulario.reset();

    alert("Cliente cadastrado com sucesso!");
});

function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);

    const novoNome = prompt("Novo nome:", cliente.nome);
    if (novoNome === null) return;

    const novoTelefone = prompt("Novo telefone:", cliente.telefone);
    if (novoTelefone === null) return;

    if (novoNome.trim().length < 3 ||
        novoTelefone.trim().length < 8) {
        alert("Dados inválidos!");
        return;
    }

    cliente.nome = novoNome.trim();
    cliente.telefone = novoTelefone.trim();

    salvarDados();
    listarClientes();
    alert("Cliente atualizado!");
}

function excluirCliente(id) {
    if (confirm("Deseja excluir este cliente?")) {
        clientes = clientes.filter(c => c.id !== id);
        salvarDados();
        listarClientes();
        alert("Cliente excluído!");
    }
}

pesquisa.addEventListener("input", function() {
    const termo = pesquisa.value.toLowerCase();

    const filtrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(termo)
    );

    lista.innerHTML = "";

    filtrados.forEach(cliente => {
        const item = document.createElement("li");
        item.textContent = cliente.nome + " - " + cliente.telefone + " ";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = () => editarCliente(cliente.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirCliente(cliente.id);

        item.appendChild(editar);
        item.appendChild(excluir);
        lista.appendChild(item);
    });
});

listarClientes();
