import Vaga from '../Modelo/vaga.js';

export default class VagaCtrl
{
    gravar(requisicao, resposta)
    {
        resposta.type('application/json');
        if (requisicao.method==='POST' && requisicao.is('application/json'))
        {
            const dados = requisicao.body;
            if (dados.cargo && dados.salario && dados.cidade && dados.uf && dados.quantidade)
            {
                const vaga = new Vaga(0, dados.cargo, dados.salario, dados.cidade, dados.uf, dados.quantidade);
                vaga.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "codigoGerado": vaga.codigo,
                        "mensagem": "Vaga gravada com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar vaga: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para gravação da vaga!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para gravar uma vaga!"
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
            const vaga = new Vaga();
            vaga.consultar(termo).then((listaVagas) => {
                resposta.status(200).json({
                    "status": true,
                    listaVagas
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao obter vagas: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar vagas!"
            });
        }
    }

    alterar(requisicao, resposta)
    {
        resposta.type('application/json');
        if ((requisicao.method==='PUT') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            if (dados.codigo, dados.cargo && dados.salario && dados.cidade && dados.uf && dados.quantidade)
            {
                const vaga = new Vaga(dados.codigo, dados.cargo, dados.salario, dados.cidade, dados.uf, dados.quantidade);
                vaga.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga alterada com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar vaga: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para a alteração da vaga!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método PUT para alterar a vaga!"
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
                const vaga = new Vaga(dados.codigo);
                vaga.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga excluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir vaga: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da vaga a ser excluída!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir a vaga!"
            });
        }
    }
}
