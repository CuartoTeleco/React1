import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
const titleStyle = {
    textAlign: "center",
    paddingTop: '5px',
    paddingBottom: "5px",
};

export default class Cabecera extends React.Component {
    render() {
        return (
          <Panel bsStyle="info" style={titleStyle}>
            <h1 style={titleStyle}>CRM</h1>
          </Panel>
        );
    }
}
