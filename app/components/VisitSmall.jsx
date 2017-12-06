import React from 'react';

const visitSmallStyle = {
    width: "100%",
    textAlign: "left",
    fontSize: 15,
    borderRadius: "0px"
}

export default class VisitSmall extends React.Component {
    constructor(props) {
        super(props);
        this.visitSmallClick = this.visitSmallClick.bind(this);
    }
    visitSmallClick() {
        this.props.visitListClick(this.props.visit);
    }
    render() {
        console.log(this.props.visit);
        return(
            <div key={"id"+ this.props.visit.id}>
                <button style={visitSmallStyle} onClick={this.visitSmallClick}> Visita número: {this.props.visit.id}
                <br/>Planificada para el: {this.props.visit.plannedFor.slice(0,10)}
                <br/>Realizada el: {this.props.visit.fulfilledAt === null ? "Pendiente" : this.props.visit.fulfilledAt.slice(0,10)}
                <br/>Cliente: {((this.props.visit.Customer.name === null) || (this.props.visit.Customer.name === "")) ? "No especificado" : this.props.visit.Customer.name}
                <br/>Vendedor: {this.props.visit.Salesman.fullname} </button>
            </div>
        );
    }
}