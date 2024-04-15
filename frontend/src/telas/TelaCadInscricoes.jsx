import { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import BarraBusca from "../componentes/BarraBusca";
import Pagina from "../templates/Pagina";

const urlCandidato = "http://localhost:4000/candidato";
const urlInscricao = "http://localhost:4000/inscricao";

export default function TelaCadInscricoes(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaCandidatos, setListaCandidatos] = useState([]);
    const [listaIncricoes, setListaIncricoes] = useState([]);
    //const [atualizando, setAtualizando] = useState(false);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
    const inscricaoVazia = {
        codigo: "",
        candidato: {},
        vaga: {},
        dataInscricao: "",
    };
    const [inscricaoAtual, setInscricaoAtual] = useState(inscricaoVazia);

    async function consultarCandidato() 
    {
        await fetch(urlCandidato, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                setListaCandidatos(retorno.listaCandidatos);
            }
            else 
            {
                alert(retorno.mensagem); 
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
    }
    useEffect(() => {
        if (exibirTabela)
            consultarCandidato();
    }, [exibirTabela]);

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Inscricoes por Candidato</h1>
                    <br/>
                    <Form.Group as={Col} md="3">
                        <h3>Selecione o Candidato</h3>
                        <BarraBusca campoBusca={"nome"}
                            campoChave={"codigo"}
                            dados={listaCandidatos}
                            funcaoSelecao={candidatoSelecionado}
                            placeHolder={"Selecione um cliente"}
                            valor={""} 
                        />
                    </Form.Group>
                    <br/>
                    <h3>Lista de Inscrições</h3>
                    <Button className="mb-3" onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Inciar Nova Inscrição
                    </Button>
                    {/* <TabelaCandidatos
                        setExibirTabela={setExibirTabela} 
                        listaCandidatos={listaCandidatos} 
                        alterarCandidato={alterarCandidato} 
                        excluirCandidato={excluirCandidato}
                    /> */}
                </Pagina>
            </div>
        )
    }
    else 
    {
        /* return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Candidatos</h1>
                    <br/>
                    <h2>Formulário de cadastro de Candidatos</h2>
                    <FormCadCandidatos
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        gravarCandidato={gravarCandidato}
                        alterarCandidato={alterarCandidato}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        candidato={candidatoAtual}
                        setCandidatoAtual={setCandidatoAtual}
                        candidatoVazio={candidatoVazio}
                    />
                </Pagina>
            </div>
        ) */
    }
}
