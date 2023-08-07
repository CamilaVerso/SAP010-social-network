/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, updateProfile,
} from 'firebase/auth';
import {
  doc, updateDoc, db, collection, addDoc, deleteDoc,
} from 'firebase/firestore';
import {
  criarUsuario, loginGoogle, login, deslogar, editarPost, usuarioAtual, deletarPost,
  manipularMudancaHash, atualizaPerfil, criarPost,
} from '../src/pages/serviceFirebase/firebaseAuth.js';

import { auth } from '../src/firebaseInit.config.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/firebaseInit.config.js');

beforeEach(() => {
  jest.clearAllMocks();
});

const mockUser = {
  user: {
    nome: 'Camila',
    email: 'test@example.com',
    senha: '123456',
  },
};

describe('criarUsuario is a function', () => {
  it('É uma função', () => {
    expect(typeof criarUsuario).toBe('function');
  });

  it('Criou um novo usuário', async () => {
    const authMock = getAuth();
    const testEmail = 'test@example.com'; // Renomeie a variável email para evitar conflito de escopo
    const senha = '123456';
    createUserWithEmailAndPassword.mockResolvedValue(mockUser);
    await criarUsuario(testEmail, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(authMock, testEmail, senha);
  });
});

describe('signInWithEmailAndPassword', () => {
  it('deve logar com o usuario criado', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'email@aleatorio.com';
    const senha = 'senhaaleatoria';
    await login(email, senha);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});

describe('Login com o Google', () => {
  it('deveria ser uma função', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Deveria logar com o Google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    // permite que defina o valor de retorno de uma função mockada como uma Promise resolvida
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('deslogar', () => {
  it('deveria ser uma função', () => {
    expect(typeof deslogar).toBe('function');
  });

  it('deve deslogar o usuário', async () => {
    // Chama a função deslogar
    await deslogar();

    // Verifica se a função signOut foi chamada
    expect(signOut).toHaveBeenCalled();
    // Verifica se a função signOut foi chamada apenas uma vez
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe('Editar Post', () => {
  it('Deveria atualizar o post do usuário', async () => {
    const postId = 'post_id_mock';
    const novaMensagem = 'Nova mensagem do post';

    doc.mockReturnValueOnce('docRef_mock');
    updateDoc.mockResolvedValueOnce();

    await editarPost(postId, novaMensagem);

    expect(doc).toHaveBeenCalledWith(db, 'Post', postId);
    expect(updateDoc).toHaveBeenCalledWith('docRef_mock', expect.anything());
  });
});

  describe('usuarioAtual (verifica se o usuário está logado)', () => {
    it('Deveria retornar o usuário autenticado', () => {
      usuarioAtual();
      expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    });
  });

describe('deletarPost', () => {
  it('deveria ser uma função', () => {
    expect(typeof deletarPost).toBe('function');
  });

  it('deveria deletar um post', async () => {
    const postId = 'c5ZtMGYWOhWlIDLBUy1RHSLlCMD2'; // Substitua pelo postId válido
    await deletarPost(postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});

describe('manipularMudancaHash ', () => {
  it('deveria ser uma função', () => {
    expect(typeof manipularMudancaHash).toBe('function');
  });
});

// describe('Função criar Post', () => {
//   it('deve criar um post e guardar na coleção', async () => {
//     auth.currentUser = {
//       uid: '123123456',
//       displayName: 'Nome do usuário',
//     };

//     const post = {
//       mensagem: 'postagem',
//       user_id: '12345678',
//       nome: 'username',
//       data: '12/01/2022',
//     };
//     const querySnapshot = addDoc.mockResolvedValueOnce(mockUser);

//     await criarPost(post.mensagem);
//       expect(querySnapshot).toHaveBeenCalledTimes(1);
//       expect(addDoc).toHaveBeenCalledWith(collection(db, 'Post'), post);
//       expect(addDoc).toHaveBeenCalledTimes(1);
//   });
// });

// describe('Função criar Post', () => {
//   it('deve criar um post e guardar na coleção', async () => {
//     const mockMensagem = 'teste123';
//     const mockTimestamp = 1689688182295;
//     const mockAddDoc = jest.fn();

//     addDoc.mockResolvedValueOnce({ id: 'mockPostId' });

//     auth.currentUser = {
//       uid: '123456789',
//       displayName: 'nomeusuario',
//     };

//     Date.getTime = jest.fn(() => mockTimestamp);

//     const document = await criarPost(mockMensagem);
//     expect(mockAddDoc).toHaveBeenCalledWith(collection(db, 'Post'), {
//       mensagem: mockMensagem,
//       user_id: auth.currentUser.uid,
//       nome: auth.currentUser.displayName,
//       data: mockTimestamp,
//     });
//     expect(document).toEqual({ id: 'mockPostId' });
//  });
// });

// describe('criarPost', () => {
//   it('deve criar um post e guardar na coleção', async () => {
//     const mockAppAuth = {
//       currentUser: {
//         displayName: 'Camila Gonçalves',
//         uid: 'bJVtk9aBSaRSuJMlXrPZCqWRbon2',
//       },
//     };
//     auth.mockReturnValue(mockAppAuth);
//     addDoc.mockResolvedValue();
//     const mensagem = 'Nova mensagem';
//     const novoPost = {
//       mensagem,
//       user_id: mockAppAuth.currentUser.uid,
//       name: mockAppAuth.currentUser.displayName,
//       data: new Date(),
//     };
//     await criarPost(mensagem);
//     expect(addDoc).toHaveBeenCalledTimes(1);
//     expect(addDoc).toHaveBeenCalledWith(undefined, novoPost);
//   });
// });

describe('criarPost', () => {
  it('deve criar um post e guardar na coleção', async () => {
    addDoc.mockResolvedValue();
    getAuth.mockReturnValue({
      currentUser: {
        displayName: 'Camila Gonçalves',
        uid: 'bJVtk9aBSaRSuJMlXrPZCqWRbon2',
      },
    });
    const mensagem = 'Nova mensagem';
    const novoPost = {
      mensagem,
      user_id: getAuth().currentUser.uid,
      nome: getAuth().currentUser.displayName,
      data: new Date(),
    };
    await criarPost(mensagem);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toEqual(expect.anything(), novoPost);
  });
});

describe('atualizar o perfil', () => {
  it('deve chamar a função updateProfile e atualizar o nome do perfil', () => {
    const nome = 'aleatorio';
    getAuth.mockReturnValueOnce(mockUser);
    atualizaPerfil(nome);
    expect(updateProfile).toHaveBeenCalledWith(undefined, {
      displayName: nome,
    });
  });
});
