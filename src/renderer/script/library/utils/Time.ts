export default class Time {

  /**
   * @param secondsCount
   */
  public secondsToTime(secondsCount: number): string
  {
    let hours = Math.floor(secondsCount / 60 / 60);
    let minutes = Math.floor(secondsCount / 60) - (hours * 60);
    let seconds = secondsCount % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }
}
