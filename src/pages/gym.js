import React, { Component } from 'react';
import moment from 'moment';

import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView, FlatList, TouchableOpacity, View, Text, Image, StyleSheet, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

import Card from '../components/card';
import GymView from '../components/gymView';

export default class Gym extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: navigation.state.params.gym.title
        })
    };

    state = {
        gym: {},
        loading: true
    };

    componentDidMount() {
        const { navigation } = this.props;
        const gym = navigation.getParam('gym', {});

        this.setState({
            gym,
            loading: false
        });
    }

    renderItem = ({ item }) => (
        <Card key={item.id} left="#ff7d47">
            <TouchableOpacity
                style={styles.activityContainer}
                disabled={!item.title}
                onPress={() => {
                    Alert.alert(
                        'Checkin',
                        'Deseja fazer checkin em ' + item.title + '?',
                        [
                            {
                                text: 'Não, tô de boa',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {text: 'Claro!', onPress: async () => {
                                let checkins = await AsyncStorage.getItem('checkins');
                                checkins = checkins ? JSON.parse(checkins) : [];

                                const checkin = {
                                    id: this.state.gym.id + "_" + item.id,
                                    gym: this.state.gym,
                                    activity: item,
                                    date: moment.utc()
                                };
                                checkins.unshift(checkin);
                                await AsyncStorage.setItem('checkins', JSON.stringify(checkins));

                                Snackbar.show({
                                    title: 'Legal, checkin feito! No pain, no gain!',
                                    duration: Snackbar.LENGTH_LONG,
                                    color: "#fff"
                                });
                            }},
                        ],
                        {cancelable: false},
                    );
                }}>
                    <Image style={styles.activityImage}
                        source={require('../resources/exercises.png')} />
                    <Text style={styles.activityTitle}>{ item.title }</Text>
            </TouchableOpacity>
        </Card>
    );

    renderActivitiesTitle = () => {
        if (this.state.gym.activities)
            return <Text style={ styles.activitiesTitle }>Atividades</Text>;

        return null;
    }

    render() {
        const { gym, loading } = this.state;

        if (loading)
            return <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <GymView loading={loading} />
                </View>
            </View>

        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <GymView gym={gym} loading={loading} />
                </View>
                <View style={styles.activitiesContainer}>
                    { this.renderActivitiesTitle() }
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={ loading ? activitiesSkeleton : gym.activities }
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    />
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        padding: 16
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: 250
    },
    activitiesContainer: {
        // padding: 16
    },
    activitiesTitle: {
        alignSelf: "center",
        textAlign: "center",
        paddingHorizontal: 8,
        paddingBottom: 3,
        width: 200,
        borderBottomColor: "#e54919",
        borderBottomWidth: 3,
        fontWeight: "bold",
        fontSize: 25,
        color: "#e54919",
    },
    list: {
        padding: 16
    },
    activityContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    activityImage: {
        width: 35,
        height: 35
    },
    activityTitle: {
        fontSize: 18,
        color: "#424242",
        marginLeft: 16
    }
});