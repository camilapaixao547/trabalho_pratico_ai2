function About() {
    return (
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
    )
}

export default About