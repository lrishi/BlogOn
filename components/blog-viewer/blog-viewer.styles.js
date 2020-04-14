import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';


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
    mdataWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    landScapeWrapper: {
        width: '100%',
        backgroundColor: '#00000077',
        padding: 20,
        minHeight: '100%'
    },
    landScapeCoverImage: {
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'
    },
    landScapeTitle: {
        fontWeight: 'bold',
        fontSize: CurrentTheme.FontSizeLargest,
        margin: 10,
        marginBottom: 5,
        padding: 0,
        color: 'white',
        textTransform: 'uppercase',
        flex: 1,
    },
    landScapeMdata: {
        color: '#DDD',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    landScapeBlogText: {
        fontSize: CurrentTheme.FontSizeLarge,
        padding: 30,
        paddingBottom: 50,
        textAlign: "justify",
        marginTop: 30,
        color: 'white',
        borderTopWidth: 1,
        borderColor: '#AAA'
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
        fontSize: CurrentTheme.FontSizeLarge,
        padding: 20,
        paddingBottom: 50,
        textAlign: "justify",
    }
} );