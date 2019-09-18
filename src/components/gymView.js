import React, { Component } from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Rating } from 'react-native-ratings';

export default class GymView extends Component {

    render() {
        const { gym, loading } = this.props;

        if (loading)
            return <SkeletonPlaceholder>
                <View style={styles.gymContainer}>
                    <View style={styles.image} />
                    <View style={styles.descriptionContainer}>
                        <View style={styles.title} />
                        <View style={styles.rating} />
                        <View style={styles.address} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        
        return (
            <View style={styles.gymContainer}>
                <Image style={styles.image} source={{uri: gym.logo}} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{gym.title}</Text>
                    <Rating type="heart"
                        style={styles.rating}
                        ratingCount={5}
                        imageSize={20}
                        readonly={true}
                        startingValue={gym.rating}/>
                    <Text style={styles.address}>{gym.address}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gymContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80
    },
    descriptionContainer: {
        flex: 1,
        paddingLeft: 8
    },
    title: {
        minWidth: 150,
        minHeight: 18,
        color: "#424242",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 3
    },
    rating: {
        width: 100,
        height: 18,
        marginTop: 3
    },
    address: {
        minWidth: 200,
        minHeight: 18,
        color: "#424242",
        fontSize: 12,
        marginTop: 3
    }
});