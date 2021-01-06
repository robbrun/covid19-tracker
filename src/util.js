export const sortData = (data) => {
    const sortedData = [...data];

    /* sort everything based on number of cases */
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

