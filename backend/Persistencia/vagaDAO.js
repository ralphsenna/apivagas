import Vaga from '../Modelo/vaga.js';
import conectar from './conexao.js';

export default class VagaDAO
{
    async gravar(vaga)
    {
        if (vaga instanceof Vaga)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Vaga (vaga_cargo, vaga_salario, vaga_cidade, vaga_uf, vaga_quantidade) 
                             VALUES (?, ?, ?, ?, ?)`;
                const parametros = [vaga.cargo, vaga.salario, vaga.cidade, vaga.uf, vaga.quantidade];
                const retorno = await conexao.execute(sql, parametros);
                vaga.codigo = retorno[0].insertId;
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
            sql = "SELECT * FROM Vaga WHERE vaga_codigo = ?";
            parametros = [parametroConsulta];
        }
        else
        {
            sql = "SELECT * FROM Vaga WHERE vaga_cargo LIKE ?";
            parametros = ["%" + parametroConsulta + "%"];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaVagas = [];
        for (const registro of registros)
        {
            const vaga = new Vaga(registro.vaga_codigo, registro.vaga_cargo, registro.vaga_salario, registro.vaga_cidade, registro.vaga_uf, registro.vaga_quantidade);
            listaVagas.push(vaga);
        }
        return listaVagas;
    }

    async alterar(vaga)
    {
        if (vaga instanceof Vaga)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE Vaga SET vaga_cargo = ?, vaga_salario = ?, vaga_cidade = ?, vaga_uf = ?, vaga_quantidade = ? WHERE vaga_codigo = ?`;
                const parametros = [vaga.cargo, vaga.salario, vaga.cidade, vaga.uf, vaga.quantidade, vaga.codigo];
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

    async excluir(vaga)
    {
        const conexao = await conectar();
        await conexao.beginTransaction();
        try
        {
            const sql = "DELETE FROM Vaga WHERE vaga_codigo = ?";
            const parametros = [vaga.codigo];
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
