import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List, Title, FAB, Text } from 'react-native-paper';
import moment from 'moment';

import Header from '../../components/Header';
import AppointmentCreate from './AppointmentCreate';
import styles from './styles';
import * as api from './api';
import { useAlert, useTypedSelector } from '../../utils/hooks';
import FullPageLoading from '../../components/FullPageLoading';

interface Appointment {
    timestamp: Date;
    id: string;
}

interface MyAppointment {
    me: {
        id: string;
        appointmentSet: [
            {
                id: string;
                timestamp: string;
            }
        ];
    };
}

const AppointmentScreen: React.FC = () => {
    const isLoggedIn = useTypedSelector(state => state.user.isLoggedIn);

    const { data, loading, error, refetch } = useQuery<MyAppointment>(
        api.GET_MY_APPOINTMENTS,
        {
            skip: !isLoggedIn,
        }
    );
    useEffect(() => {
        refetch();
    }, [isLoggedIn]);

    const [visible, setVisible] = useState(false);

    if (!isLoggedIn) {
        return <Text>Please log in to view / add appointments</Text>;
    }

    if (error) {
        return <Text>Sorry some error occured</Text>;
    }

    if (loading || !data) {
        return <FullPageLoading />;
    }

    let appointments = data.me.appointmentSet.map(_appointment => ({
        id: _appointment.id,
        timestamp: new Date(_appointment.timestamp),
    }));

    console.log(appointments);
    const currentDate = new Date();
    const pastAppointments = appointments.filter(
        _appointment => _appointment.timestamp <= currentDate
    );

    const upcommingAppointements = appointments.filter(
        _appointment => _appointment.timestamp > currentDate
    );

    console.log(pastAppointments);
    console.log(upcommingAppointements);

    const onBook = (date: Date) => {
        setVisible(false);
        refetch();
        console.log(date);
    };
    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <Header>My Appointments</Header>
                </View>
                <Divider focusable />
                <List.Accordion
                    title={<Title>Upcomming Appointments</Title>}
                    left={props => (
                        <List.Icon {...props} icon="calendar-clock" />
                    )}
                    id="1"
                >
                    {upcommingAppointements.map(_appointment => (
                        <List.Item
                            key={_appointment.id}
                            title={moment(_appointment.timestamp).format(
                                'dddd, MMMM Do YYYY @ h:mm a'
                            )}
                        />
                    ))}
                </List.Accordion>
                <List.Accordion
                    title={<Title>Past Appointments</Title>}
                    left={props => (
                        <List.Icon {...props} icon="calendar-check" />
                    )}
                    id="2"
                >
                    {pastAppointments.map(_appointment => (
                        <List.Item
                            key={_appointment.id}
                            title={moment(_appointment.timestamp).format(
                                'dddd, MMMM Do YYYY, h:mm a'
                            )}
                        />
                    ))}
                </List.Accordion>
            </ScrollView>
            <FAB
                style={styles.fab}
                focusable
                icon="plus"
                onPress={() => setVisible(true)}
            />
            <AppointmentCreate
                visible={visible}
                setVisible={setVisible}
                onBook={onBook}
            />
        </>
    );
};

export default AppointmentScreen;
