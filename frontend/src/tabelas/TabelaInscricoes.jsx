import { Button, Table } from "react-bootstrap";

export default function TabelaInscricoes(props)
{
    return (
        <div>
            <h1>Tabela de Incriçõess</h1>
            <br/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Candidato</th>
                        <th>Vaga</th>
                        <th>Data de Inscricao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaIncricoes.map((inscricao) => 
                        {
                            return (
                                <tr key={inscricao.codigo}>
                                    <td>{inscricao.codigo}</td>
                                    <td>{inscricao.candidato.nome}</td>
                                    <td>{inscricao.vaga.nome}</td>
                                    <td>{inscricao.dataInscricao}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => {
                                            if (window.confirm("Deseja realmente excluir a incricao do candidato " + inscricao.candidato.nome + " para vaga de " + inscricao.vaga.nome + "?"))
                                                props.excluirInscricao(inscricao)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}
