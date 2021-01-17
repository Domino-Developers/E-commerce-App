import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { Calendar, DotMarking } from 'react-native-calendars';
import { Button, Caption, Dialog, Portal, useTheme } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';

import * as api from './api';
import Header from '../../components/Header';
import styles from './styles';
import FullPageLoading from '../../components/FullPageLoading';
import { useAlert } from '../../utils/hooks';

interface AppointmentCreateProps {
    visible: boolean;
    setVisible: (a: boolean) => void;
    onBook: (date: Date) => void;
}

interface markedDatesType {
    [index: string]: DotMarking;
}

const AppointmentCreate: React.FC<AppointmentCreateProps> = ({
    visible,
    setVisible,
    onBook,
}) => {
    const { data, loading: datesLoading, refetch } = useQuery<{
        bookedDates: [Date];
    }>(api.GET_BOOKED_DATES);
    console.log(data);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const setAlert = useAlert();

    const { colors } = useTheme();
    const [bookAppointment, { loading: bookLoading }] = useMutation(
        api.BOOK_APPOINTMENT
    );

    if (datesLoading || !data) {
        return <FullPageLoading />;
    }

    const bookedDates = data.bookedDates;

    let markedBookedDates: markedDatesType = {};
    bookedDates.forEach(_date => {
        markedBookedDates[moment(_date).format('YYYY-MM-DD')] = {
            disabled: true,
            disableTouchEvent: true,
        };
    });
    if (selectedDate) {
        markedBookedDates[moment(selectedDate).format('YYYY-MM-DD')] = {
            selected: true,
        };
    }

    const onBookPress = async () => {
        if (!selectedDate) return;
        selectedDate.setHours(17);
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        selectedDate.setMilliseconds(0);
        try {
            await bookAppointment({
                variables: { timestamp: selectedDate.toISOString() },
            });
            setAlert({ text: 'Appointment Booked!', type: 'success' });
        } catch (err) {
            setAlert({ text: JSON.stringify(err), type: 'danger' });
        } finally {
            setSelectedDate(undefined);
            onBook(selectedDate);
        }
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title>
                    <Header>Book appointment</Header>
                </Dialog.Title>
                <Dialog.Content>
                    <Caption>Appointments are handled at 5 pm only</Caption>
                    <Calendar
                        minDate={new Date()}
                        onDayPress={day => {
                            setSelectedDate(new Date(day.timestamp));
                        }}
                        markedDates={markedBookedDates}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        color={colors.error}
                        focusable
                        onPress={() => setVisible(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        focusable
                        disabled={!selectedDate || bookLoading}
                        loading={bookLoading}
                        onPress={onBookPress}
                    >
                        Book!
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AppointmentCreate;
