import React from 'react';
import './../assets/scss/main.scss';
import VisitsList from './VisitsList';
import Cabecera from './Cabecera';
import Filter from './Filter';
import VisitBig from './VisitBig';
import {visits} from "./../assets/mock.data.js";
import moment from 'moment';

const styleVisitList = {
    float: "left",
    width: "38%",
    height: "90%",
    marginTop: "10px",
};

const styleVisitBig = {
    float: "right",
    width: "59%",
    height: "82%",
    marginTop: "10px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "lightGrey",
    padding: "10px",
    overflowY: "scroll",
};

const styleFilter = {
    borderColor: 'lightGrey',
    borderWidth: '2px',
    borderStyle: 'solid',
    width: '99.65%',
    display: 'inlineBlock',
    float: 'left',
};
let visitsReal = [];

let params = "";

function prueba() {
    params = location.search.slice(1, location.search.length);
    params = '&' + params;
    console.log(params);
}
// prueba();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visit: "",
            visits: visitsReal,
            dateAfter: moment(),
            dateBefore: moment(),
            favourite: false,
        };
        this.visitClick = this.visitClick.bind(this);
        this.didReceiveData = this.didReceiveData.bind(this);
        this.favAppClick = this.favAppClick.bind(this);
        this.favouriteAppClicked = this.favouriteAppClicked.bind(this);
        this.searchApp = this.searchApp.bind(this);
        this.dateAfterChangedApp = this.dateAfterChangedApp.bind(this);
        this.dateBeforeChangedApp = this.dateBeforeChangedApp.bind(this);
    }

    didReceiveData(visitsParam) {
        this.setState({
            visit: "",
            visits: visitsParam,
        });
    }

    visitClick(visita) {
        this.setState({
            visit: visita,
            visits: visitsReal,
        });
    }

    favouriteAppClicked() {
        this.setState({
            favourite: !this.state.favourite,
        });
    }

    favAppClick(visita) {
        let id = visita.id;
        let url = "";
        let reqPut = new XMLHttpRequest();
        let idAux;
        let visitsAux;
        if (visita.favourite) {
            url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/" + id + "?token=ea014460d8c1df1805b7&_method=delete";
        } else {
            url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/" + id + "?token=ea014460d8c1df1805b7&_method=put";
        }
        reqPut.onreadystatechange = () => {
            if(reqPut.readyState === 4) {
                if(reqPut.status === 200) {
                    // console.log(this.state.visits);
                    visita.favourite = !visita.favourite;
                    idAux = this.state.visits.findIndex((element)=>{return element.id === visita.id;});
                    visitsAux = this.state.visits;
                    visitsAux[idAux] = visita;
                    this.setState({
                        visit: visita,
                        visits: visitsAux,
                    });
                } else {
                    console.log("Error: ", reqPut.status);
                }
            }
        };
        reqPut.open('GET', url);
        reqPut.send();
    }

    searchApp(query) {
        let req = new XMLHttpRequest();
        let url = "https://dcrmt.herokuapp.com/api/visits/flattened?token=ea014460d8c1df1805b7" + query;
        req.onreadystatechange = () => {
            if(req.readyState === 4) {
                if(req.status === 200) {
                    console.log("Se reciben las visitas");
                    visitsReal = JSON.parse(req.response);
                    this.didReceiveData(JSON.parse(req.response));
                } else {
                    this.didReceiveData("");
                    console.log("Error: " + req.status);
                }
            }
        };
        req.open('GET', url);
        req.send(null);
        console.log('Buscar desde app');
    }

    dateAfterChangedApp(date) {
        console.log("En app after: ", date);
        this.setState({
            dateAfter: date,
        });
    }

    dateBeforeChangedApp(date) {
        console.log("En app before: ", date);
        this.setState({
            dateBefore: date,
        });
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <Cabecera/>
                <div style={styleFilter}>
                    <Filter dateAfter={this.state.dateAfter} dateBefore={this.state.dateBefore} favourite={this.state.favourite} favouriteClicked={this.favouriteAppClicked} search={this.searchApp} dateAfterChanged={this.dateAfterChangedApp} dateBeforeChanged={this.dateBeforeChangedApp}/>
                </div>
                <div style={styleVisitList}>
                    <VisitsList visits={this.state.visits} visitClick={this.visitClick}/>
                </div>
                <div style={styleVisitBig}>
                    <VisitBig visit={this.state.visit} favClick={this.favAppClick} tabIndex="0"/>
                </div>
            </div>
        );
    }

}

