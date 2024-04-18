import Inscricao from "../Modelo/inscricao.js";

export default class InscricaoCtrl
{
    gravar(requisicao, resposta)
    {
        resposta.type('application/json');
        if (requisicao.method==='POST' && requisicao.is('application/json'))
        {
            const dados = requisicao.body;
            if (dados.candidato && dados.vaga && dados.dataInscricao)
            {
                const inscricao = new Inscricao(0, dados.candidato, dados.vaga, dados.dataInscricao);
                inscricao.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "codigoGerado": inscricao.codigo,
                        "mensagem": "Inscrição gravada com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao realizar inscrição: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para completar a inscrição!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para realizar uma inscrição!"
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
            const inscricao = new Inscricao();
            inscricao.consultar(termo).then((listaInscricoes) => {
                resposta.status(200).json({
                    "status": true,
                    listaInscricoes
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar inscrições: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar inscrições!"
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
                const inscricao = new Inscricao(dados.codigo);
                inscricao.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição excluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir inscrição: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da inscrição a ser excluída!"
                });
            }
        }
    }
}
