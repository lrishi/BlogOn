import { StylerActionTypes } from './styler.types';
import { Dimensions } from 'react-native';

const INITIAL_STATE = {
    windowDimensions: {
        width: Math.round( Dimensions.get( "window" ).width ),
        height: Math.round( Dimensions.get( "window" ).height ),
        isPortrait: () => ( Dimensions.get( "window" ).width < Dimensions.get( "window" ).height ),
        isLandscape: () => ( Dimensions.get( "window" ).width >= Dimensions.get( "window" ).height ),
        permissiveAspectRatio: () => (
            ( ( Math.min( Dimensions.get( "window" ).width, Dimensions.get( "window" ).height ) /
                Math.max( Dimensions.get( "window" ).width, Dimensions.get( "window" ).height ) ) < 0.7 ? true : false )
        )
    }
};

const stylerReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case StylerActionTypes.SET_DIMENSIONS:
            return {
                ...state,
                windowDimensions: {
                    ...state.windowDimensions,
                    width: Math.round( action.payload.width ),
                    height: Math.round( action.payload.height )
                }
            };
        default:
            return state;
    }
};


export default stylerReducer;