import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import sair from '../imagens/icones/sair.png';
import editar from '../imagens/icones/editar.png';
import excluir from '../imagens/icones/excluir.png';

import {
  criarPost, deslogar, fetchData, deletarPost,
  editarPost, auth,
} from '../serviceFirebase/firebaseAuth';

export default async () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const dadosUsuarioLogado = await auth.currentUser;

  const renderPosts = async () => {
    const posts = await fetchData();

    const containerPostsElement = containerFeed.querySelector('#containerPosts');

    if (!containerPostsElement) {
      return;
    }
    containerPostsElement.innerHTML = '';

    posts.forEach((postagem) => {
      const novoPostElement = document.createElement('div');
      novoPostElement.className = 'novo-post';
      novoPostElement.id = `post_${postagem.id}`;

      const postUsuarioLogado = dadosUsuarioLogado && dadosUsuarioLogado.uid === postagem.user_id;

      const postHtml = `
      <div id="containerPosts2" class="containerPostVerde">
        <div class="nomeTipo">
          <strong>${postagem.nome}</strong>
          <p>Paciente</p>
        </div>
        <div class="espacoBranco">
          <p>${postagem.mensagem}</p>
        </div>
        <div class="actionBtnPost">
          ${postUsuarioLogado ? `<img src=${editar} alt="Editar" title="Editar" data-post-id="${postagem.id}"
            class="editarPostagem">` : ''}
          ${postUsuarioLogado ? `<img src=${excluir} alt="Excluir" title="Excluir" data-post-id="${postagem.id}"
            class="excluirPostagem">`
    : ''
}
        </div>
      </div>
      `;
      novoPostElement.innerHTML = postHtml;
      containerPostsElement.appendChild(novoPostElement);
    });
  };

  const containerPublicacaoPost = `
  <div class="containerPostVerde">
    <div class="nomeTipo">
      <strong>${dadosUsuarioLogado.displayName}</strong>
      <p>Paciente</p>
    </div>
    <textarea class="text-area" name="postagem" id="text-mensagem" cols="30" rows="10"></textarea>
    <span class="erro" id="erro-post-vazio"></span>
    <div class="botoes">
      <button type="submit" id="btnPublicar" class="btnPubli">Publicar</button>
      <img src=${excluir} alt="Excluir" title="Excluir" id="apagaTexto">
    </div>
  </div>
`;

  const templateFeed = `
  <header class='superior'>
    <nav>
      <a href="#perfil" id="feed" class="nome-usuario">${dadosUsuarioLogado.displayName}
      </a>
    </nav>
    <img id="ir-infopage" class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
    
    
  </header>
    ${containerPublicacaoPost}
    <div id="containerPosts" class="containerVerdeFeed">
    </div>
    <footer class="footer">
      <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
      <img class="iconesFooter" id="iconeSair" src=${sair} alt="icone sair" title="Ícone para Deslogar">
    </footer>
`;

  containerFeed.innerHTML = templateFeed;

  const mensagemPost = containerFeed.querySelector('#text-mensagem');
  const btnPublicar = containerFeed.querySelector('#btnPublicar');
  const btnDeslogar = containerFeed.querySelector('#iconeSair');
  const btnApagaTexto = containerFeed.querySelector('#apagaTexto');
  const erroMensagemVazia = containerFeed.querySelector('#erro-post-vazio');

  mensagemPost.addEventListener('input', () => {
    erroMensagemVazia.innerHTML = '';
  });

  const limpaTextarea = () => {
    mensagemPost.value = '';
  };
  btnApagaTexto.addEventListener('click', limpaTextarea);

  btnPublicar.addEventListener('click', async () => {
    const mensagem = mensagemPost.value;
    if (mensagem.length > 1) {
      await criarPost(mensagem, dadosUsuarioLogado.uid);
      mensagemPost.value = '';
      await renderPosts();
    } else {
      erroMensagemVazia.innerHTML = 'Insira um mensagem para ser publicada';
    }
  });

  containerFeed.addEventListener('click', (event) => {
    const target = event.target;
    const btnDeletar = target.closest('.excluirPostagem');
    const btnEditar = target.closest('.editarPostagem');
    if (btnDeletar) {
      const postId = btnDeletar.getAttribute('data-post-id');
      if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
        deletarPost(postId)
          .then(() => {
            btnDeletar.closest('.novo-post').remove();
            alert('Publicação excluída com sucesso!');
          })
          .catch((error) => {
            alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde', error);
          });
      }
    }

    if (btnEditar) {
      const postId = btnEditar.getAttribute('data-post-id');
      const elementoPost = btnEditar.closest('.novo-post');
      const mensagemDoPost = elementoPost.querySelector('.espacoBranco p').textContent;
      const novaMensagem = window.prompt(`Editar Post: ${mensagemDoPost}`);

      if (novaMensagem !== null) {
        editarPost(postId, novaMensagem)
          .then(() => {
            btnEditar.closest('.novo-post').textContent = novaMensagem;
            alert('Publicação editada com sucesso!');
            renderPosts();
          })
          .catch((error) => {
            alert('Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde', error);
          });
      }
    }
  });

  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    window.location.href = '#login';
  });

  renderPosts();

  return containerFeed;
};
