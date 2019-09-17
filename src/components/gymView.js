import React, { Component } from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default class GymView extends Component {

    render() {
        const { gym, loading } = this.props;

        if (loading)
            return <SkeletonPlaceholder>
                <View style={styles.gymContainer}>
                    <View style={styles.image} />
                    <View style={styles.descriptionContainer}>
                        <View style={styles.title} />
                        <View style={styles.rate} />
                        <View style={styles.address} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        
        return (
            <View style={styles.gymContainer}>
                <Image style={styles.image} source={{uri: gym.logo}} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{gym.title}</Text>
                    <Text style={styles.rate}>{gym.rating}</Text>
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
        minWidth: 100,
        minHeight: 18,
        color: "#424242",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 3
    },
    rate: {
        minWidth: 50,
        minHeight: 18,
        color: "#f39713",
        fontSize: 13,
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