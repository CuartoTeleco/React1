import React from 'react';
const styleColIzda = {
    float: "left",
    width: "45%"
}

const styleColDcha = {
    float: "right",
    width: "45%"
}

const styleGeneral = {
    float: "left",
    width: "90%"
}
export default class VisitBig extends React.Component {
    render() {
        if (this.props.visit === "") {
            return (
                <div>
                    Seleccione una visita.
                </div>
            );
        } else {
            let targets = this.props.visit.Targets.map((target) => {
                return (
                    <div key={"id"+target.id}>
                        <p>
                            <b> {target.TargetType.name} </b> {target.success === true ? "Realizado" : "No realizado"}
                            <br/> <b>Comentarios:</b> {target.notes}
                            <br/> <b>Compañía:</b> {target.Company.name}
                            <br/> <b>Web:</b> {((target.Company.web1 === null) || (target.Company.web1 === "")) ? "No especificado" : target.Company.web1}
                        </p>
                    </div>
                )
            })
            console.log(this.props.visit.Targets);
            return (
                <div>
                    <h3> Información general de la visita </h3>
                    <p> <b>Planificada para el:</b> {this.props.visit.plannedFor.slice(0,10)} 
                    <br/> <b>Realizada el:</b> {((this.props.visit.fulfilledAt === null) || (this.props.visit.fulfilledAt === "")) ? "Pendiente" : this.props.visit.fulfilledAt.slice(0,10)} </p>
                    <div style={styleColIzda}>
                        <h3> Cliente </h3>
                        <p> <b>Nombre:</b> {this.props.visit.Customer.name}
                        <br/> <b>Teléfono:</b> {this.props.visit.Customer.phone1}
                        <br/> <b>Dirección:</b> {this.props.visit.Customer.address1}
                        <br/> <b>Ciudad:</b> {this.props.visit.Customer.city} </p>
                    </div>
                    <div style={styleColDcha}>
                        <h3> Vendedor </h3>
                        <p> <b>Nombre:</b> {this.props.visit.Salesman.fullname} 
                        <br/> <b>Teléfono:</b> {((this.props.visit.Salesman.phone1 === null) || (this.props.visit.Salesman.phone1 === "")) ? "No especificado" :  this.props.visit.Salesman.phone1}
                        <br/> <b>Email:</b> {((this.props.visit.Salesman.email1 === null) || (this.props.visit.Salesman.email1 === "")) ? "No especificado" : this.props.visit.Salesman.email1}</p>
                    </div>
                    <div style={styleGeneral}>
                        <h3> Objetivos </h3>
                        {targets}
                    </div>

                </div>
            );
        }
    }
}