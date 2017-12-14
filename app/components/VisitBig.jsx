import React from 'react';
const styleColIzda = {
    float: "left",
    width: "30%"
}

const styleColDcha = {
    float: "right",
    width: "60%"
}

const styleGeneral = {
    float: "left",
    width: "90%"
}
export default class VisitBig extends React.Component {
    constructor(props) {
        super(props);
        this.favClick = this.favClick.bind(this);
    }

    favClick() {
        console.log("Componente: ",this.props.visit.id);
        this.props.favClick(this.props.visit);
    }

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
                            <br/> <b>Comentarios:</b> {target.notes === "" ? "No especificado" : target.notes}
                            <br/> <b>Compañía:</b> {target.Company.name === "" ? "No especificado" : target.Company.name}
                            <br/> <b>Web:</b> {((target.Company.web1 === null) || (target.Company.web1 === "")) ? "No especificado" : target.Company.web1}
                        </p>
                    </div>
                )
            })
            return (
                <div>
                    <button style={{display: "inLine", border: "none", float: "right"}} onClick={this.favClick}>
                        <img style={{height: "80px", width: "80px"}} src={this.props.visit.favourite ? "./../assets/images/fav.png" : "./../assets/images/notFav.png"}></img>
                    </button>
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
                        <img style = {{float: "right", height: "160px"}} src={this.props.visit.Salesman.Photo.url}></img>
                        <h3> Vendedor </h3>                    
                        <div>
                            <p> <b>Nombre:</b> {this.props.visit.Salesman.fullname} 
                            <br/> <b>Teléfono:</b> {((this.props.visit.Salesman.phone1 === null) || (this.props.visit.Salesman.phone1 === "")) ? "No especificado" :  this.props.visit.Salesman.phone1}
                            <br/> <b>Email:</b> {((this.props.visit.Salesman.email1 === null) || (this.props.visit.Salesman.email1 === "")) ? "No especificado" : this.props.visit.Salesman.email1}</p>
                        </div>
                    </div>
                    <div style={styleGeneral}>
                        <h3> Objetivos </h3>
                        <div id="objetivos">
                            {(targets.length === 0)? "No especificado" : targets}
                        </div>
                    </div>

                </div>
            );
        }
    }
}