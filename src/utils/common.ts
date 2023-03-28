export const paginateResponse = ((data: any, limit: number, page: number): any => {
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


export const convertHourstoMinute = (hourMinuteString: string) => {
    const hour: any = hourMinuteString.split(':')[0];
    const minute = hourMinuteString.split(':')[1];
    return Math.floor(hour * 60) + parseInt(minute);
}

export const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}
function padToTwoDigits(num: number) {
    return num.toString().padStart(2, '0');
}
