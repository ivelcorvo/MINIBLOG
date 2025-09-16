import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

const About = () => {

  const {user} = useAuth();

  return (
    <div>
        <h1 className="text-3xl">Mini<strong>Blog</strong></h1>
        <div className="text-start">
          <section className="my-10">
            <p>O Mini Blog é uma aplicação web desenvolvida em React, pensada para simular uma plataforma simples de publicação de artigos. O projeto utiliza React Router para navegação entre páginas, Hooks e Context API para gerenciamento de estado local e global, garantindo uma experiência dinâmica e responsiva.</p>
            <p>O sistema é integrado ao Firebase, permitindo autenticação de usuários (cadastro, login e logout) e armazenamento de posts em tempo real. Cada usuário pode criar, editar e excluir seus próprios artigos com segurança.</p>
            <p>A interface é estilizada com TailwindCSS, proporcionando um layout moderno, limpo e totalmente responsivo, ideal para dispositivos móveis e desktop.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Funcionalidades principais:</h2>
            <ul className="list-disc space-y-2 p-10">
              <li>Cadastro, login e logout de usuários com Firebase Authentication.</li>
              <li>Criação, edição e exclusão de posts.</li>
              <li>Listagem de artigos com navegação entre páginas.</li>
              <li>Estados globais gerenciados com Context API.</li>
              <li>Uso de Hooks para manipulação de dados e efeitos colaterais.</li>
              <li>Layout responsivo e estilizado com TailwindCSS.</li>
            </ul>
          </section >
          <section className="my-10">
            <Link to={user?"/post/create":"/login"} className="text-gray-200 bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded-xl shadow-md">Criar Post</Link>
          </section>
        </div>
    </div>
  )
}

export default About