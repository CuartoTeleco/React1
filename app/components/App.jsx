import React from 'react';
import './../assets/scss/main.scss';
import VisitsList from './VisitsList';
import Cabecera from './Cabecera';
import VisitBig from './VisitBig';
import {visits} from "./../assets/mock.data.js";

const styleVisitList = {
  float: "left",
  width: "38%",
  height: "90%",
  marginTop: "10px"
}

const styleVisitBig = {
  float: "right",
  width: "59%",
  height: "82%",
  marginTop: "10px",
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "lightGrey",
  padding: "10px",
  overflowY: "scroll"
}

var visitsReal = [];

var req = new XMLHttpRequest();
var params = "";

function prueba () {
  params = location.search.slice(1,location.search.length);
  params = '&'+params;
  console.log(params);
}
prueba();


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: "",
      visits: visitsReal,
      texto: "Visita seleccionada: "
    }
    this.visitClick = this.visitClick.bind(this);
    this.didReceiveData = this.didReceiveData.bind(this);
    this.favAppClick = this.favAppClick.bind(this);
  }

  componentDidMount() {
    var url = "https://dcrmt.herokuapp.com/api/visits/flattened?token=ea014460d8c1df1805b7"+params;
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          visitsReal = JSON.parse(req.response);
          this.didReceiveData(JSON.parse(req.response));
        } else {
          console.log("Error: "+req.status);
        }
      }
    }
    req.open('GET', url);
    req.send(null);
  }

  didReceiveData(visits) {
    //console.log(visits[0].Salesman.Photo.url);
    this.setState({
      visit: "",
      visits: visits,
      texto: "Visita seleccionada: "
    })
  }

  visitClick(visita) {
    this.setState({
      visit: visita,
      visits: visitsReal,
      texto: "Visita seleccionada: "+visita.id
    });
  }

  favAppClick(visita) {
    var id = visita.id;
    console.log("app: ", id);
    var url = "";
    if (visita.favourite) {
      url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/"+id+"?token=ea014460d8c1df1805b7&_method=delete";
    } else {
      url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/"+id+"?token=ea014460d8c1df1805b7&_method=put";  
    }
    var reqPut = new XMLHttpRequest();    
    reqPut.onreadystatechange = () => {
      if (reqPut.readyState === 4) {
        if (reqPut.status === 200) {
          //console.log(this.state.visits);
          visita.favourite = !visita.favourite;
          var idAux = this.state.visits.findIndex((element)=>{return element.id === visita.id});
          var visitsAux = this.state.visits;
          visitsAux[idAux] = visita;
          this.setState({
            visit: visita,
            visits: visitsAux,
            texto: "Visita seleccionada: "+visita.id
          });
          //console.log(idAux);
          //console.log(this.state.visits.findIndex((element)=>{return element.id === visita.id}));
          //console.log(this.state.visits[idAux]);
        } else {
          console.log("Error: ", reqPut.status);
        }
      }
    }
    reqPut.open('GET', url);
    //console.log(reqPut);
    reqPut.send();
  }

  render() {
    return (
      <div style={{height: "100%"}}>
        <Cabecera texto={this.state.texto}/>
        <div style={styleVisitList}>
          <VisitsList visits={this.state.visits} visitClick={this.visitClick}/>
        </div>
        <div style={styleVisitBig}>
          <VisitBig visit={this.state.visit} favClick={this.favAppClick}/>
        </div>
      </div>
    );
  }

}

