import React, { Fragment } from 'react';
import moment from 'moment';
import { Caption } from 'react-native-paper';

interface FromNowProps {
    date: string;
}

const FromNow: React.FC<FromNowProps> = ({ date }) => {
    const dateShow = new Date(date);
    return <Caption>{moment(dateShow).fromNow()}</Caption>;
};

export default FromNow;
