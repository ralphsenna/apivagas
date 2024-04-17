import Inscricao from "../Modelo/inscricao.js";
import conectar from './conexao.js';

export default class InscricaoDAO
{
    async gravar(inscricao)
    {
        if (inscricao instanceof Inscricao)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Inscricao (can_codigo, vag_codigo, ins_data)
                             VALUES (?, ?, ?)`;
                const parametros = [inscricao.candidato.codigo, inscricao.vaga.codigo, inscricao.dataInscricao];
                const retorno = await conexao.execute(sql, parametros);
                inscricao.codigo = retorno[0].insertId;
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }
    
    async consultar(parametroConsulta)
    {
        let parametros = [];
        let sql = "";
        if (!isNaN(parseInt(parametroConsulta)))
        {
            sql = "SELECT * FROM Inscricao WHERE can_codigo = ?";
            parametros = [parametroConsulta];
        }
        else
        {
            sql = "SELECT * FROM Inscricao WHERE ins_data LIKE ?";
            parametros = ["%" + parametroConsulta + "%"];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaInscricoes = [];
        for (const registro of registros)
        {
            const inscricao = new Inscricao(registro.ins_codigo, registro.can_codigo, registro.vag_codigo, registro.ins_data);
            listaInscricoes.push(inscricao);
        }
        return listaInscricoes;
    }

    async excluir(inscricao)
    {
        if (inscricao instanceof Inscricao)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = "DELETE FROM Inscricao WHERE ins_codigo = ?";
                const parametros = [inscricao.codigo];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }
}
