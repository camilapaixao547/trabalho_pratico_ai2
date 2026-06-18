function Adotar() {
    return (
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
                            desc: 'Agende uma visita para conhecer o animal pessoalmente. A nossa equipa fará uma breve entrevista para conhecer a sua família.',
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
    )
}

export default Adotar