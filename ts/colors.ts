const COLORS: string[] = [
  '#673ab7',
  '#f44336',
  '#3f51b5',
  '#03a9f4',
  '#8bc34a',
  '#009688',
  '#ff9800',
];

export class Color {
  /**
   *
   * @returns pretty color from the list
   */
  static getRandom() {
    return COLORS[Math.floor(Math.random() * (COLORS.length - 1))];
  }

  /**
   *
   * @returns tuple of 3 pretty colors from the list
   */
  static getThreeRandom(): [string, string, string] {
    return [this.getRandom(), this.getRandom(), this.getRandom()];
  }
}
