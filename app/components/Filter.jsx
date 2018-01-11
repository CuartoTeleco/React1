import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const listItemInsideStyle = {
    display: 'block',
};

const listItemStyle = {
    float: 'left',
    marginBottom: '10px',
    padding: '11px',
};

const listItemStyle2 = {
    float: 'left',
    marginBottom: '10px',
    padding: '0px',
};

const listItemStyle3 = {
    float: 'left',
    marginBottom: '10px',
    padding: '11px 11px 11px 0px',
};

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
        this.props.dateAfterChanged(date);
    }

    dateBeforeChanged(date) {
        this.props.dateBeforeChanged(date);
    }

    render() {
        return (
            <div>
                <ul role="tree" style={{listStyle: 'none', listStyleType: 'none', paddingLeft: '10px'}}>
                    <li role="treeitem" style={listItemStyle}><strong role="treeitem" style={listItemInsideStyle}>Desde:</strong></li>
                    <li role="treeitem" style={listItemStyle3}><DatePicker role="treeitem" dateFormat='YYYY/MM/DD' id="dateAfter" style={listItemInsideStyle} selected={this.props.dateAfter} onChange={this.dateAfterChanged}/> </li>
                    <li role="treeitem" style={listItemStyle3}> <input role="treeitem" type='checkbox' id='checkDateAfter'/> </li>
                    <li role="treeitem" style={listItemStyle}><strong role="treeitem" style={listItemInsideStyle}>Hasta:</strong></li>
                    <li role="treeitem" style={listItemStyle3}><DatePicker role="treeitem" dateFormat='YYYY/MM/DD' id="dateBefore" style={listItemInsideStyle} selected={this.props.dateBefore} onChange={this.dateBeforeChanged}/> </li>
                    <li role="treeitem" style={listItemStyle3}> <input role="treeitem" type='checkbox' id='checkDateBefore'/> </li>
                    <li role="treeitem" style={listItemStyle}><strong role="treeitem" style={listItemInsideStyle}>Favorito:</strong></li>
                    <li role="treeitem" style={listItemStyle2}><button role="treeitem" style={{display: "inline", border: "none", float: "right", paddingTop: '0px'}} onClick={this.favouriteClicked}>
                        <img id='fav' style={{height: "40px", width: "40px"}} src={this.props.favourite ? "./../assets/images/fav.png" : "./../assets/images/notFav.png"} alt={this.props.favourite ? 'Favoritas' : 'No favoritas'}/>
                    </button></li>
                    <li role="treeitem" style={listItemStyle3}> <input role="treeitem" type='checkbox' id='checkFavourite'/> </li>
                    <li role="treeitem" style={listItemStyle}> <button role="treeitem" onClick={this.searchFilter}> Buscar </button> </li>
                </ul>
            </div>
        );
    }
}
