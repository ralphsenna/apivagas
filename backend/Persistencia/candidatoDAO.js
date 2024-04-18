import Candidato from '../Modelo/candidato.js';
import conectar from './conexao.js'; 

export default class CandidatoDAO
{
    async gravar(candidato)
    {
        if (candidato instanceof Candidato)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Candidato (can_nome, can_ctps, can_data_nascimento, can_cpf, 
                             can_rg, can_endereco, can_cidade, can_uf, can_telefone, can_email, 
                             can_grau_instrucao, can_curso_superior, can_titulo_eleitor, can_pis, 
                             can_cnh, can_estado_civil, can_certidao_militar) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const parametros = [candidato.nome, candidato.ctps, candidato.dataNascimento, candidato.cpf,
                                    candidato.rg, candidato.endereco, candidato.cidade, candidato.uf, 
                                    candidato.telefone, candidato.email, candidato.grauInstrucao,
                                    candidato.cursoSuperior, candidato.tituloEleitor, candidato.pis,
                                    candidato.cnh, candidato.estadoCivil, candidato.certidaoMilitar];
                const retorno = await conexao.execute(sql, parametros);
                candidato.codigo = retorno[0].insertId;
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
            sql = "SELECT * FROM Candidato WHERE can_codigo = ?";
            parametros = [parametroConsulta];
        }
        else
        {
            sql = "SELECT * FROM Candidato WHERE can_codigo LIKE ?";
            parametros = ["%" + parametroConsulta + "%"];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaCandidatos = [];
        for (const registro of registros)
        {
            registro.can_data_nascimento = registro.can_data_nascimento.toISOString().split('T')[0];
            const candidato = new Candidato(registro.can_codigo, registro.can_nome, registro.can_ctps, registro.can_data_nascimento,
                                            registro.can_cpf, registro.can_rg, registro.can_endereco, registro.can_cidade,
                                            registro.can_uf, registro.can_telefone, registro.can_email, registro.can_grau_instrucao,
                                            registro.can_curso_superior, registro.can_titulo_eleitor, registro.can_pis,
                                            registro.can_cnh, registro.can_estado_civil, registro.can_certidao_militar);
            listaCandidatos.push(candidato);
        }
        conexao.release();
        return listaCandidatos;
    }

    async alterar(candidato)
    {
        if (candidato instanceof Candidato)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE Candidato SET can_nome = ?, can_ctps = ?, can_data_nascimento = ?, 
                             can_cpf = ?, can_rg = ?, can_endereco = ?, can_cidade = ?, can_uf = ?, 
                             can_telefone = ?, can_email = ?, can_grau_instrucao = ?, can_curso_superior = ?, 
                             can_titulo_eleitor = ?, can_pis = ?, can_cnh = ?, can_estado_civil = ?, 
                             can_certidao_militar = ? WHERE can_codigo = ?`;
                const parametros = [candidato.nome, candidato.ctps, candidato.dataNascimento, candidato.cpf,
                                    candidato.rg, candidato.endereco, candidato.cidade, candidato.uf,
                                    candidato.telefone, candidato.email, candidato.grauInstrucao,
                                    candidato.cursoSuperior, candidato.tituloEleitor, candidato.pis,
                                    candidato.cnh, candidato.estadoCivil, candidato.certidaoMilitar, candidato.codigo];
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

    async excluir(candidato)
    {
        if (candidato instanceof Candidato)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = "DELETE FROM Candidato WHERE can_codigo = ?";
                const parametros = [candidato.codigo];
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
