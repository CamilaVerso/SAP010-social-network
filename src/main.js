// Este es el punto de entrada de tu aplicacion
// import signInWithEmailAndPassword from "./lib/configFirebase";

// createUserWithEmailAndPassword();

import login from './pages/login/login.js';
import home from './pages/home/home.js';
import cadastro from './pages/cadastro/cadastro.js';
import feed from './pages/feed/feed.js';

const main = document.getElementById('root');
const init = () => {
  window.addEventListener('hashchange', () => {
    // console.log(window.location.hash)
    main.innerHTML = ' ';
    switch (window.location.hash) {
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
        main.appendChild(feed());
        break;
      default:
        main.appendChild(home());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(home());
  init();
});

// const novaConta = document.getElementById('cadastro'); /* evento para criar nova conta */
// window.onload = function () {
//   novaConta.addEventListener('click', () => {
//     window.location.hash = '/#cadastro';
//   });
// };

// const google = document.getElementById("entrarGoogle"); /*evento para entrar com a conta google*/
// google.addEventListener("click", (e) => {
//   const entrar = e.target.value;
//   console.log(entrar);
// });

// firebase
//   .auth()
//   .signInWithEmailAndPassword(form.email().value, form.password().value)
//   .then((response) => {
//     window.location.href = "#feed";
//   })
//   .catch((error) => {
//     console.log("erro", error);
//   });

// firebase.auth().signInWithEmailAndPassword("any@email.com", "123456").then(response => {
//   console.log("sucesso", response);
// }).catch((error) => {
//   console.log("erro", error);
// });

// signInWithEmailAndPassword();

// select.addEventListener("change", (evento) => {
//   const selecao = evento.target.value;
//   const cardsOrdenados = ordenaCartas(dadosTarot, selecao);
//   infosDosCardsTela(cardsOrdenados);
// });
