import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';
import { FontSizeLarge } from '../../themes/basic.theme';

export default StyleSheet.create( {
    container: {
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'white'
    },
    coverImage: {
        height: 300,
        width: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontWeight: 'bold',
        fontSize: CurrentTheme.FontSizeLargest,
        margin: 10,
        marginBottom: 5,
        padding: 0,
        textTransform: 'uppercase',
    },
    metaData: {
        color: '#888',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    blogText: {
        fontSize: FontSizeLarge,
        padding: 20,
        paddingBottom: 50,
        textAlign: "justify",
    }
} );