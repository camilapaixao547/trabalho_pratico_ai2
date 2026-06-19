import { useNavigate } from 'react-router-dom'
import { useFormularios } from '../../context/FormulariosContext'

function PainelNovosFormularios() {
    const navigate = useNavigate()
    const { formularios, loading, marcarComoVisto } = useFormularios()

    const handleVerMais = (id) => {
        marcarComoVisto(id)
        navigate(`/backoffice/adocoes/${id}`)
    }

    // 4 formulários mais recentes não lidos
    const recentes = [...formularios]
        .filter((f) => !f.formulario_lido)
        .sort((a, b) => new Date(b.data_formulario) - new Date(a.data_formulario))
        .slice(0, 4)

    return (
        <div className="dash-panel mb-4">
            <h5 className="dash-panel-title">Novos Formulários</h5>
            {loading ? (
                <p className="text-muted mb-0">A carregar...</p>
            ) : recentes.length === 0 ? (
                <p className="text-muted mb-0">Não há formulários por ver.</p>
            ) : (
                <table className="table dash-table">
                    <thead>
                        <tr>
                            <th>Candidato</th>
                            <th>Animal</th>
                            <th>Data</th>
                            <th>Motivação</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentes.map((f) => (
                            <tr key={f.id_formulario}>
                                <td>{f.User?.nome_cliente ?? "—"}</td>
                                <td>{f.Animal?.nome_animal ?? "—"}</td>
                                <td>{f.data_formulario ?? "—"}</td>
                                <td style={{ maxWidth: 200 }}>
                                    {(f.formulario_descricao?.length ?? 0) > 50
                                        ? f.formulario_descricao.substring(0, 50) + "…"
                                        : f.formulario_descricao ?? "—"}
                                </td>
                                <td className="text-end">
                                    <button
                                        className="dash-btn-ver-mais"
                                        onClick={() => handleVerMais(f.id_formulario)}
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

export default PainelNovosFormularios