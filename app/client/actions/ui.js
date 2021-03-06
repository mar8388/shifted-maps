import without from 'lodash/array/without';
import moment from 'moment';
import trackEvent from '../services/track-event';
import { startGraph, stopGraph } from './graph';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const CHANGE_TIME_SPAN = 'CHANGE_TIME_SPAN';
export const HOVER_PLACE = 'HOVER_PLACE';
export const CLOSE_INTERACTION_OVERLAY = 'CLOSE_INTERACTION_OVERLAY';

export function changeView(view) {
  return function(dispatch) {
    trackEvent('ui', 'change', 'view', view);

    dispatch({ type: CHANGE_VIEW, view });
    dispatch(stopGraph());
    dispatch(startGraph());
  };
}

export function changeTimeSpan(timeSpan) {
  return function(dispatch) {
    let [ start, end ] = timeSpan;

    dispatch(stopGraph());
    dispatch(startGraph());

    trackEvent('ui', 'filter', 'time span', moment(start).format('YYYY-MM-DD') + '-' + moment(end).format('YYYY-MM-DD'));

    dispatch({ type: CHANGE_TIME_SPAN, timeSpan });
  }
}

export function hoverPlace(placeId, hover) {
  return { type: HOVER_PLACE, placeId, hover };
}

export function closeInteractionOverlay() {
  return { type: CLOSE_INTERACTION_OVERLAY };
}