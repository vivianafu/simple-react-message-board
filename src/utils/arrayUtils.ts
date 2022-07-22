export const reverseArray = <T>(dataSource: Array<T>) => {
    const result = [];
    for (let i = dataSource.length - 1; i >= 0; i--) {
        result.push(dataSource[i]);
    }
    return result;
};
