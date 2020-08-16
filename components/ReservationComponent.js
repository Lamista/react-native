import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            isModalOpen: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }


    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            isModalOpen: false
        });
    }

    toggleDateTimeModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    render() {
        const createAlert = () =>
            Alert.alert(
                'Your Reservation OK?',
                `Number of Guests: ${this.state.guests}\nSmoking?: ${this.state.smoking ? 'Yes' : 'No'}\nDate and Time: ${this.state.date}`,
                [
                    {
                        text: 'Cancel',
                        onPress: () => this.resetForm(),
                        style: ' cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => this.handleReservation()
                    }
                ],
                { cancelable: false }
            );

        return (
            <ScrollView>
                <Animatable.View animation="zoomInUp">
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <View style={styles.formItem}>
                            <Text>{this.state.date}</Text>
                            <Button title="Show Date Picker" onPress={() => this.setState({ isModalOpen: true })} />
                            <DateTimePickerModal
                                onPress={() => this.setState({ isModalOpen: true })}
                                mode="datetime"
                                isVisible={this.state.isModalOpen}
                                date={new Date()}
                                onConfirm={(date) => this.setState({ date: date.toISOString() }),
                                    () => this.setState({ isModalOpen: false }),
                                    (date) => console.log(date)}
                                onCancel={() => this.setState({ isModalOpen: false })}
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={createAlert}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;