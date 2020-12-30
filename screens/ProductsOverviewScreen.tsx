import { gql, useQuery } from '@apollo/client';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview';

import { ProductsOverviewNavProps } from '../navigation/ParamList';
import ProductCard from '../components/ProductCard';

interface Product {
    id: string;
    name: string;
    photos: { url: string }[];
    price: number;
    discount: number;
    reviews: { rating: number }[];
}

interface ProductData {
    products: Product[];
}

interface ProductVars {
    first: number;
    kind: string;
    skip: number;
}

const GET_PRODUCTS = gql`
    query Products($kind: String!, $first: Int!, $skip: Int!) {
        products(kind: $kind, first: $first, skip: $skip) {
            id
            name
            price
            discount
            photos {
                url
            }
            reviews {
                rating
            }
        }
    }
`;

const ProductsOverviewScreen: React.FC<
    ProductsOverviewNavProps<'Cloth' | 'Jewellery'>
> = ({ route, navigation }) => {
    const pageSize = 2;

    const data = useRef<Product[] | undefined>();
    const addData = useRef(false);

    const { data: newData, loading, refetch } = useQuery<
        ProductData,
        ProductVars
    >(GET_PRODUCTS, {
        variables: {
            first: pageSize,
            kind: route.name,
            skip: data.current ? data.current.length : 0,
        },
    });

    if (!data.current && newData) data.current = newData.products;

    if (newData && data.current && addData.current) {
        addData.current = false;
        data.current = [...data.current, ...newData.products];
    }

    const [dataProvider, setDataProvider] = useState(
        new DataProvider((p1: Product, p2: Product) => p1.id !== p2.id)
    );

    const [layoutProvider] = useState(
        new LayoutProvider(
            _ => 1,
            (_, dim) => {
                dim.width = Dimensions.get('window').width;
                dim.height = 350;
            }
        )
    );

    useEffect(
        () =>
            setDataProvider(prevState =>
                prevState.cloneWithRows(
                    (data.current || []).map(p => ({ type: 1, item: p }))
                )
            ),
        [data.current]
    );

    const rowRenderer = (_: any, data: { type: string; item: Product }) => (
        <ProductCard product={data.item} navigation={navigation} />
    );

    if (!dataProvider.getSize()) return null;

    return (
        <RecyclerListView
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
            onEndReached={() => {
                addData.current = true;
                refetch();
            }}
            renderFooter={() =>
                loading ? (
                    <ActivityIndicator focusable={true} style={styles.loader} />
                ) : null
            }
        />
    );
};

interface Styles {
    loader: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    loader: {
        margin: 10,
    },
});

export default ProductsOverviewScreen;
