import React from 'react';
import './../assets/scss/main.scss';
import VisitsList from './VisitsList';
import Cabecera from './Cabecera';
import VisitBig from './VisitBig';
import {visits} from "./../assets/mock.data.js";

const styleVisitList = {
  float: "left",
  width: "38%",
  height: "100%",
  marginTop: "10px"
}

const styleVisitBig = {
  float: "right",
  width: "57%",
  height: "100%",
  marginTop: "10px"
}

var visitsReal = [];

var req = new XMLHttpRequest();


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
  }

  componentDidMount() {
    var url = "https://dcrmt.herokuapp.com/api/visits/flattened?token=ea014460d8c1df1805b7";
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

  render() {
    return (
      <div>
        <Cabecera texto={this.state.texto}/>
        <div style={styleVisitList}>
          <VisitsList visits={visitsReal} visitClick={this.visitClick}/>
        </div>
        <div style={styleVisitBig}>
          <VisitBig visit={this.state.visit}/>
        </div>
      </div>
    );
  }

}

