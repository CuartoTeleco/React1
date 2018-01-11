import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

let dateAfterSentence;
let dateBeforeSentence;

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.searchFilter = this.searchFilter.bind(this);
        this.favouriteClicked = this.favouriteClicked.bind(this);
        this.dateAfterChanged = this.dateAfterChanged.bind(this);
        this.dateBeforeChanged = this.dateBeforeChanged.bind(this);
    }

    favouriteClicked() {
        console.log(this.props);
        document.getElementById('checkFavourite').checked = true;
        this.props.favouriteClicked();
    }

    searchFilter() {
        let checkDateAfter = document.getElementById('checkDateAfter');
        let dateAfter = document.getElementById('dateAfter').value.replace('/', '-').replace('/', '-');
        let checkDateBefore = document.getElementById('checkDateBefore');
        let dateBefore = document.getElementById('dateBefore').value.replace('/', '-').replace('/', '-');
        let checkFavourite = document.getElementById('checkFavourite');
        let fav = document.getElementById('fav').alt === 'Favoritas' ? '1' : '0';
        let params = '';
        console.log(Number(dateAfter.split('-')[0]) < Number(dateBefore.split('_')[0]));
        console.log("Antes de: ", dateBefore, "Después de: ", dateAfter);
        if (checkDateAfter.checked && checkDateBefore.checked) {
            if (Number(dateAfter.split('-')[0]) < Number(dateBefore.split('_')[0])) {
                alert('Las fechas introducidas son incorrectas');
                return;
            } else if (Number(dateAfter.split('-')[1]) < Number(dateBefore.split('_')[1])) {
                alert('Las fechas introducidas son incorrectas');
                return;
            } else if (Number(dateAfter.split('-')[2]) < Number(dateBefore.split('_')[2])) {
                alert('Las fechas introducidas son incorrectas');
                return;
            }
        }
        params += checkDateAfter.checked ? '&dateafter=' + dateAfter : '';
        params += checkDateBefore.checked ? '&datebefore=' + dateBefore : '';
        params += checkFavourite.checked ? '&favourites=' + fav : '';
        console.log("Parámetros: ", params);
        this.props.search(params);
    }

    dateAfterChanged(date) {
        console.log(date);
        dateAfterSentence = date;
        console.log(dateAfterSentence.toDate());
        document.getElementById('checkDateAfter').checked = true;
        this.props.dateAfterChanged(date);
    }

    dateBeforeChanged(date) {
        dateBeforeSentence = date;
        document.getElementById('checkDateBefore').checked = true;
        this.props.dateBeforeChanged(date);
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '25px', marginTop: '25px'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px', marginLeft: '15px'}}>
                    <input aria-label="Input Checkbox para seleccionar fecha desde" style={{marginRight: '8px'}} type='checkbox' id='checkDateAfter'/>
                    <strong style={{marginRight: '4px'}}>Desde:</strong>
                    <DatePicker aria-label="Selector de fecha desde" dateFormat='YYYY/MM/DD' id="dateAfter" selected={this.props.dateAfter} onChange={this.dateAfterChanged}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input aria-label="Input Checkbox para seleccionar fecha hasta" style={{marginRight: '8px'}} type='checkbox' id='checkDateBefore'/>
                    <strong style={{marginRight: '4px'}}>Hasta:</strong>
                    <DatePicker aria-label="Selector de fecha hasta" dateFormat='YYYY/MM/DD' id="dateBefore" selected={this.props.dateBefore} onChange={this.dateBeforeChanged}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input aria-label="Input Checkbox para seleccionar favorito" style={{marginRight: '8px'}} type='checkbox' id='checkFavourite'/>
                    <strong style={{marginRight: '4px'}}>Favorito:</strong>
                    <button aria-label="Selector de favorito" style={{ display: "flex", border: "none", paddingTop: '0px', marginTop: '-12px'}} onClick={this.favouriteClicked}>
                        <img id='fav' style={{height: "40px", width: "40px"}} src={this.props.favourite ? "./../assets/images/fav.png" : "./../assets/images/notFav.png"} alt={this.props.favourite ? 'Favoritas' : 'No favoritas'}/>
                    </button>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button style={{height: '18px', borderRadius: '4px'}} onClick={this.searchFilter}> Buscar </button>
                </div>
            </div>
        );
    }
}
