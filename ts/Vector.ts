export interface VectorI {
  x: number;
  y: number;
}

/**
 * Simple vector with x, y properties
 */
export class Vector implements VectorI {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector) {
    return new Vector(vector.x + this.x, vector.y + this.y);
  }

  multiply(scalar: number) {
    return new Vector(scalar * this.x, scalar * this.y);
  }
}
