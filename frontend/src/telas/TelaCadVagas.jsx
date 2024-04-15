import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import TabelaVagas from "../tabelas/TabelaVagas";
import FormCadVagas from "../formularios/FormCadVagas";

const urlVaga = "http://localhost:4000/vaga";

export default function TelaCadVagas(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaVagas, setListaVagas] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const vagaVazia = {
        codigo: "",
        cargo: "",
        salario: "",
        cidade: "",
        uf: "",
        quantidade: ""
    };
    const [vagaAtual, setVagaAtual] = useState(vagaVazia);

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
    useEffect(() => {
        if (exibirTabela)
            consultarVaga();
    }, [exibirTabela]);

    async function gravarVaga(vaga)
    {
        await fetch(urlVaga, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(vaga)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + " Código da vaga: " + retorno.codigoGerado); 
                setExibirTabela(true);
                setVagaAtual(vagaVazia);                  
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

    async function alterarVaga(vaga)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setVagaAtual(vaga);
        }
        else
        {
            await fetch(urlVaga, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(vaga)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setVagaAtual(vagaVazia);
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
    }

    async function excluirVaga(vaga)
    {
        await fetch(urlVaga, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({codigo: vaga.codigo})
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
        consultarVaga();
    }

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Vagas</h1>
                    <br/>
                    <h2>Lista de Vagas</h2>
                    <Button className="mb-3" onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Nova Vaga
                    </Button>
                    <TabelaVagas
                        setExibirTabela={setExibirTabela}
                        listaVagas={listaVagas}
                        alterarVaga={alterarVaga}
                        excluirVaga={excluirVaga}
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
                    <h1>Tela de Cadastro de Vagas</h1>
                    <br/>
                    <h2>Formulário de cadastro de Vagas</h2>
                    <FormCadVagas
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        gravarVaga={gravarVaga}
                        alterarVaga={alterarVaga}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        vaga={vagaAtual}
                        setVagaAtual={setVagaAtual}
                        vagaVazia={vagaVazia}
                    />
                </Pagina>
            </div>
        )
    }
}
