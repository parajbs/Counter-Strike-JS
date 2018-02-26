/**
 * Created by Vadym Yatsyuk on 25.02.18
 */
import { mat4 } from 'gl-matrix';
// import * as glMatrix from '../lib/gl-matrix';
// const mat4 = glMatrix.mat4;
import { Map } from './Map';

export type GameInfoType = { gl: any, player: any, map: Map, mvMatrix: mat4, pMatrix: mat4 };

export const GameInfo: GameInfoType = {
  gl: null,
  player: null,
  map: null,
  mvMatrix: mat4.create(),
  pMatrix: mat4.create()
};
