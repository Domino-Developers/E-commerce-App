import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
    DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Ionicons,
    FontAwesome5,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { View } from 'react-native';
import {
    Title,
    TouchableRipple,
    useTheme,
    Switch,
    Text,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import * as api from './api';
import { changeTheme } from '../store/generalSlice';
import AuthScreen from '../screens/AuthScreen';
import AccountScreen from '../screens/AccountScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import { setToken } from '../features/Auth/userSlice';

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
import { authClear } from '../features/Auth/userSlice';

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
const ProductsNavigation: React.FC = () => {
    const isLoggedIn = useTypedSelector(state => state.user.isLoggedIn);

    return (
        <ProductsNavigator.Navigator>
            <ProductsNavigator.Screen
                name="ProductsOverview"
                component={ProductsOverviewNavigation}
                options={({
                    navigation,
                }: ProductsNavProps<'ProductsOverview'>) => ({
                    title: 'All Products',
                    headerRight: () =>
                        isLoggedIn && (
                            <Ionicons
                                name="md-cart"
                                size={23}
                                onPress={() => navigation.navigate('Cart')}
                                style={styles.cartIcon}
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
};

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

const CustomDrawer = (props: DrawerContentComponentProps) => {
    interface UserData {
        me: {
            name: string;
        };
    }

    const { data, loading, refetch } = useQuery<UserData>(api.GET_USERDATA);
    const loggedIn = useTypedSelector(state => state.user.isLoggedIn);
    const name = data?.me.name;
    useEffect(() => {
        refetch();
    }, [loggedIn]);
    const { colors } = useTheme();
    const darkTheme = useTypedSelector(state => state.general.darkTheme);
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView {...props}>
            <TouchableRipple
                onPress={() => props.navigation.navigate('Account')}
            >
                <Title style={styles.drawerTitle}>
                    Hello{loading ? '' : name ? `, ${name}` : '. Sign In'}
                </Title>
            </TouchableRipple>
            <DrawerItemList {...props} inactiveTintColor={colors.text} />
            <DrawerItem
                onPress={() => {}}
                label={() => (
                    <View style={styles.switchContainer}>
                        <Text>Dark Theme</Text>
                        <Switch
                            focusable
                            value={darkTheme}
                            onValueChange={() =>
                                dispatch(changeTheme(!darkTheme))
                            }
                        />
                    </View>
                )}
            />
            {loggedIn && (
                <DrawerItem
                    onPress={() => {
                        dispatch(authClear());
                    }}
                    label="Logout"
                />
            )}
        </DrawerContentScrollView>
    );
};

const MainNavigator = createDrawerNavigator<MainParamList>();
const MainNavigation: React.FC = () => {
    const isLoggedIn = useTypedSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const dataString = await AsyncStorage.getItem('DD-E-commerce');
            console.log(dataString);
            if (dataString) {
                const data = JSON.parse(dataString);
                dispatch(setToken(data));
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getData();
    });

    return (
        <MainNavigator.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <MainNavigator.Screen
                name="Products"
                component={ProductsNavigation}
                options={{ title: 'Home' }}
            />
            {isLoggedIn && (
                <MainNavigator.Screen
                    name="Orders"
                    component={OrderNavigation}
                    options={{ title: 'Your Orders' }}
                />
            )}
            <MainNavigator.Screen
                name="Account"
                component={AccountNavigation}
            />
        </MainNavigator.Navigator>
    );
};

export default MainNavigation;
