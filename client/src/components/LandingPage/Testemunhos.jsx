import './Testemunhos.css'
import testemunho1 from '../../assets/images/testemunho1.jpg'
import testemunho2 from '../../assets/images/testemunho2.jpg'
import testemunho3 from '../../assets/images/testemunho3.jpg'

function Testemunhos() {
    return (
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testemunhos