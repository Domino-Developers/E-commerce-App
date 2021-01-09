const formatStatus = (status: string) => {
    switch (status) {
        case 'OR':
            return 'Ordered';
        case 'OFD':
            return 'Out for Delivery';
        case 'DL':
            return 'Delivered';
        default:
            return '-'
    }
};

export default formatStatus;
