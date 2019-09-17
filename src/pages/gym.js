import React, { Component } from 'react';

import { ScrollView, FlatList, TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

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

        console.log(this.props)

        this.setState({
            gym,
            loading: false
        });
    }

    renderItem = ({ item }) => (
        <View
        style={styles.activityContainer}>
             <TouchableOpacity key={item.id}
                 onPress={() => {}}>
                <Text>{ item.title }</Text>
            </TouchableOpacity>
        </View>
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
                    <SwipeListView
                        useFlatList={true}
                        contentContainerStyle={styles.list}
                        data={ loading ? activitiesSkeleton : gym.activities }
                        renderItem={this.renderItem}
                        
                        renderHiddenItem={ (rowData, rowMap) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity style={styles.rowBackTouch}>
                                    <Text style={styles.rowBackText}>Left</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        disableLeftSwipe={true}
                        onRowOpen={(rowKey, rowMap) => {
                                rowMap[rowKey].closeRow()
                        }}
                        previewRowKey={this.state.gym.activities[0].key}
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
    },
    activitiesTitle: {
        textAlign: "center",
        padding: 16
    },
    activityContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderColor: "#eee",
        borderWidth: 1
    },
    rowBack: {
        flexDirection: "row",
        flex: 1
    },
    rowBackTouch: {
        flex: 1,
        padding: 16,
        borderColor: "#eee",
        borderWidth: 1,
        backgroundColor: "#43a047"
    },
    rowBackText: {
        color: "#fff"
    }
});