export const paginateResponse = ((data: any, page: number, limit: number): any => {
    const [result, total] = data;
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? undefined : page + 1;
    const prevPage = page - 1 < 1 ? undefined : page - 1;
    return {
        statusCode: 'success',
        data: [...result],
        count: total,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
    };
});
