import { Router } from 'express';
import CandidatoCtrl from '../Controle/candidatoCtrl.js';

const rotaCandidato = new Router();
const candidatoCtrl = new CandidatoCtrl();

rotaCandidato
.post('/', candidatoCtrl.gravar)
.get('/:termo', candidatoCtrl.consultar)
.get('/', candidatoCtrl.consultar)
.put('/', candidatoCtrl.alterar)
.delete('/', candidatoCtrl.excluir)

export default rotaCandidato;
