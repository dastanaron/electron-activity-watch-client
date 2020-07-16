export default class TimeHelper {
    /**
     * @param secondsCount
     */
    public secondsToTime(secondsCount: number): string {
        const hours = Math.floor(secondsCount / 60 / 60);
        const minutes = Math.floor(secondsCount / 60) - hours * 60;
        const seconds = secondsCount % 60;
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0'),
        ].join(':');
    }
}
