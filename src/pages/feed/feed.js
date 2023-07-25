import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import coracao from '../imagens/icones/coracao.png';
import editar from '../imagens/icones/editar.png';
import excluir from '../imagens/icones/excluir.png';

import { criarPost, deslogar, getCurrentUser } from '../serviceFirebase/firebaseAuth';

export default async () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const dados = await getCurrentUser();
  console.log(dados);

  const templateFeed = `
  <header>
  <nav>
    <a href="#perfil" id="feed" class="nome-usuario">Imagem ${dados.displayName}</a>
  </nav>
  <figure>
    <img id="ir-infopage" class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
  </figure>
</header>

  <footer class="footer">
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>

  <img class="iconesFooter" id="iconeSair" src=${sair} alt="icone sair" title="Ícone para Deslogar">
  </footer>
  `;

  const containerPost = `<span class="tipoUsuario1"></span>
  <div id="containerPosts" class="containerVerdeFeed">
  <span class="NomeUsuario"></span>
  <span class="tipoUsuario"></span>
  </div>
  <div class="containerPostVerde">

          <div class="nomeTipo">
            <strong>${dados.displayName}</strong>
            <p>tipo</p>
          </div>

             <textarea class="text-area" name="postagem" id="text-mensagem" cols="30" rows="10"></textarea>
          
        <div class="actionBtnPost">

          <button type="button" class="filesPost like">
            <img src=${coracao} alt="Curtir" title="Curtir">
          </button>

          <button type="button" class="filesPost editar">
            <img src=${editar} alt="Editar" title="Editar">
          </button>

          <button type="button" class="filesPost share">
            <img src=${excluir} alt="Excluir" title="Excluir">
          </button>
          <button type="submit" id="btnPublicar" class="btnPubli">Publicar</button>
        </div>
  </div>
  `;

  containerFeed.innerHTML = templateFeed + containerPost;

  const mensagemPost = containerFeed.querySelector('#text-mensagem');
  const btnloguinho = containerFeed.querySelector('#ir-infopage');
  const btnPublicar = containerFeed.querySelector('#btnPublicar');
  const btnDeslogar = containerFeed.querySelector('#iconeSair');

  btnloguinho.addEventListener('click', () => {
    window.location.hash = '#infopage';
  });

  // btnPublicar.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   const msg = mensagemPost.value;
  //   console.log(msg);
  //   criarPost(msg);

  //   mensagemPost.value = '';
  // });

  btnPublicar.addEventListener('click', async (e) => {
    e.preventDefault();
    const msg = mensagemPost.value;
    console.log(msg);
    await criarPost(msg);

    // Criar os elementos para mostrar a nova publicação
    const novoPostElement = document.createElement('div');
    novoPostElement.className = 'novo-post'; // Adicione a classe que desejar para estilização

    // O conteúdo da nova publicação, por exemplo:
    const postHtml = `
    <div id="containerPosts2" class="containerPostVerde">
    <div class="nomeTipo">
      <strong>${dados.displayName}</strong>
      <p>Paciente</p>
    </div>
    <div class="espacoBranco">
    <p>${msg}</p>
    </div>
    <div class="actionBtnPost">
    <img src=${coracao} alt="Curtir" title="Curtir">
    <img src=${editar} alt="Editar" title="Editar">
    <img src=${excluir} alt="Excluir" title="Excluir">
    </div>
  `;

    novoPostElement.innerHTML = postHtml;

    // Adicionar o novo post como o primeiro filho de containerPosts
    const containerPosts = document.getElementById('containerPosts');
    containerPosts.appendChild(novoPostElement);

    // Limpar o valor da mensagem no textarea
    mensagemPost.value = '';
  });

  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#home';
  });

  return containerFeed;
};

// const postHtml = `
//     <div class="nomeTipo">
//       <strong>${dados.displayName}</strong>
//       <p>Paciente</p>
//     </div>
//     <div class="containerPostVerde">
//     <p>${msg}</p>
//     </div>
//     <!-- Resto do conteúdo do post -->
//   `;
