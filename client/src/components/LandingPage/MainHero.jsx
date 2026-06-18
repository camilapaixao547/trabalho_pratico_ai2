import { Link } from 'react-router-dom'
import heroImg from '../../assets/images/hero.jpg'
import './MainHero.css'

function MainHero() {
    return (
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
    )
}

export default MainHero