const Footer = () => {
  return (
    <footer className="bg-gray-800 py-3 px-3 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 Levi Alves Junior - Todos os direitos reservados</p>
        <div className="mx-auto md:mx-0 mt-5 md:mt-0" >
          <a href="https://www.linkedin.com/in/levi-alves-junior-09b91a189/" target="_blank"  className="m-2">
            <i className="fa-brands fa-linkedin fa-2x"></i>
          </a>
          <a href="https://github.com/ivelcorvo" target="_blank"  className="m-2">
            <i className="fa-brands fa-github fa-2x"></i>
          </a>
        </div>
    </footer>    
  )
}

export default Footer