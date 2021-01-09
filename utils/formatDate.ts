const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toDateString();
};

export default formatDate;
