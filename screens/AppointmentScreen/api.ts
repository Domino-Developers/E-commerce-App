import { gql } from '@apollo/client';

export const GET_BOOKED_DATES = gql`
    query {
        bookedDates
    }
`;

export const GET_MY_APPOINTMENTS = gql`
    query {
        me {
            id
            appointmentSet {
                id
                timestamp
            }
        }
    }
`;

export const BOOK_APPOINTMENT = gql`
    mutation BookAppointment($timestamp: DateTime!) {
        bookAppointment(timestamp: $timestamp) {
            appointment {
                id
                timestamp
            }
        }
    }
`;
