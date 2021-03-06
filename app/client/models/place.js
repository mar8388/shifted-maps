import { Record, List } from 'immutable';

export default Record({
  id: null,
  location: null,
  name: null,
  placeType: null,
  duration: 0,
  frequency: 0,
  stays: List(),
  radius: 0,
  strokeWidth: 0,
  //point: null,
  visible: false,
  tileURL: null,
  hover: false,
  rank: 0,
  cluster: false
});