import Time from './utils/Time';

export class Utils
{
  protected TimeHelper: Time;
  constructor()
  {
    this.TimeHelper = new Time();
  }

  public get time()
  {
    return this.TimeHelper;
  }
}

export default new Utils();
