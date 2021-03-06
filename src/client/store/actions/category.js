import axios from 'axios';

import { handleError } from './common';

/*
 * Action Type Constants
 */

export const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED';

/*
 * Action Creators
 */

export const categoriesFetched = (theCategories) => ({
    type: CATEGORIES_FETCHED,
    categories: theCategories
});

/*
 * Thunk Actions
 */

export const loadCategories = () => dispatch =>
    axios.get('/api/categories')
        .then(response => dispatch(categoriesFetched(response.data.categories)))
        .catch((err) => handleError(err, dispatch));
