import Inscricao from "../Modelo/inscricao.js";
import Candidato from "../Modelo/candidato.js";
import Vaga from "../Modelo/vaga.js";
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
                const sql = `INSERT INTO Inscricao (can_codigo, vaga_codigo, ins_data)
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
            sql = `SELECT * FROM Inscricao i
                   INNER JOIN Candidato c ON i.can_codigo = c.can_codigo
                   INNER JOIN Vaga v ON i.vaga_codigo = v.vaga_codigo
                   WHERE i.can_codigo = ?
                   ORDER BY i.ins_data`;
            parametros = [parametroConsulta];
        }
        else
        {
            sql = `SELECT * FROM Inscricao i
                   INNER JOIN Candidato c ON i.can_codigo = c.can_codigo
                   INNER JOIN Vaga v ON i.vaga_codigo = v.vaga_codigo
                   WHERE i.ins_data LIKE ?
                   ORDER BY i.ins_data`;
            parametros = ["%" + parametroConsulta + "%"];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaInscricoes = [];
        for (const registro of registros)
        {
            registro.ins_data = registro.ins_data.toISOString().split('T')[0];
            const candidato = new Candidato(registro.can_codigo, registro.can_nome);
            const vaga = new Vaga(registro.vaga_codigo, registro.vaga_cargo);
            const inscricao = new Inscricao(registro.ins_codigo, candidato, vaga, registro.ins_data);
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
