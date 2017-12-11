import {
    TRADE_FETCHED,
    TRADE_SAVED
} from './../actions/trade';

export const initialState = {};

export default function trade(theState = initialState, theAction) {
    switch (theAction.type) {
        case TRADE_FETCHED:
        case TRADE_SAVED:
            return {
                ...theState,
                trade: theAction.trade
            };
        default:
            return theState;
    }
}
