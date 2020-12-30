import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
    RouteProp,
    NavigatorScreenParams,
    CompositeNavigationProp,
} from '@react-navigation/native';

export type ProductsOverviewParamList = {
    Cloth: undefined;
    Jewellery: undefined;
    Appointment: undefined;
};

export type ProductsOverviewNavProps<
    T extends keyof ProductsOverviewParamList
> = {
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<ProductsOverviewParamList, T>,
        StackNavigationProp<ProductsParamList>
    >;
    route: RouteProp<ProductsOverviewParamList, T>;
};

export type ProductsParamList = {
    ProductsOverview: NavigatorScreenParams<ProductsOverviewParamList>;
    ProductDetail: { id: string };
    Cart: undefined;
};

export type ProductsNavProps<T extends keyof ProductsParamList> = {
    navigation: CompositeNavigationProp<
        StackNavigationProp<ProductsParamList, T>,
        DrawerNavigationProp<MainParamList>
    >;
    route: RouteProp<ProductsParamList, T>;
};

export type OrderParamList = {
    Orders: undefined;
    OrderDetail: undefined;
};

export type OrderNavProps<T extends keyof OrderParamList> = {
    navigation: CompositeNavigationProp<
        StackNavigationProp<OrderParamList, T>,
        DrawerNavigationProp<MainParamList>
    >;
    route: RouteProp<OrderParamList, T>;
};

export type AccountParamList = {
    Auth: undefined;
    Account: undefined;
};

export type AccountNavProps<T extends keyof AccountParamList> = {
    navigation: CompositeNavigationProp<
        StackNavigationProp<AccountParamList, T>,
        DrawerNavigationProp<MainParamList>
    >;
    route: RouteProp<AccountParamList, T>;
};

export type MainParamList = {
    Products: NavigatorScreenParams<ProductsParamList>;
    Orders: NavigatorScreenParams<OrderParamList>;
    Account: NavigatorScreenParams<AccountParamList>;
};

export type MainNavProps<T extends keyof MainParamList> = {
    navigation: DrawerNavigationProp<MainParamList, T>;
    route: RouteProp<MainParamList, T>;
};
