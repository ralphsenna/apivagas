import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function FormCadCandidatos(props)
{
    const [validado, setValidado] = useState(true);
    const [candidato, setCandidato] = useState(props.candidato);

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        if (evento.target.type==='radio')
        {
            setCandidato(prevState => ({
                ...prevState,
                [componente.name]: componente.value,
            }));
        }
        else
            setCandidato({ ...candidato, [componente.name]: componente.value});
    }

    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (!form.checkValidity())
            setValidado(false);
        else
        {
            setValidado(true);
            if (!props.atualizando)
                props.gravarCandidato(candidato);
            else
                props.alterarCandidato(candidato);
        }
    }

    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="1">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        disabled
                        type="number"
                        placeholder=""
                        id="codigo"
                        name="codigo"
                        value={candidato.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="7">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome Completo"
                        id="nome"
                        name="nome"
                        value={candidato.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o nome do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>CTPS</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CTPS"
                        id="ctps"
                        name="ctps"
                        value={candidato.ctps}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a CTPS do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CPF"
                        id="cpf"
                        name="cpf"
                        value={candidato.cpf}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CPF do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>RG</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="RG"
                        id="rg"
                        name="rg"
                        value={candidato.rg}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o RG do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" >
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control 
                        required 
                        type="date" 
                        placeholder="" 
                        id="dataNascimento"
                        name="dataNascimento"
                        value={candidato.dataNascimento}
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data de nascimento do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço"
                        id="endereco"
                        name="endereco"
                        value={candidato.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o endereço do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Cidade"
                        id="cidade"
                        name="cidade"
                        value={candidato.cidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a cidade do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="1">
                    <Form.Label>UF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="UF"
                        id="uf"
                        name="uf"
                        value={candidato.uf}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o UF do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Telefone"
                        id="telefone"
                        name="telefone"
                        value={candidato.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o telefone do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="E-mail"
                        id="email"
                        name="email"
                        value={candidato.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o e-mail do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Label>Grau de Instrução</Form.Label>
                <Col md="2">
                    <Form.Label>Ensino Fundamental</Form.Label>
                    <Form.Check
                        required
                        type="radio"
                        id="ensinoFundamentalCompleto"
                        name="grauInstrucao"
                        label="Completo"
                        value="Ensino Fundamental Completo"
                        checked={candidato.grauInstrucao==="Ensino Fundamental Completo"}
                        onChange={manipularMudanca}
                    />
                    <Form.Check
                        required
                        type="radio"
                        id="ensinoFundamentalIncompleto"
                        name="grauInstrucao"
                        label="Incompleto"
                        value="Ensino Fundamental Incompleto"
                        checked={candidato.grauInstrucao==="Ensino Fundamental Incompleto"}
                        onChange={manipularMudanca}
                    />
                </Col>
                <Col md="2">
                    <Form.Label>Ensino Médio</Form.Label>
                    <Form.Check
                        required
                        type="radio"
                        id="ensinoMedioCompleto"
                        name="grauInstrucao"
                        label="Completo"
                        value="Ensino Médio Completo"
                        checked={candidato.grauInstrucao==="Ensino Médio Completo"}
                        onChange={manipularMudanca}
                    />
                    <Form.Check
                        required
                        type="radio"
                        id="ensinoMedioIncompleto"
                        name="grauInstrucao"
                        label="Incompleto"
                        value="Ensino Médio Incompleto"
                        checked={candidato.grauInstrucao==="Ensino Médio Incompleto"}
                        onChange={manipularMudanca}
                    />
                </Col>
                <Col md="2">
                    <Form.Label>Ensino Superior</Form.Label>
                    <Form.Check
                        required
                        type="radio"
                        id="ensinoSuperiorCompleto"
                        name="grauInstrucao"
                        label="Completo"
                        value="Ensino Superior Completo"
                        checked={candidato.grauInstrucao==="Ensino Superior Completo"}
                        onChange={manipularMudanca}
                    />
                    <Form.Check
                        required
                        type="radio"
                        id="ensinoSuperiorIncompleto"
                        name="grauInstrucao"
                        label="Incompleto"
                        value="Ensino Superior Incompleto"
                        checked={candidato.grauInstrucao==="Ensino Superior Incompleto"}
                        onChange={manipularMudanca}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Curso Superior</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Curso Superior (Se houver)"
                        id="cursoSuperior"
                        name="cursoSuperior"
                        value={candidato.cursoSuperior}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o curso superior do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Título de Eleitor</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Título de Eleitor"
                        id="tituloEleitor"
                        name="tituloEleitor"
                        value={candidato.tituloEleitor}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o título de eleitor do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>PIS</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="PIS"
                        id="pis"
                        name="pis"
                        value={candidato.pis}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o PIS do candidato.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>CNH</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CNH"
                        id="cnh"
                        name="cnh"
                        value={candidato.cnh}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a CNH do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Label>Estado Civil</Form.Label>
                <Col md="2">
                    <Form.Check
                        required
                        type="radio"
                        id="casado"
                        name="estadoCivil"
                        label="Casado(a)"
                        value="Casado(a)"
                        checked={candidato.estadoCivil==="Casado(a)"}
                        onChange={manipularMudanca}
                    />
                </Col>
                <Col md="2">
                    <Form.Check
                        required
                        type="radio"
                        id="solteiro"
                        name="estadoCivil"
                        label="Solteiro(a)"
                        value="Solteiro(a)"
                        checked={candidato.estadoCivil==="Solteiro(a)"}
                        onChange={manipularMudanca}
                    />
                </Col>
                <Col md="2">
                    <Form.Check
                        required
                        type="radio"
                        id="divorciado"
                        name="estadoCivil"
                        label="Divorciado(a)"
                        value="Divorciado(a)"
                        checked={candidato.estadoCivil==="Divorciado(a)"}
                        onChange={manipularMudanca}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Certidão Militar</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Certidão Militar"
                        id="certidaoMilitar"
                        name="certidaoMilitar"
                        value={candidato.certidaoMilitar}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a certidão militar do candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">
                {props.atualizando ? 'Alterar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setCandidatoAtual(props.candidatoVazio);
            }}>Voltar</Button>
        </Form>
    );
}
