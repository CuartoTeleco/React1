import React from 'react';
import VisitSmall from './VisitSmall';
import { connect } from 'react-redux';

const styleVisitsList = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "lightGrey",
};

export default class VisitsList extends React.Component {
    constructor(props) {
        super(props);
        this.visitListClick = this.visitListClick.bind(this);
    }
    visitListClick(visita) {
        this.props.visitClick(visita);
    }
    render() {
        let visitList;
        if (this.props.visits.length === 0) {
            visitList = <p style= {{marginLeft: "5px"}}>No hay visitas con las opciones seleccionadas...</p>;
        } else {
            visitList = this.props.visits.map((visit) => {
                return (
                    <div key={"id" + visit.id} style={styleVisitsList}>
                        <VisitSmall visit={visit} visitListClick={this.visitListClick}/>
                    </div>
                );
            });
        }
        return (
            <div style={{overflowY: "auto", height: "100%"}}>
                {visitList}
            </div>
        );
    }
}
