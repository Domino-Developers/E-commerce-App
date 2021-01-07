export interface Address {
    name: string;
    address1: string;
    address2: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
}

export interface User {
    name: string;
    email: string;
    phone: string;
    addressSet: Address[];
}
