import React from 'react';
import VisitSmall from './VisitSmall';

const styleVisitsList = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "lightGrey"
}

export default class VisitsList extends React.Component {
    constructor(props) {
        super(props);
        this.visitListClick = this.visitListClick.bind(this);
    }
    visitListClick(visita) {
        this.props.visitClick(visita);
    }
    render() {
        console.log(document.childNodes[1].childNodes[2].childNodes[1].childNodes);
        console.log(this.props.visits);
        
        let visitList = this.props.visits.map((visit) => {
            console.log(visit);
            return(
                <div key={"id" + visit.id} style={styleVisitsList}>
                    <VisitSmall visit={visit} visitListClick={this.visitListClick}/>
                </div>
            );
        });
        
        return (
            <div>
                {visitList}
            </div>
        );
    }
}