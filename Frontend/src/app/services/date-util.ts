export class DateUtil {

    /**
     * Calculate the number of day between two dates
     * @param startDate
     * @param endDate
     * @return the number of day in difference
     */
    public static calculateDaysBetween(startDate: Date, endDate: Date): number {
        const dayInMillisecond = 1000 * 60 * 60 * 24;
        const day = (endDate.getTime() - startDate.getTime()) / dayInMillisecond;
        return Math.round(day);
    }

    /**
     * Add 24 hours to date
     * For example:
     * before add : date = "2020-01-01"
     * after add : date = "2020-01-01 23:59:59:999"
     * @param date
     */
    public static addTwentyFourHours(date: Date): Date {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
    }

}
