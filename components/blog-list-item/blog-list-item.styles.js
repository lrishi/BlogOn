import { StyleSheet } from 'react-native';
import CurrentTheme from '../../themes/current.theme';

export default StyleSheet.create( {
    blogListItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        minHeight: 120,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: "center",
        marginTop: 10,
        elevation: 4,
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 4,
    },
    blogListThumbnail: {
        width: '45%',
        height: '100%',
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: "black",

    },
    blogListTextWrapper: {
        width: '55%',
        height: '100%',
        paddingLeft: 10,
    },
    blogListTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',

    },
    blogMetaData: {
        fontSize: 12,
        color: 'grey',
    },
    blogExcerpt: {
        fontSize: 13,
        color: 'grey',
        textTransform: 'uppercase'
    },
    blogActionWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        width: '100%',
    },
    blogActionButton: {
        margin: 5,
        backgroundColor: '#ccc',
        elevation: 4,
        color: 'white',
        borderRadius: 2,
        padding: 5
    },
    deleteButton: {
        backgroundColor: CurrentTheme.Colors.danger,
        color: CurrentTheme.ComplementColors.danger,
    },
    blogEditButton: {
        backgroundColor: CurrentTheme.Colors.warning,
        color: CurrentTheme.ComplementColors.danger,
    },
    shareButton: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
} );