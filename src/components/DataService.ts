export const getDataSource = (key: string) => {
    return localStorage.getItem(key);
};

export const setDataSource = (key: string, data: string | Object | Number) => {
    return localStorage.setItem(key, JSON.stringify(data));
};
