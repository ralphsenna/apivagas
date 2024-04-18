import { Router } from 'express';
import InscricaoCtrl from '../Controle/inscricaoCtrl.js';

const rotaInscricao = new Router();
const inscricaoCtrl = new InscricaoCtrl();

rotaInscricao
.post('/', inscricaoCtrl.gravar)
.get('/:termo', inscricaoCtrl.consultar)
.get('/', inscricaoCtrl.consultar)
.delete('/', inscricaoCtrl.excluir)

export default rotaInscricao;
