import React from 'react';
import './../assets/scss/main.scss';
import VisitsList from './VisitsList';
import Cabecera from './Cabecera';
import Filter from './Filter';
import VisitBig from './VisitBig';
import {visits} from "./../assets/mock.data.js";
import { connect } from 'react-redux';
import { searchApp, favouriteAppClicked, visitClick, dateAfterChanged, dateBeforeChanged } from './../reducers/actions';
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

function mapStateToProps(state) {
    return {
        visit: state.visit,
        visits: state.visits,
        dateAfter: state.dateAfter,
        dateBefore: state.dateBefore,
        favourite: state.favourite,
    };
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.visitClick = this.visitClick.bind(this);
        this.favAppClick = this.favAppClick.bind(this);
        this.favouriteAppClicked = this.favouriteAppClicked.bind(this);
        this.searchApp = this.searchApp.bind(this);
        this.dateAfterChangedApp = this.dateAfterChangedApp.bind(this);
        this.dateBeforeChangedApp = this.dateBeforeChangedApp.bind(this);
    }

    visitClick(visita) {
        this.props.dispatch(visitClick(visita));
    }

    favouriteAppClicked() {
        this.props.dispatch(favouriteAppClicked(!this.props.favourite));
    }

    favAppClick(visita) {
        let reqPut = new XMLHttpRequest();
        let url = "";
        if (visita.favourite) {
            url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/" + visita.id + "?token=ea014460d8c1df1805b7&_method=delete";
        } else {
            url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/" + visita.id + "?token=ea014460d8c1df1805b7&_method=put";
        }
        reqPut.onreadystatechange = () => {
            if(reqPut.readyState === 4) {
                if(reqPut.status === 200) {
                    console.log("Visita cambiada en CRM");
                } else {
                    console.log("Error en la descarga");
                }
            }
        };
        reqPut.open('GET', url);
        reqPut.send();
        let visitAux = JSON.parse(JSON.stringify(visita));
        visitAux.favourite = !visitAux.favourite;
        let idAux = this.props.visits.findIndex((element)=>{return element.id === visita.id;});
        let visitsAux = JSON.parse(JSON.stringify(this.props.visits));
        visitsAux[idAux] = visitAux;
        this.props.dispatch(visitClick(visitAux));
        this.props.dispatch(searchApp(visitsAux));
    }

    searchApp(query) {
        let url = "https://dcrmt.herokuapp.com/api/visits/flattened?token=ea014460d8c1df1805b7" + query;
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4) {
                if(req.status === 200) {
                    this.props.dispatch(searchApp(JSON.parse(req.response)));
                }
                else {
                    console.log("Error en la descarga");
                }
            }
        };
        req.open('GET', url);
        req.send(null);
    }

    dateAfterChangedApp(date) {
        this.props.dispatch(dateAfterChanged(date));
    }

    dateBeforeChangedApp(date) {
        this.props.dispatch(dateBeforeChanged(date));
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <Cabecera/>
                <div style={styleFilter}>
                    <Filter store={this.props.store} dateAfter={this.props.dateAfter} dateBefore={this.props.dateBefore} favourite={this.props.favourite} favouriteClicked={this.favouriteAppClicked} search={this.searchApp} dateAfterChanged={this.dateAfterChangedApp} dateBeforeChanged={this.dateBeforeChangedApp}/>
                </div>
                <div style={styleVisitList}>
                    <VisitsList store={this.props.store} visits={this.props.visits} visitClick={this.visitClick}/>
                </div>
                <div style={styleVisitBig}>
                    <VisitBig store={this.props.store} visit={this.props.visit} favClick={this.favAppClick} tabIndex="0"/>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps)(App);
