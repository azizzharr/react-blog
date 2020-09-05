const getSearchParam = (search, key) => {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(key);
}

export default getSearchParam;
