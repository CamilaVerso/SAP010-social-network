import './infopage.css';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';

import githubicon from '../imagens/icones/githubicon.png';
import linkedin from '../imagens/icones/linkedin.png';
import voltar from '../imagens/icones/voltar.png';

export default () => {
  const containerInfopage = document.createElement('section');
  containerInfopage.classList.add('container-infopage');

  const templateInfopage = `
    <a href="#feed" class="img-voltar" id="iconeVoltar"><img src=${voltar} alt="icone voltar" title="Ícone para Voltar"></a>

    <section class="info-devs">
        <p class="texto2 espaco">Terceiro projeto desenvolvido para o Bootcamp Laboratoria - Turma SAP010 <br> com o
            objetivo de pôr em prática e aferir as habilidades das alunas:</p>
        <br>

        <div class="dev-info dev-item dev-icons">
            <div class="info">
                <p class="texto2">Camila Gonçalves</p>

                <a href="https://github.com/CamilaVerso/" target="_blank">
                    <img id="githubCamila" class="linkedin espaco" src=${githubicon}
                        alt="logo para o perfil do GitHub da desenvolvedora Camila Gonçalves"
                        title="GitHub Camila Gonçalves">
                </a>
                <a href="https://www.linkedin.com/in/camilanpgoncalves/" target="_blank">
                    <img id="linkedinCamila" class="linkedin" src=${linkedin}
                        alt="logo para o perfil do Linkedin da desenvolvedora Camila Gonçalves"
                        title="Linkedin Camila Gonçalves">
                </a>

            </div>
            <br>
            <div class="info">
                <p class="texto2">Diulianne Oliveira</p>
                <a href="https://github.com/Diulianne/" target="_blank">
                    <img id="githubDiulianne" class="linkedin espaco" src=${githubicon}
                        alt="logo para o perfil do GitHub da desenvolvedora Diulianne Oliveira"
                        title="GitHub Diulianne Oliveira">
                </a>
                <a href="https://www.linkedin.com/in/diulianneoliveira/" target="_blank">
                    <img id="linkedinDiulianne" class="linkedin" src=${linkedin}
                        alt="logo para o perfil do Linkedin da desenvolvedora Diulianne Oliveira"
                        title="Linkedin Diulianne Oliveira">
                </a>

            </div>
            <br>
            <div class="info">
                <p class="texto2">Marianna Esteves</p>
                <a href="https://github.com/maristvs" target="_blank">
                    <img id="githubMarianna" class="linkedin espaco" src=${githubicon}
                        alt="logo para o perfil do GitHub da desenvolvedora Marianna Esteves"
                        title="GitHub Marianna Esteves">
                </a>
                <a href="https://www.linkedin.com/in/marianna-esteves-43bb6a274/" target="_blank">
                    <img id="linkedinMarianna" class="linkedin" src=${linkedin}
                        alt="logo para o perfil do Linkedin da desenvolvedora Marianna Esteves"
                        title="Linkedin Marianna Esteves">
                </a>
            </div>

        </div>

        <p class="texto2 espaco"> Entre em contato conosco nas redes sociais acima. </p>
        <br>
        <p class="texto2">Para mais informações sobre o tema:</p>
        <a href="https://www.msdmanuals.com/pt-br/casa/assuntos-especiais/suplementos-alimentares-e-vitaminas/canabidiol-cbd"
            target="_blank">Manual de Saúde para Família MSD</a>
        <a href="https://abraceesperanca.org.br" target="_blank"> Associação Brasileira de Apoio Cannabis Esperança </a>
        <a href="https://www.gov.br/pt-br/servicos/solicitar-autorizacao-para-importacao-excepcional-de-produtos-a-base-de-canabidiol"
            target="_blank"> Manual de importação ANVISA (Governo Brasileiro)</a>
        <img class="img-CBD1" src=${CBD} alt="logo app">

    `;

  containerInfopage.innerHTML = templateInfopage;

  return containerInfopage;
};
