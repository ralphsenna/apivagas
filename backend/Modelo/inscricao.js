import InscricaoDAO from "../Persistencia/inscricaoDAO.js"

export default class Inscricao
{
    #codigo
    #candidato
    #vaga
    #dataInscricao

    constructor(codigo=0, candidato={}, vaga={}, dataInscricao="")
    {
        this.codigo = codigo;
        this.candidato = candidato;
        this.vaga = vaga;
        this.dataInscricao = dataInscricao;
    }


    get codigo()
    {
        return this.#codigo;
    }
    set codigo(novoCodigo)
    {
        this.#codigo = novoCodigo;
    }

    get candidato()
    {
        return this.#candidato;
    }
    set candidato(novoCandidato)
    {
        this.#candidato = novoCandidato;
    }

    get vaga()
    {
        return this.#vaga;
    }
    set vaga(novaVaga)
    {
        this.#vaga = novaVaga;
    }

    get dataInscricao()
    {
        return this.#dataInscricao;
    }
    set dataInscricao(novaDataInscricao)
    {
        this.#dataInscricao = novaDataInscricao;
    }


    toJSON()
    {
        return {
            codigo: this.codigo,
            candidato: this.candidato,
            vaga: this.vaga,
            dataInscricao: this.dataInscricao
        };
    }

    async gravar()
    {
        const inscricaoDAO = new InscricaoDAO();
        return await inscricaoDAO.gravar(this);
    }

    async consultar(termo)
    {
        const inscricaoDAO = new InscricaoDAO();
        return await inscricaoDAO.consultar(termo);
    }

    async excluir()
    {
        const inscricaoDAO = new InscricaoDAO();
        return await inscricaoDAO.excluir(this);
    }
}
