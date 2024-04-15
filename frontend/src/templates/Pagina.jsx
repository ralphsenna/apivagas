import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) 
{
    return (
        <div>
            <Cabecalho texto="Sistema de Candidatura para Vagas"/>
            <Menu />
            <Container fluid style={{padding: '0 50px'}}>{props.children}</Container>
        </div>
    )
}
