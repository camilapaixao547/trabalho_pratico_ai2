import { useNavigate } from 'react-router-dom'
import { useUtilizadores } from '../../context/UtilizadoresContext'

function PainelNovosUtilizadores() {
    const navigate = useNavigate()
    const { utilizadores, loading } = useUtilizadores()

    const recentes = [...utilizadores]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)

    return (
        <div className="dash-panel mb-4">
            <h5 className="dash-panel-title">Novos Utilizadores</h5>
            {loading ? (
                <p className="text-muted mb-0">A carregar...</p>
            ) : recentes.length === 0 ? (
                <p className="text-muted mb-0">Não há utilizadores.</p>
            ) : (
                <table className="table dash-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentes.map((u) => (
                            <tr key={u.id}>
                                <td>{u.nome_cliente ?? "—"}</td>
                                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-PT') : "—"}</td>
                                <td>{u.email_cliente ?? "—"}</td>
                                <td className="text-end">
                                    <button
                                        className="dash-btn-ver-mais"
                                        onClick={() => navigate(`/backoffice/utilizadores/ver/${u.id}`)}
                                    >
                                        Ver mais
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default PainelNovosUtilizadores