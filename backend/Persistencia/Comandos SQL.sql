CREATE TABLE Candidato(
    can_codigo INT PRIMARY KEY AUTO_INCREMENT,
    can_nome VARCHAR(100) NOT NULL,
    can_ctps VARCHAR(12) NOT NULL,
    can_data_nascimento DATE NOT NULL,
    can_cpf VARCHAR(14) NOT NULL,
    can_rg VARCHAR(12) NOT NULL,
    can_endereco VARCHAR(100) NOT NULL,
    can_cidade VARCHAR(50) NOT NULL,
    can_uf VARCHAR(2) NOT NULL,
    can_telefone VARCHAR(15) NOT NULL,
    can_email VARCHAR(100) NOT NULL,
    can_grau_instrucao VARCHAR(50) NOT NULL,
    can_curso_superior VARCHAR(50),
    can_titulo_eleitor VARCHAR(12) NOT NULL,
    can_pis VARCHAR(14) NOT NULL,
    can_cnh VARCHAR(11) NOT NULL,
    can_estado_civil VARCHAR(20) NOT NULL,
    can_certidao_militar VARCHAR(15) NOT NULL
);

CREATE TABLE Vaga(
    vaga_codigo INT PRIMARY KEY AUTO_INCREMENT,
    vaga_cargo VARCHAR(50) NOT NULL,
    vaga_salario DECIMAL(10,2) NOT NULL,
    vaga_cidade VARCHAR(50) NOT NULL,
    vaga_uf VARCHAR(2) NOT NULL,
    vaga_quantidade INT NOT NULL
);

CREATE TABLE Cadidato_Vaga(
    ins_codigo INT AUTO_INCREMENT,
    can_codigo INT,
    vaga_codigo INT,
    ins_data DATE NOT NULL,
    PRIMARY KEY(ins_codigo, can_codigo, vaga_codigo),
    FOREIGN KEY(can_codigo) REFERENCES Candidato(can_codigo),
    FOREIGN KEY(vaga_codigo) REFERENCES Vaga(vaga_codigo)
);
