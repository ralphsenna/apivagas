import CandidatoDAO from '../Persistencia/candidatoDAO.js';

export default class Candidato
{
    #codigo
    #nome
    #ctps
    #dataNascimento
    #cpf
    #rg
    #endereco
    #cidade
    #uf
    #telefone
    #email
    #grauInstrucao
    #cursoSuperior
    #tituloEleitor
    #pis
    #cnh
    #estadoCivil
    #certidaoMilitar

    constructor(codigo=0, nome="", ctps="", dataNascimento="", cpf="", rg="", endereco="", cidade="", 
                uf="", telefone="", email="", grauInstrucao="", cursoSuperior="", tituloEleitor="", 
                pis="", cnh="", estadoCivil="", certidaoMilitar="")
    {
        this.codigo = codigo;
        this.nome = nome;
        this.ctps = ctps;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.rg = rg;
        this.endereco = endereco;
        this.cidade = cidade;
        this.uf = uf;
        this.telefone = telefone;
        this.email = email;
        this.grauInstrucao = grauInstrucao;
        this.cursoSuperior = cursoSuperior;
        this.tituloEleitor = tituloEleitor;
        this.pis = pis;
        this.cnh = cnh;
        this.estadoCivil = estadoCivil;
        this.certidaoMilitar = certidaoMilitar;
    }

    
    get codigo()
    {
        return this.#codigo;
    }
    set codigo(novoCodigo)
    {
        this.#codigo = novoCodigo;
    }

    get nome()
    {
        return this.#nome;
    }
    set nome(novoNome)
    {
        this.#nome = novoNome;
    }

    get ctps()
    {
        return this.#ctps;
    }
    set ctps(novoCtps)
    {
        this.#ctps = novoCtps;
    }

    get dataNascimento()
    {
        return this.#dataNascimento;
    }
    set dataNascimento(novaDataNascimento)
    {
        this.#dataNascimento = novaDataNascimento;
    }

    get cpf()
    {
        return this.#cpf;
    }
    set cpf(novoCpf)
    {
        this.#cpf = novoCpf;
    }

    get rg()
    {
        return this.#rg;
    }
    set rg(novoRg)
    {
        this.#rg = novoRg;
    }

    get endereco()
    {
        return this.#endereco;
    }
    set endereco(novoEndereco)
    {
        this.#endereco = novoEndereco;
    }

    get cidade()
    {
        return this.#cidade;
    }
    set cidade(novaCidade)
    {
        this.#cidade = novaCidade;
    }

    get uf()
    {
        return this.#uf;
    }
    set uf(novoUf)
    {
        this.#uf = novoUf;
    }

    get telefone()
    {
        return this.#telefone;
    }
    set telefone(novoTelefone)
    {
        this.#telefone = novoTelefone;
    }

    get email()
    {
        return this.#email;
    }
    set email(novoEmail)
    {
        this.#email = novoEmail;
    }

    get grauInstrucao()
    {
        return this.#grauInstrucao;
    }
    set grauInstrucao(novoGrauInstrucao)
    {
        this.#grauInstrucao = novoGrauInstrucao;
    }

    get cursoSuperior()
    {
        return this.#cursoSuperior;
    }
    set cursoSuperior(novoCursoSuperior)
    {
        this.#cursoSuperior = novoCursoSuperior;
    }

    get tituloEleitor()
    {
        return this.#tituloEleitor;
    }
    set tituloEleitor(novoTituloEleitor)
    {
        this.#tituloEleitor = novoTituloEleitor;
    }

    get pis()
    {
        return this.#pis;
    }
    set pis(novoPis)
    {
        this.#pis = novoPis;
    }

    get cnh()
    {
        return this.#cnh;
    }
    set cnh(novoCnh)
    {
        this.#cnh = novoCnh;
    }

    get estadoCivil()
    {
        return this.#estadoCivil;
    }
    set estadoCivil(novoEstadoCivil)
    {
        this.#estadoCivil = novoEstadoCivil;
    }

    get certidaoMilitar()
    {
        return this.#certidaoMilitar;
    }
    set certidaoMilitar(novaCertidaoMilitar)
    {
        this.#certidaoMilitar = novaCertidaoMilitar;
    }


    toJSON()
    {
        return {
            codigo: this.codigo,
            nome: this.nome,
            ctps: this.ctps,
            dataNascimento: this.dataNascimento,
            cpf: this.cpf,
            rg: this.rg,
            endereco: this.endereco,
            cidade: this.cidade,
            uf: this.uf,
            telefone: this.telefone,
            email: this.email,
            grauInstrucao: this.grauInstrucao,
            cursoSuperior: this.cursoSuperior,
            tituloEleitor: this.tituloEleitor,
            pis: this.pis,
            cnh: this.cnh,
            estadoCivil: this.estadoCivil,
            certidaoMilitar: this.certidaoMilitar
        }
    }

    async gravar()
    {
        const candidatoDAO = new CandidatoDAO();
        return candidatoDAO.gravar(this);
    }

    async consultar(termo)
    {
        const candidatoDAO = new CandidatoDAO();
        return candidatoDAO.consultar(termo);
    }

    async alterar()
    {
        const candidatoDAO = new CandidatoDAO();
        return candidatoDAO.alterar(this);
    }

    async excluir()
    {
        const candidatoDAO = new CandidatoDAO();
        return candidatoDAO.excluir(this);
    }
}
