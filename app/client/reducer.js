import { combineReducers } from 'redux';
import connections from './reducers/connections';
import places from './reducers/places';
import scales from './reducers/scales';
import vis from './reducers/vis';
import tiles from './reducers/tiles';
import map from './reducers/map';

export default combineReducers({ scales, vis, tiles, connections, places, map });