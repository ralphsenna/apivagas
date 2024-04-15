import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function FormCadVagas(props)
{
    const [validado, setValidado] = useState(true);
    const [vaga, setVaga] = useState(props.vaga);

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setVaga({ ...vaga, [componente.name]: componente.value});
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
                props.gravarVaga(vaga);
            else
                props.alterarVaga(vaga);
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
                        value={vaga.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        id="cargo"
                        name="cargo"
                        value={vaga.cargo}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o cargo.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="1">
                    <Form.Label>Salário</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="R$"
                        id="salario"
                        name="salario"
                        value={vaga.salario}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o salário.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        id="cidade"
                        name="cidade"
                        value={vaga.cidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a cidade.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="1">
                    <Form.Label>UF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        id="uf"
                        name="uf"
                        value={vaga.uf}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o UF.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="1">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder=""
                        id="quantidade"
                        name="quantidade"
                        value={vaga.quantidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a quantidade.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">
                {props.atualizando ? 'Alterar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setVagaAtual(props.vagaVazia);
            }}>Voltar</Button>
        </Form>
    );
}
