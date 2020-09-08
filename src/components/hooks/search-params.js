const getSearchParam = (search, key) => {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(key);
}

const setSearchParam = (search, key, value) => {
    const urlParams = new URLSearchParams(search);
    urlParams.set(key, value);
    return urlParams.toString()
}

export {setSearchParam};
export default getSearchParam;
