import { Button, Table } from "react-bootstrap";

export default function TabelaCandidatos(props) 
{
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CTPS</th>
                        <th>Data de Nascimento</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Grau de Instrução</th>
                        <th>Curso Superior</th>
                        <th>Título de Eleitor</th>
                        <th>PIS</th>
                        <th>CNH</th>
                        <th>Estado Civil</th>
                        <th>Certidão Militar</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaCandidatos?.map((candidato) => {
                            return (
                                <tr key={candidato.codigo}>
                                    <td>{candidato.codigo}</td>
                                    <td>{candidato.nome}</td>
                                    <td>{candidato.ctps}</td>
                                    <td>{candidato.dataNascimento.split('-').reverse().join('/')}</td>
                                    <td>{candidato.cpf}</td>
                                    <td>{candidato.rg}</td>
                                    <td>{candidato.endereco}</td>
                                    <td>{candidato.cidade}</td>
                                    <td>{candidato.uf}</td>
                                    <td>{candidato.telefone}</td>
                                    <td>{candidato.email}</td>
                                    <td>{candidato.grauInstrucao}</td>
                                    <td>{candidato.cursoSuperior}</td>
                                    <td>{candidato.tituloEleitor}</td>
                                    <td>{candidato.pis}</td>
                                    <td>{candidato.cnh}</td>
                                    <td>{candidato.estadoCivil}</td>
                                    <td>{candidato.certidaoMilitar}</td>
                                    <td>
                                        <Button variant="primary" style={{marginRight:'5px'}} onClick={() => {props.alterarCandidato(candidato)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </Button>
                                        <Button variant="danger" onClick={() => {
                                            if (window.confirm("Deseja realmente excluir o candidato " + candidato.nome + "?"))
                                                props.excluirCandidato(candidato)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </Button>
                                    </td>	
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
