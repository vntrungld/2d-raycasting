class Particle {
  constructor(origin, radius = 1000) {
    this.origin = origin;
    this.radius = radius;
    this.rays = [];

    for (let angle = 0; angle < 360; angle += 3) {
      this.rays.push(new Ray(this.origin, angle, radius));
    }
  }

  setOrigin(origin) {
    this.origin = origin;

    this.rays.forEach(function (ray) {
      ray.origin = origin;
    });
  }

  render(ctx, boundaries) {
    this.rays.forEach(function (ray) {
      ray.render(ctx, boundaries);
    });
  }
}
