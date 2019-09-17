import React, { Component } from 'react';
import api from '../services/api';

import AsyncStorage from "@react-native-community/async-storage";
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Card from '../components/card';
import GymView from '../components/gymView';

export default class Speakers extends Component {

    static navigationOptions = {
        title: 'Gyms'
    }

    state = {
        gyms: [],
        gymsSkeleton: [
            {id: 1},
            {id: 2},
            {id: 3},
        ],
        loading: true
    };

    async componentDidMount() {
        try {
            await this.retriveGyms();
            await this.loadGyms();
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    retriveGyms = async () => {
        const gyms = await AsyncStorage.getItem('gyms');

        this.setState({
            gyms: JSON.parse(gyms)
        });
    }

    loadGyms = async () => {
        const response = await api.get('/gyms');

        const gyms = response.data;
        
        this.setState({
            gyms: gyms
        });

        await AsyncStorage.setItem('gyms', JSON.stringify(gyms));
    }

    renderItem = ({ item }) => (
        <Card key={item.id}>
            <TouchableOpacity
                style={styles.gymContainer}
                disabled={!item.title}
                onPress={() => {
                    this.props.navigation.navigate("Gym", {
                        gym: item
                    });
                }}>
                <GymView gym={item} loading={this.state.loading}/>
            </TouchableOpacity>
        </Card>
    );

    render() {
        const { gyms, gymsSkeleton, loading } = this.state;

        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={ loading ? gymsSkeleton : gyms }
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    list: {
        padding: 16
    },
    gymContainer: {
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80
    },
    descriptionContainer: {
        flex: 1,
        paddingLeft: 8,
    },
    title: {
        color: "#424242",
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
    },
    rate: {
        color: "#f39713",
        fontSize: 13,
        fontFamily: 'Lato-Light',
    },
    address: {
        color: "#424242",
        fontSize: 12,
        fontFamily: 'Lato-Regular',
    }
});