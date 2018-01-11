import React from 'react';
const styleColIzda = {
    float: "left",
    width: "30%",
};

const styleColDcha = {
    float: "right",
    width: "60%",
};

const styleGeneral = {
    float: "left",
    width: "90%",
};

export default class VisitBig extends React.Component {
    constructor(props) {
        super(props);
        this.favClick = this.favClick.bind(this);
    }

    favClick() {
        console.log("Componente: ", this.props.visit.id);
        this.props.favClick(this.props.visit);
    }

    render() {
        let vista;
        if (this.props.visit === "") {
            vista = "Seleccione una visita";
        } else {
            let targets = this.props.visit.Targets.map((target) => {
                return (
                    <div key={"id" + target.id}>
                        <p>
                            <strong> {target.TargetType.name} </strong> {target.success === true ? "Realizado" : "No realizado"}
                            <br/> <strong>Comentarios:</strong> {target.notes === "" ? "No especificado" : target.notes}
                            <br/> <strong>Compañía:</strong> {target.Company.name === "" ? "No especificado" : target.Company.name}
                            <br/> <strong>Web:</strong> {((target.Company.web1 === null) || (target.Company.web1 === "")) ? "No especificado" : target.Company.web1}
                        </p>
                    </div>
                );
            });
            vista =
                <div>
                    <button style={{display: "inLine", border: "none", float: "right"}} onClick={this.favClick}>
                        <img style={{height: "80px", width: "80px"}} alt={this.props.visit.favourite ? "Hacer favorita" : "Hacer no favorita"} src={this.props.visit.favourite ? "./../assets/images/fav.png" : "./../assets/images/notFav.png"}/>
                    </button>
                    <h3> Información general de la visita </h3>
                    <p> <strong>Planificada para el:</strong> {this.props.visit.plannedFor.slice(0, 10)}
                    <br/> <strong>Realizada el:</strong> {((this.props.visit.fulfilledAt === null) || (this.props.visit.fulfilledAt === "")) ? "Pendiente" : this.props.visit.fulfilledAt.slice(0, 10)} </p>
                    <div style={styleColIzda}>
                        <h3> Cliente </h3>
                        <p> <strong>Nombre:</strong> {this.props.visit.Customer.name}
                        <br/> <strong>Teléfono:</strong> {this.props.visit.Customer.phone1}
                        <br/> <strong>Dirección:</strong> {this.props.visit.Customer.address1}
                        <br/> <strong>Ciudad:</strong> {this.props.visit.Customer.city} </p>
                    </div>
                    <div style={styleColDcha}>
                        <img style = {{float: "right", height: "160px"}} alt="Foto del vendedor" src={this.props.visit.Salesman.Photo.url}/>
                        <h3> Vendedor </h3>
                        <div>
                            <p> <strong>Nombre:</strong> {this.props.visit.Salesman.fullname}
                            <br/> <strong>Teléfono:</strong> {((this.props.visit.Salesman.phone1 === null) || (this.props.visit.Salesman.phone1 === "")) ? "No especificado" : this.props.visit.Salesman.phone1}
                            <br/> <strong>Email:</strong> {((this.props.visit.Salesman.email1 === null) || (this.props.visit.Salesman.email1 === "")) ? "No especificado" : this.props.visit.Salesman.email1}</p>
                        </div>
                    </div>
                    <div style={styleGeneral}>
                        <h3> Objetivos </h3>
                        <div id="objetivos">
                            {(targets.length === 0) ? "No especificado" : targets}
                        </div>
                    </div>

                </div>;
        }
        return(
            <div>
                {vista}
            </div>
        );
    }
}
