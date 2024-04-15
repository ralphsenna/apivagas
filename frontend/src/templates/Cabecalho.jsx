import { Alert } from "react-bootstrap";

export default function Cabecalho(props)
{
    return (
        <div>
            <Alert variant="light" className="text-center"><h1>{props?.texto}</h1></Alert>
        </div>
    );
}
