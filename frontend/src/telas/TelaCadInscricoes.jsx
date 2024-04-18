import { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import BarraBusca from "../componentes/BarraBusca";
import Pagina from "../templates/Pagina";
import TabelaInscricoes from "../tabelas/TabelaInscricoes";
import FormCadInscricoes from "../formularios/FormCadInscricoes";

const urlCandidato = "http://localhost:4000/candidato";
const urlVaga = "http://localhost:4000/vaga";
const urlInscricao = "http://localhost:4000/inscricao";

export default function TelaCadInscricoes(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaCandidatos, setListaCandidatos] = useState([{
        codigo: "",
        nome: "Nenhum candidato cadastrado"
    }]);
    const [listaVagas, setListaVagas] = useState([{
        codigo: "",
        nome: "Nenhuma vaga cadastrada"
    }]);
    const [listaInscricoes, setListaInscricoes] = useState([]);
    const inscricaoVazia = {
        codigo: "",
        candidato: {},
        vaga: {},
        dataInscricao: "",
    };
    const [candidatoAtual, setCandidatoAtual] = useState({});
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

    async function consultarVaga() 
    {
        await fetch(urlVaga, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                setListaVagas(retorno.listaVagas);
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

    async function consultarInscricao(termo)
    {
        let urlBusca = urlInscricao;
        if (termo)
            urlBusca += "/" + termo;
        await fetch(urlBusca, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                setListaInscricoes(retorno.listaInscricoes);
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
        if (candidatoAtual.codigo!==undefined)
            consultarInscricao(candidatoAtual.codigo);
        if (exibirTabela)
        {
            consultarCandidato();
            consultarVaga();
        }
    }, [exibirTabela, candidatoAtual]);

    async function gravarInscricao(inscricao)
    {
        await fetch(urlInscricao, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inscricao)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                alert(retorno.mensagem + " Código da inscrição: " + retorno.codigoGerado);
                setExibirTabela(true);
                setInscricaoAtual(inscricaoVazia);
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

    async function excluirInscricao(inscricao)
    {
        await fetch(urlInscricao, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo: inscricao.codigo})
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                alert(retorno.mensagem);
            }
            else 
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
        consultarInscricao();
    }    

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Inscrições por Candidato</h1>
                    <br/>
                    <Row className="mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3>Selecione o Candidato</h3>
                        <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                            <BarraBusca style={{ width: '80%', marginRight: '20px' }}
                                placeHolder={""}
                                dados={listaCandidatos}
                                campoChave={"codigo"}
                                campoBusca={"nome"}
                                funcaoSelecao={setCandidatoAtual}
                                valor={""} 
                            />
                        </div>
                    </Row>
                    <br/>
                    <h2>Lista de Incrições do Candidato(a) "{candidatoAtual.nome}"</h2>
                    <Button className="mb-3" onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Nova Inscrição
                    </Button>
                    <br/>
                    <TabelaInscricoes
                        setExibirTabela={setExibirTabela} 
                        listaInscricoes={listaInscricoes}
                        excluirInscricao={excluirInscricao}
                    />
                </Pagina>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Incrições</h1>
                    <br/>
                    <h2>Formulário de cadastro de incrição</h2>
                    <FormCadInscricoes
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        listaCandidatos={listaCandidatos}
                        listaVagas={listaVagas}
                        gravarInscricao={gravarInscricao}
                        inscricao={inscricaoAtual}
                        setInscricaoAtual={setInscricaoAtual}
                        inscricaoVazia={inscricaoVazia}
                    />
                </Pagina>
            </div>
        )
    }
}
