const urlParams = new URLSearchParams(window.location.search);

const limit = parseInt(urlParams.get("limit")) || 2;
let pageWiew = parseInt(urlParams.get("pageWiew")) || 1;

const div = document.getElementById("lista-recados");
const btnProximo = document.getElementById("proximo");
const btnAnterior = document.getElementById("anterior");

const paginar = async () => {
  try {
    const data = {
      limit,
      pageWiew,
    };

    const response = await api.get("/messages", { params: data });
    const mensagem = response.data.recados;

    mensagem.forEach((msg) => {
      const divCriada = document.createElement("div");
      divCriada.innerHTML = `<p>Id: ${msg.id}</p>
        <p>Título: ${msg.titulo}</p>
        <p>Descrição: ${msg.descricao}</p>`;

      div.appendChild(divCriada);
    });
    const paginaAtual = document.getElementById("pagina-atual");
    paginaAtual.innerHTML = `<p>Página atual: ${response.data.paginaAtual}</p>`;

    btnAnterior.disabled = pageWiew === 1;
    btnProximo.disabled = response.data.totalPaginas === pageWiew;
  } catch (error) {
    console.log(error);
  }
};

paginar();

const proximaPagina = () => {
  if (pageWiew) {
    pageWiew += 1;
  }
  div.innerHTML = "";
  paginar();
};

const paginaAnterior = () => {
  if (pageWiew > 1) {
    pageWiew -= 1;
  }
  div.innerHTML = "";
  paginar();
};
