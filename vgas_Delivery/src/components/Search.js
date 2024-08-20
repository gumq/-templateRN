
const Search = (data, value) => {
    const searchResults = [];

    data.forEach(parentItem => {
        const parentMatches = parentItem.Items.filter(item => {
            const itemKeys = Object.keys(item);
            return itemKeys.some(key => {
                if (item[key] && typeof item[key] === 'string') {
                    const stringValue = item[key].toString().toLowerCase();
                    return stringValue.includes(value.toLowerCase());
                }
                return false;
            });
        });

        if (parentMatches.length > 0) {
            searchResults.push({
                ...parentItem,
                Items: parentMatches
            });
        }
    });

    return searchResults;
};

export default Search;

