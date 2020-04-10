import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { connect as connectRedux } from 'react-redux';

import { selectBlogViewable } from '../../redux/blog/blog.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

class BlogViewer extends React.Component {

    constructor( props ) {
        super( props );
    }

    render () {
        const { blog } = this.props;
        if ( blog == null ) {
            return ( <ScrollView><Text>Loading...</Text></ScrollView> );
        }
        return (
            <ScrollView>
                <Image source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                    style={ { width: '100%', height: 200, resizeMode: 'cover' } } />
                <Text>
                    { blog.title }
                </Text>
                <Text>
                    <FontAwesomeIcon icon={ faEdit } size={ 12 } color={ 'grey' } /> { blog.author !== null ? blog.author.displayName.substring( 0, 20 ) : "Unknown" } { '\n' }
                    <FontAwesomeIcon icon={ faClock } size={ 12 } color={ 'grey' } /> { blog.ts_added.toDate().toDateString().substring( 0, 20 ) }
                </Text>
                <Text>
                    { blog.editor }
                </Text>
            </ScrollView>
        );
    }

}

const mapStateToProps = ( state ) => ( {
    blog: selectBlogViewable( state ),
} );

export default connectRedux( mapStateToProps )( BlogViewer );
