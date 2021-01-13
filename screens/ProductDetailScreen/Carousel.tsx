import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import CarouselBase from 'react-native-snap-carousel';

import { Photo } from './types';

interface CarouselProps {
    photos: Photo[];
}

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
    const _renderItem = ({ item }: { item: Photo }) => {
        return (
            // <View
            //     style={{
            //         backgroundColor: 'floralwhite',
            //         borderRadius: 5,
            //         height: 250,
            //         padding: 50,
            //         marginLeft: 25,
            //         marginRight: 25,
            //     }}
            // >
            //     <Text>{item.url}</Text>
            // </View>
            <Image
                source={{ uri: item.url }}
                style={{
                    width: '100%',
                    height: 250,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            />
        );
    };

    return (
        <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
            <CarouselBase
                layout={'default'}
                // ref={ref => (this.carousel = ref)}
                data={photos}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                // onSnapToItem={index => this.setState({ activeIndex: index })}
            />
        </View>
    );
};

export default Carousel;
