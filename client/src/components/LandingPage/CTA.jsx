import { Link } from 'react-router-dom'
import './CTA.css'

function CTA() {
    return (
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
    )
}

export default CTA