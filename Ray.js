class Ray {
  constructor(origin, angle, radius = 1000) {
    this.origin = origin;
    this.angle = angle;
    this.radius = radius;
  }

  intersect(boundary) {
    const a = this.origin;
    const b = this.getEndPoint();
    const c = boundary.a;
    const d = boundary.b;

    const denominator = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);

    if (denominator === 0) {
      return null;
    }

    const numerator1 = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
    const numerator2 = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);

    const r = numerator1 / denominator;
    const s = numerator2 / denominator;

    if (r < 0 || r > 1 || s < 0 || s > 1) {
      return null;
    }

    return new Coordinate(a.x + r * (b.x - a.x), a.y + r * (b.y - a.y));
  }

  getEndPoint() {
    const nTheta = this.angle * Math.PI / 180;

    return new Coordinate(this.origin.x + this.radius * Math.cos(nTheta), this.origin.y + this.radius * Math.sin(nTheta));
  }

  getLength(endPoint) {
    return Math.sqrt(Math.pow(endPoint.x - this.origin.x, 2) + Math.pow(endPoint.y - this.origin.y, 2));
  }

  render(ctx, boundaries) {
    let endPoint = this.getEndPoint();
    let maxLength = this.radius;
    let intersection = null;

    boundaries.forEach(function (boundary) {
      intersection = this.intersect(boundary);

      if (intersection && this.getLength(intersection) < maxLength) {
        endPoint = intersection;
        maxLength = this.getLength(intersection);
      }
    }, this);

    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
  }
}
