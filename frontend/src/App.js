import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaMenu from './telas/TelaMenu';
import TelaCadCandidato from './telas/TelaCadCandidatos';
import TelaCadVaga from './telas/TelaCadVagas';
import TelaCadInscricao from './telas/TelaCadInscricoes';
import Tela404 from './telas/Tela404';

function App() 
{
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TelaMenu/>}/>
					<Route path="/candidato" element={<TelaCadCandidato/>}/>
					<Route path="/vaga" element={<TelaCadVaga/>}/>
					<Route path="/inscricao" element={<TelaCadInscricao/>}/>
					<Route path="*" element={<Tela404/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
