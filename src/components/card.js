import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

export default class Card extends Component {

    render() {
        const styles = StyleSheetFactory.getSheet(this.props.left, this.props.backgroundColor);

        return (
            <View style={styles.cardComponent}>
                {this.props.children}
            </View>
        );
    }
}

class StyleSheetFactory {
    static getSheet(left, backgroundColor) {
        let style = {
            cardComponent: {
                backgroundColor: '#fff',
                padding: 16,
                marginVertical: 8,
                elevation: 2,
                shadowColor: '#6d6d6d',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 2
            }
        };
        if (left) {
            style.cardComponent.borderLeftWidth = 5;
            style.cardComponent.borderLeftColor = left;
        }

        if (backgroundColor) {
            style.cardComponent.backgroundColor = backgroundColor
        }
        return StyleSheet.create(style);
    }
}
