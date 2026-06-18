import './Footer.css'

function Footer() {
    return (
        <footer className="footer-section bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row g-4 mb-4">
                    <div className="col-lg-4">
                        <div className="fw-bold fs-5 mb-2" style={{ color: '#4CB78C', fontFamily: 'system-ui', letterSpacing: '-0.5px' }}>
                            🐾Pantureco
                        </div>
                        <p className="text-white-50 small">
                            Dedicados ao resgate, cuidado e adoção responsável de animais. Juntos, podemos fazer a diferença na vida de cada patinha.
                        </p>
                    </div>
                    <div className="col-lg-2 col-6">
                        <h6 className="fw-bold mb-3" style={{ color: '#4CB78C' }}>Links úteis</h6>
                        <ul className="list-unstyled small">
                            <li><a href="#" className="text-white-50 text-decoration-none footer-link">Home</a></li>
                            <li><a href="#quem-somos" className="text-white-50 text-decoration-none footer-link">Sobre nós</a></li>
                            <li><a href="#como-adotar" className="text-white-50 text-decoration-none footer-link">Como Adotar</a></li>
                            <li><a href="#testemunhos" className="text-white-50 text-decoration-none footer-link">Testemunhos</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <h6 className="fw-bold mb-3" style={{ color: '#4CB78C' }}>Contactos</h6>
                        <ul className="list-unstyled small text-white-50">
                            <li>+351 987654321</li>
                            <li>pantureco@gmail.com</li>
                            <li>Rua dos Animais, 123, Viseu</li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h6 className="fw-bold mb-3" style={{ color: '#4CB78C' }}>Redes Sociais</h6>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white-50 footer-link" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="#" className="text-white-50 footer-link" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="border-secondary" />
                <div className="row align-items-center">
                    <div className="col-md-6 small text-white-50">
                        <a href="#" className="text-white-50 text-decoration-none footer-link me-3">Política de privacidade</a>
                        <a href="#" className="text-white-50 text-decoration-none footer-link me-3">Política de cookies</a>
                        <a href="#" className="text-white-50 text-decoration-none footer-link">Termos e Condições</a>
                    </div>
                    <div className="col-md-6 text-md-end small text-white-50 mt-2 mt-md-0">
                        © Copyright 2026 – Pantureco. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer