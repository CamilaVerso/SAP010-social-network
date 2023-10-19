import login from './pages/login/login.js';
import home from './pages/home/home.js';
import cadastro from './pages/cadastro/cadastro.js';
import feed from './pages/feed/feed.js';
import perfil from './pages/perfil/perfil.js';
import infopage from './pages/infopage/infopage.js';
import { auth } from './pages/serviceFirebase/firebaseAuth.js';

const main = document.getElementById('root');

const init = () => {
  window.addEventListener('hashchange', async () => {
    main.innerHTML = '';
    const novaHash = window.location.hash;

    const estaLogado = await auth.currentUser;

    if ((novaHash !== '#feed' && novaHash !== '#perfil') || estaLogado || novaHash === '#login') {
      switch (novaHash) {
        case '#home':
          main.appendChild(home());
          break;
        case '#login':
          main.appendChild(login());
          break;
        case '#cadastro':
          main.appendChild(cadastro());
          break;
        case '#feed':
          main.appendChild(await feed());
          break;
        case '#perfil':
          main.appendChild(await perfil());
          break;
        case '#infopage':
          main.appendChild(infopage());
          break;
        default:
          main.appendChild(home());
          break;
      }
    } else {
      window.location.hash = '#login';
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(home());
  init();
});
