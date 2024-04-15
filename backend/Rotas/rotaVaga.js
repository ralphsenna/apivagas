import { Router } from 'express';
import VagaCtrl from '../Controle/vagaCtrl.js';

const rotaVaga = new Router();
const vagaCtrl = new VagaCtrl();

rotaVaga
.post('/', vagaCtrl.gravar)
.get('/:termo', vagaCtrl.consultar)
.get('/', vagaCtrl.consultar)
.put('/', vagaCtrl.alterar)
.delete('/', vagaCtrl.excluir)

export default rotaVaga;
