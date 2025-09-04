import "./About.css";
import GraceCAbudi from "../../images/perfil-foto.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about__overlay">
        <img className="about__author" alt="Author" src={GraceCAbudi} />
        <div className="about__content-overlay">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            Renato Soares Pereira, 30 anos, natural de Goiânia, sou um Desenvolvedor
             Web Full Stack com formação pela TripleTen, onde adquiri experiência prática 
             em tecnologias modernas de desenvolvimento front-end e back-end.
          </p>
          <p className="about__description">
            Ao longo do curso, desenvolvi habilidades sólidas em:

Front-end: React, JavaScript (ES6+), HTML5 semântico, CSS3 com metodologia BEM, Flexbox, 
Grid e criação de interfaces responsivas.

Back-end: Node.js, Express, MongoDB, autenticação JWT, validação de dados, e implantação de 
APIs RESTful.

Ferramentas e boas práticas: Controle de versão com Git, ESLint, deploy em servidores, 
configuração de ambiente com variáveis de ambiente, e desenvolvimento seguindo princípios 
de clean code e arquitetura escalável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
