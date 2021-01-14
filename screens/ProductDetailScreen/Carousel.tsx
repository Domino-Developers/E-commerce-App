import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import CarouselBase from 'react-native-snap-carousel';
import styles from './styles';

import { Photo } from './types';

interface CarouselProps {
    photos: Photo[];
}

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
    const _renderItem = ({ item }: { item: Photo }) => {
        return <Image source={{ uri: item.url }} style={styles.img} />;
    };

    return (
        <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
            <CarouselBase
                layout={'default'}
                data={photos}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
            />
        </View>
    );
};

export default Carousel;
