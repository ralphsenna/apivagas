import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import TabelaCandidatos from "../tabelas/TabelaCandidatos";
import FormCadCandidatos from "../formularios/FormCadCandidatos";

const urlCandidato = "http://localhost:4000/candidato";

export default function TelaCadCandidatos(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaCandidatos, setListaCandidatos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const candidatoVazio = {
        codigo: "",
        nome: "",
        ctps: "",
        dataNascimento: "",
        cpf: "",
        rg: "",
        endereco: "",
        cidade: "",
        uf: "",
        telefone: "",
        email: "",
        grauInstrucao: "",
        cursoSuperior: "",
        tituloEleitor: "",
        pis: "",
        cnh: "",
        estadoCivil: "",
        certidaoMilitar: "",        
    };
    const [candidatoAtual, setCandidatoAtual] = useState(candidatoVazio);

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

    async function gravarCandidato(candidato)
    {
        await fetch(urlCandidato, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(candidato)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + " Código do candidato: " + retorno.codigoGerado); 
                setExibirTabela(true);
                setCandidatoAtual(candidatoVazio);                  
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

    async function alterarCandidato(candidato)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setCandidatoAtual(candidato);
        }
        else
        {
            await fetch(urlCandidato, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(candidato)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setCandidatoAtual(candidatoVazio);
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

    async function excluirCandidato(candidato)
    {
        await fetch(urlCandidato, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({codigo: candidato.codigo})
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
        consultarCandidato();
    }

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Candidatos</h1>
                    <br/>
                    <h2>Lista de Candidatos</h2>
                    <Button className="mb-3" onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Novo Candidato
                    </Button>
                    <TabelaCandidatos
                        setExibirTabela={setExibirTabela} 
                        listaCandidatos={listaCandidatos} 
                        alterarCandidato={alterarCandidato} 
                        excluirCandidato={excluirCandidato}
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
        )
    }
}
