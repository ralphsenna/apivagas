import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function FormCadInscricoes(props)
{   
    const [validado, setValidado] = useState(true);
    const [inscricao, setInscricao] = useState(props.inscricaoVazia);

    function manipularMudanca(evento)
    {
        const componente = evento.currentTarget;
        if (componente.name==='candidato')
            setInscricao({ ...inscricao, candidato: {codigo: componente.value}});
        else if (componente.name==='vaga')
            setInscricao({ ...inscricao, vaga: {codigo: componente.value}});
        else
            setInscricao({ ...inscricao, [componente.name]: componente.value});
    }

    function manipularSubmissao(evento)
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (!form.checkValidity())
        {
            setValidado(false);
        }
        else
        {
            setValidado(true);
            props.gravarInscricao(inscricao);
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
                        value={inscricao.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Candidato</Form.Label>
                    <Form.Select
                        required
                        id="candidato"
                        name="candidato"
                        value={inscricao.candidato.codigo}
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaCandidatos[0].codigo!=="" ?
                            (
                                <><option key={0} value={""}></option>
                                {
                                    props.listaCandidatos.map((candidato) => {
                                        return (
                                            <option key={candidato.codigo} value={candidato.codigo}>{candidato.nome}</option>
                                        )
                                    })
                                }
                                </>
                            ): <option key={0} value={""}>{props.listaCandidatos[0].nome}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, selecione o candidato.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Vaga</Form.Label>
                    <Form.Select
                        required
                        id="vaga"
                        name="vaga"
                        value={inscricao.vaga.codigo}
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaVagas[0].codigo!=="" ?
                            (
                                <><option key={0} value={""}></option>
                                {
                                    props.listaVagas.map((vaga) => {
                                        return (
                                            <option key={vaga.codigo} value={vaga.codigo}>{vaga.cargo}</option>
                                        )
                                    })
                                }
                                </>
                            ): <option key={0} value={""}>{props.listaVagas[0].nome}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, selecione a vaga.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2" >
                    <Form.Label>Data da Inscrição</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder=""
                        id="dataInscricao"
                        name="dataInscricao"
                        value={inscricao.dataInscricao}
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data da inscrição.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">Gravar</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
                props.setInscricaoAtual(props.inscricaoVazia);
            }}>Voltar</Button>
        </Form>
    );
}
