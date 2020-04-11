import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { connect as connectRedux } from 'react-redux';

import { selectBlogViewable } from '../../redux/blog/blog.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDay as clockIcon, faPen as authorIcon } from '@fortawesome/free-solid-svg-icons';
import styles from "./blog-viewer.styles";

class BlogViewer extends React.Component {

    constructor( props ) {
        super( props );
    }

    render () {
        const { blog } = this.props;
        if ( blog == null ) {
            return (
                <ScrollView>
                    <Text>Loading...</Text>
                </ScrollView>
            );
        }
        return (
            <ScrollView contentContainerStyle={ styles.container }>
                <Image
                    source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                    style={ styles.coverImage } />
                <Text style={ styles.title }>
                    { blog.title }
                </Text>
                <Text style={ styles.metaData }>
                    <FontAwesomeIcon icon={ authorIcon } size={ 14 } color={ 'grey' } /> { blog.author !== null ? blog.author.displayName.substring( 0, 20 ) : "Unknown" } { '\n' }
                    <FontAwesomeIcon icon={ clockIcon } size={ 14 } color={ 'grey' } /> { blog.ts_added.toDate().toDateString().substring( 0, 20 ) }
                </Text>
                <Text style={ styles.blogText }>
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
