function CardsEstatisticas({ stats }) {
    return (
        <div className="row g-3 mb-4">
            <div className="col-md-4">
                <div className="dash-card">
                    <div className="dash-card-icon dash-icon-green">🐾</div>
                    <div>
                        <p className="dash-card-label">Adoções Concluídas</p>
                        <p className="dash-card-value">{stats.adocoesConcluidas}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="dash-card">
                    <div className="dash-card-icon dash-icon-mint">📋</div>
                    <div>
                        <p className="dash-card-label">Anúncios Ativos</p>
                        <p className="dash-card-value">{stats.anunciosAtivos}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="dash-card">
                    <div className="dash-card-icon dash-icon-yellow">📄</div>
                    <div>
                        <p className="dash-card-label">Formulários Pendentes</p>
                        <p className="dash-card-value">{stats.formulariosPendentes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardsEstatisticas