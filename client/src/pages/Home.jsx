import { Link } from 'react-router-dom'
import heroImg from '../assets/images/hero.jpg'
import testemunho1 from '../assets/images/testemunho1.jpg'
import testemunho2 from '../assets/images/testemunho2.jpg'
import testemunho3 from '../assets/images/testemunho3.jpg'


function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section bg-cream py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h1 className="hero-title mb-3">
                Encontra o teu<br />
                <span className="text-gradient">companheiro de vida</span>
              </h1>
              <p className="hero-subtitle text-muted mb-4">
                Adota com segurança, confiança e amor. Entra na plataforma e encontra o teu companheiro de vida.
              </p>
              <Link to="/login" className="btn btn-pantureco btn-lg">
                Começar →
              </Link>
            </div>
            <div className="col-lg-6">
              <img
                src={heroImg}
                alt="Cão e gato juntos"
                className="img-fluid rounded-4 shadow hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="py-5 bg-white">
        <div className="container text-center">
          <span className="section-eyebrow">A NOSSA MISSÃO</span>
          <h2 className="section-title mb-2">Quem somos</h2>
          <p className="section-subtitle text-muted mb-5">
            Somos uma associação dedicada ao resgate, cuidado e adoção responsável de animais.
          </p>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="value-card card-green h-100 p-4 rounded-4">
                <div className="value-icon mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#4CB78C" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h5 className="fw-bold mb-2">Amor e Cuidado</h5>
                <p className="text-muted small">
                  Cada animal recebe todo o carinho, tratamento veterinário e atenção necessária enquanto espera pela sua família.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card card-lime h-100 p-4 rounded-4">
                <div className="value-icon mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#4CB78C" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h5 className="fw-bold mb-2">Comunidade Unida</h5>
                <p className="text-muted small">
                  Contamos com voluntários dedicados e uma comunidade apaixonada por animais que nos ajudam diariamente.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card card-orange h-100 p-4 rounded-4">
                <div className="value-icon mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#E0B84D" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h5 className="fw-bold mb-2">Adoção Responsável</h5>
                <p className="text-muted small">
                  Garantimos que cada adoção seja feita de forma responsável, com acompanhamento e orientação completa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO ADOTAR */}
      <section id="como-adotar" className="py-5 bg-cream">
        <div className="container text-center">
          <span className="section-eyebrow">PASSO A PASSO</span>
          <h2 className="section-title mb-2">Como Adotar</h2>
          <p className="section-subtitle text-muted mb-5">
            O processo de adoção é simples e pensado para garantir o bem-estar tanto do animal quanto da família adotante.
          </p>
          <div className="row g-4">
            {[
              {
                num: '01',
                title: 'Escolha seu Amigo',
                desc: 'Navegue pelos nossos anúncios e conheça os animais disponíveis para adoção. Veja fotos, características e histórias.',
              },
              {
                num: '02',
                title: 'Preencha o Formulário',
                desc: 'Complete nosso formulário de adoção com suas informações. Queremos garantir que você e o animal sejam compatíveis.',
              },
              {
                num: '03',
                title: 'Visita e Entrevista',
                desc: 'Agende uma visita para conhecer o animal pessoalmente. Nossa equipe fará uma breve entrevista para conhecer sua família.',
              },
              {
                num: '04',
                title: 'Leve para Casa',
                desc: 'Após aprovação, assine o termo de adoção e leve seu novo melhor amigo para casa. Oferecemos suporte contínuo!',
              },
            ].map((step) => (
              <div className="col-md-3 col-sm-6" key={step.num}>
                <div className="step-card bg-white rounded-4 p-4 h-100 text-start shadow-sm">
                  <span className="step-number">{step.num}</span>
                  <h6 className="fw-bold mt-3 mb-2">{step.title}</h6>
                  <p className="text-muted small mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTEMUNHOS */}
      <section id="testemunhos" className="py-5 bg-white">
        <div className="container text-center">
          <span className="section-eyebrow">QUEM JÁ ADOTOU</span>
          <h2 className="section-title mb-5">Histórias de Sucesso</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="testimonial-card rounded-4 overflow-hidden shadow-sm h-100">
                <img src={testemunho1} alt="Testemunho" className="w-100 testimonial-img" />
                <div className="p-4 text-start">
                  <p className="small text-muted mb-3">
                    "Adotar a Luna foi a melhor decisão que tomámos! A equipa foi super atenciosa e ajudou em todo o processo."
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-circle bg-success text-white">M</div>
                    <div>
                      <div className="fw-bold small">Maria Silva</div>
                      <div className="text-muted" style={{ fontSize: '12px' }}>Adotou a Luna</div>
                    </div>
                    <div className="ms-auto text-warning small">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card rounded-4 overflow-hidden shadow-sm h-100">
                <img src={testemunho2} alt="Testemunho" className="w-100 testimonial-img" />
                <div className="p-4 text-start">
                  <p className="small text-muted mb-3">
                    "O Max chegou à minha vida e trouxe muita alegria! O processo foi transparente e a associação preocupou-se genuinamente."
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-circle bg-success text-white">J</div>
                    <div>
                      <div className="fw-bold small">João Santos</div>
                      <div className="text-muted" style={{ fontSize: '12px' }}>Adotou o Max</div>
                    </div>
                    <div className="ms-auto text-warning small">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card rounded-4 overflow-hidden shadow-sm h-100">
                <div className="testimonial-img-placeholder d-flex align-items-center justify-content-center bg-light">
                <img src={testemunho3} alt="Testemunho" className="w-100 testimonial-img" />
                </div>
                <div className="p-4 text-start">
                  <p className="small text-muted mb-3">
                    "A Mia era tímida no início, mas com o amor e o suporte da equipa, ela adaptou-se perfeitamente. Sou muito grata!"
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-circle bg-warning text-white">A</div>
                    <div>
                      <div className="fw-bold small">Ana Costa</div>
                      <div className="text-muted" style={{ fontSize: '12px' }}>Adotou a Mia</div>
                    </div>
                    <div className="ms-auto text-warning small">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <div className="container text-center py-3">
          <h2 className="cta-title text-white mb-2">Pronto para fazer a diferença?</h2>
          <p className="text-white opacity-75 mb-4">
            Comece sua jornada de adoção hoje e transforme duas vidas: a tua e a de um animal.
          </p>
          <Link to="/login" className="btn btn-cta btn-lg">
            Começar →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
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
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="text-white-50 footer-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
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
    </>
  )
}

export default Home
