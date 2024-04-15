import Candidato from '../Modelo/candidato.js';

export default class CandidatoCtrl
{
    gravar(requisicao, resposta)
    {
        resposta.type('application/json');
        if (requisicao.method==='POST' && requisicao.is('application/json'))
        {
            const dados = requisicao.body;
            if (dados.nome && dados.ctps && dados.dataNascimento && dados.cpf && dados.rg &&
                dados.endereco && dados.cidade && dados.uf && dados.telefone && dados.email &&
                dados.grauInstrucao && dados.tituloEleitor && dados.pis && dados.cnh && 
                dados.estadoCivil && dados.certidaoMilitar)
            {
                const candidato = new Candidato(0, dados.nome, dados.ctps, dados.dataNascimento, dados.cpf,
                                                dados.rg, dados.endereco, dados.cidade, dados.uf, 
                                                dados.telefone, dados.email,dados.grauInstrucao,
                                                dados.cursoSuperior, dados.tituloEleitor, dados.pis, 
                                                dados.cnh, dados.estadoCivil, dados.certidaoMilitar);
                candidato.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "codigoGerado": candidato.codigo,
                        "mensagem": "Candidato gravado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar candidato: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para gravação do candidato!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para gravar um candidato!"
            });
        }
    }

    consultar(requisicao, resposta) 
    {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo)
            termo = "";
        if (requisicao.method==="GET")
        {
            const candidato = new Candidato();
            candidato.consultar(termo).then((listaCandidatos) => {
                resposta.status(200).json({
                    "status": true,
                    listaCandidatos
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao obter candidatos: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar candidatos!"
            });
        }
    }

    alterar(requisicao, resposta)
    {
        resposta.type('application/json');
        if ((requisicao.method==='PUT') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            if (dados.codigo, dados.nome && dados.ctps && dados.dataNascimento && dados.cpf && 
                dados.rg && dados.endereco && dados.cidade && dados.uf && dados.telefone && 
                dados.email && dados.grauInstrucao && dados.tituloEleitor && dados.pis && 
                dados.cnh && dados.estadoCivil && dados.certidaoMilitar)
            {
                const candidato = new Candidato(dados.codigo, dados.nome, dados.ctps, dados.dataNascimento,
                                                dados.cpf, dados.rg, dados.endereco, dados.cidade, dados.uf, 
                                                dados.telefone, dados.email,dados.grauInstrucao,
                                                dados.cursoSuperior, dados.tituloEleitor, dados.pis, 
                                                dados.cnh, dados.estadoCivil, dados.certidaoMilitar);
                candidato.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato alterado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar candidato: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para a alteração do candidato!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método PUT para alterar o candidato!"
            });
        }
    }

    excluir(requisicao, resposta)
    {
        resposta.type('application/json');
        if ((requisicao.method==='DELETE') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            if (dados.codigo) 
            {
                const candidato = new Candidato(dados.codigo);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir candidato: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do candidato a ser excluído!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir o candidato!"
            });
        }
    }
}
