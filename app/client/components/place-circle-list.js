import React, { Component } from 'react';
import { is } from 'immutable';
import PlaceCircle from './place-circle';

class PlaceCircleList extends Component {
  shouldComponentUpdate(nextProps) {
    return !is(this.props.nodes, nextProps.nodes);
  }

  render() {
    let placeCircles = [];

    this.props.nodes.forEach(function (node, id) {
      placeCircles.push(<PlaceCircle key={id} node={node}/>);
    });

    return <g className="place-circle-list">{placeCircles}</g>;
  }
}

export default PlaceCircleList;