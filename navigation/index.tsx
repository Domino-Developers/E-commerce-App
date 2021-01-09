import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Ionicons,
    FontAwesome5,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import AuthScreen from '../screens/AuthScreen';
import AccountScreen from '../screens/AccountScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';

import {
    ProductsOverviewParamList,
    ProductsOverviewNavProps,
    ProductsParamList,
    ProductsNavProps,
    OrderParamList,
    OrderNavProps,
    AccountParamList,
    MainParamList,
    AccountNavProps,
} from './ParamList';
import { useTypedSelector } from '../utils/hooks';

const getMenuIcon = (
    navigation:
        | ProductsNavProps<'ProductsOverview'>['navigation']
        | OrderNavProps<'Orders'>['navigation']
        | AccountNavProps<'Account' | 'Auth'>['navigation']
) => (
    <Ionicons
        name="md-menu"
        size={23}
        onPress={() => navigation.toggleDrawer()}
    />
);

const getTabOptions = ({
    route,
}: ProductsOverviewNavProps<'Cloth' | 'Jewellery' | 'Appointment'>) => ({
    tabBarIcon: () => {
        if (route.name === 'Cloth')
            return <FontAwesome5 name="tshirt" size={23} />;
        if (route.name === 'Jewellery')
            return <MaterialCommunityIcons name="necklace" size={23} />;
        if (route.name === 'Appointment')
            return <FontAwesome5 name="clock" size={23} />;
    },
});

const ProductsOverviewNavigator = createBottomTabNavigator<ProductsOverviewParamList>();
const ProductsOverviewNavigation: React.FC = () => (
    <ProductsOverviewNavigator.Navigator screenOptions={getTabOptions}>
        <ProductsOverviewNavigator.Screen
            name="Cloth"
            component={ProductsOverviewScreen}
        />
        <ProductsOverviewNavigator.Screen
            name="Jewellery"
            component={ProductsOverviewScreen}
        />
        <ProductsOverviewNavigator.Screen
            name="Appointment"
            component={AppointmentScreen}
        />
    </ProductsOverviewNavigator.Navigator>
);

const ProductsNavigator = createStackNavigator<ProductsParamList>();
const ProductsNavigation: React.FC = () => (
    <ProductsNavigator.Navigator>
        <ProductsNavigator.Screen
            name="ProductsOverview"
            component={ProductsOverviewNavigation}
            options={({
                navigation,
            }: ProductsNavProps<'ProductsOverview'>) => ({
                title: 'All Products',
                headerRight: () => (
                    <Ionicons
                        name="md-cart"
                        size={23}
                        onPress={() => navigation.navigate('Cart')}
                    />
                ),
                headerLeft: () => getMenuIcon(navigation),
            })}
        />
        <ProductsNavigator.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
        />
        <ProductsNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsNavigator.Navigator>
);

const OrderNavigator = createStackNavigator<OrderParamList>();
const OrderNavigation: React.FC = () => (
    <OrderNavigator.Navigator>
        <OrderNavigator.Screen
            name="Orders"
            component={OrdersScreen}
            options={({ navigation }: OrderNavProps<'Orders'>) => ({
                headerLeft: () => getMenuIcon(navigation),
            })}
        />
        <OrderNavigator.Screen
            name="OrderDetail"
            component={OrderDetailScreen}
            options={{ title: 'Order Details' }}
        />
    </OrderNavigator.Navigator>
);

const AccountNavigator = createStackNavigator<AccountParamList>();
const AccountNavigation: React.FC = () => {
    const isLoggedIn = useTypedSelector(state => state.user.isLoggedIn);

    if (!isLoggedIn)
        return (
            <AccountNavigator.Navigator>
                <AccountNavigator.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={({ navigation }: AccountNavProps<'Auth'>) => ({
                        headerLeft: () => getMenuIcon(navigation),
                    })}
                />
            </AccountNavigator.Navigator>
        );

    return (
        <AccountNavigator.Navigator>
            <AccountNavigator.Screen
                name="Account"
                component={AccountScreen}
                options={({ navigation }: AccountNavProps<'Account'>) => ({
                    headerLeft: () => getMenuIcon(navigation),
                })}
            />
        </AccountNavigator.Navigator>
    );
};

const MainNavigator = createDrawerNavigator<MainParamList>();
const MainNavigation: React.FC = () => (
    <MainNavigator.Navigator>
        <MainNavigator.Screen name="Products" component={ProductsNavigation} />
        <MainNavigator.Screen name="Orders" component={OrderNavigation} />
        <MainNavigator.Screen name="Account" component={AccountNavigation} />
    </MainNavigator.Navigator>
);

export default MainNavigation;
