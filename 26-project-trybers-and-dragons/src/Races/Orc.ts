import Race from './Race';

class Orc extends Race {
  private _maxLifePoints: number;
  private static _instances = 0;

  constructor(name: string, desterity: number) {
    super(name, desterity);

    this._maxLifePoints = 74;
    Orc._instances += 1;
  }

  static createdRacesInstances(): number {
    return Orc._instances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }
}

export default Orc;