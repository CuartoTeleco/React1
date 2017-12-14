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
        //console.log(this.props.visit);
        this.props.visitListClick(this.props.visit);
    }
    render() {
        return(
            <div key={"id"+ this.props.visit.id}>
                <button style={visitSmallStyle} onClick={this.visitSmallClick}> 
                    <img style={{float: "right", height: "50px", width: "50px"}} src={this.props.visit.favourite ? "./../assets/images/fav.png" : "./../assets/images/notFav.png"}></img>
                    <b>Visita número:</b> {this.props.visit.id}
                    <br/><b>Planificada para el:</b> {this.props.visit.plannedFor.slice(0,10)}
                    <br/><b>Realizada el:</b> {this.props.visit.fulfilledAt === null ? "Pendiente" : this.props.visit.fulfilledAt.slice(0,10)}
                    <br/><b>Cliente:</b> {((this.props.visit.Customer.name === null) || (this.props.visit.Customer.name === "")) ? "No especificado" : this.props.visit.Customer.name}
                    <br/><b>Vendedor:</b> {this.props.visit.Salesman.fullname} 
                </button>
            </div>
        );
    }
}