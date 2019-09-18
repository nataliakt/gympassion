import React, { Component } from 'react';
import moment from 'moment';

import AsyncStorage from "@react-native-community/async-storage";
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';

import Card from '../components/card';
import GymView from '../components/gymView';

export default class Main extends Component {

    static navigationOptions = {
        title: "Meus Checkins"
    }

    state = {
        checkins: []
    }

    componentDidMount() {
        this.retriveCheckins();
        setInterval(this.retriveCheckins, 2000);
    }

    retriveCheckins = async () => {
        // await AsyncStorage.removeItem('checkins');
        const docs = await AsyncStorage.getItem('checkins');

        let checkins = [];
        let dates = [];
        JSON.parse(docs).forEach(doc => {
            let date = moment.utc(doc.date).format("DD MMM, YYYY");
            if (!dates.includes(date)) {
                checkins.push({
                    "id": date,
                    "title": date,
                    "type": "date",
                    "date": doc.date
                });
                dates.push(date);
            }
            checkins.push(doc);
        });

        this.setState({
            checkins: checkins
        });
    }

    renderItem = ({ item }) => {
        if (item.type == 'date')
            return <Text key={item.id} style={styles.date}>{item.title}</Text>

        return (<Card key={item.id} left="#ff7d47">
            <TouchableOpacity
                style={styles.checkinContainer}
                disabled={!item.gym}
                onPress={() => {
                    this.props.navigation.navigate("Gym", {
                        gym: item.gym
                    });
                }}>
                <GymView gym={item.gym} />
                <Text style={styles.activityTitle}>{item.activity.title}</Text>
            </TouchableOpacity>
        </Card>
    )};

    render() {
        const { checkins } = this.state;

        if (!checkins || checkins.length == 0)
            return <Text style={styles.none}>Não há nada por aqui ainda... Mas dê uma olhada nas Academias!</Text>

        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={checkins}
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
    checkinContainer: {
        // flexDirection: 'row'
    },
    activityTitle: {
        fontSize: 18,
        borderTopColor: "#ddd",
        borderTopWidth: 1,
        textAlign: "center",
        marginTop: 8,
        paddingTop: 8,
        color: "#424242"
    },
    date: {
        fontSize: 18,  
        color: "#e54919",
        fontWeight: "bold"
    },
    none: {
        padding: 16,
        textAlign: "center",
        fontSize: 18,  
        color: "#424242"
    }
});