export function searchApp(visits) {
    return {
        type: 'SEARCH_APP',
        visits: visits,
    };
}

export function favouriteAppClicked(favourite) {
    return {
        type: 'FAVOURITE_CLICKED',
        favourite: favourite,
    };
}

export function visitClick(visit) {
    return {
        type: 'VISIT_CLICK',
        visit: visit,
    };
}

export function dateAfterChanged(date) {
    return {
        type: 'DATE_AFTER',
        date: date,
    };
}

export function dateBeforeChanged(date) {
    return {
        type: 'DATE_BEFORE',
        date: date,
    };
}
