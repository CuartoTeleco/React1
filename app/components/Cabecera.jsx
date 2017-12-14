import React from 'react';
import { Panel } from 'react-bootstrap';
const titleStyle = {
    textAlign: "center",
    paddingBottom: "5px"
}
const title = (
  <h3 style={titleStyle}>CRM</h3>
);

export default class Cabecera extends React.Component {
    render() {
        return (
          <Panel header={title} bsStyle="info" style={titleStyle}>
            {this.props.texto}
          </Panel>
        );
    }
}