const PADDING = 100;	

// a general class for grabbable objects
export class Grabbable {
	
	constructor(x, y, speed, radius) {
		this.pos = createVector(x, y);
		this.speed = speed;
		this.radius = radius;
	}

	updatePos(hand) {
		if (hand.gesture == "grab") {
			const grabbed = this.maybeGrab(hand.center, hand.oldCenter);
			if (grabbed) return;
		}

		if (hand.gesture == "poke") {
			const poked = this.maybePoke(hand.point, hand.oldPoint);
			if (poked) return;
		}

		this.pos.x += this.speed;
		if (this.pos.x > windowWidth + PADDING) this.pos.x = -PADDING;
		if (this.pos.x < -PADDING) this.pos.x = windowWidth + PADDING;
	}

	maybeGrab(newPos, oldPos) {
		if (!newPos || !oldPos) return;

		if (newPos.dist(this.pos) < this.radius) {
			const dHandPos = p5.Vector.sub(newPos, oldPos);
			this.pos.add(dHandPos);
			return true;
		} 
	}

	maybePoke(newPos, oldPos) {
		if (!newPos || !oldPos) return;
	}
}

export class Sun extends Grabbable {
	draw() {
		fill("rgb(255,219,21)");
		stroke("rgb(255,161,22)");
		strokeWeight(10);
		circle(this.pos.x, this.pos.y, 2 * this.radius);
	}
}

export class Cloud1 extends Grabbable {
	draw() {
		fill(255);
		strokeWeight(0);
		circle(this.pos.x, this.pos.y, this.radius);
		circle(this.pos.x - 30, this.pos.y - 30, this.radius);
		circle(this.pos.x + 30, this.pos.y - 10, this.radius);
		circle(this.pos.x - 50, this.pos.y + 20, this.radius);
		circle(this.pos.x + 10, this.pos.y + 20, this.radius);
	}
}

export class Cloud2 extends Grabbable {
	draw() {
		fill(230);
		strokeWeight(0);
		circle(this.pos.x, this.pos.y, this.radius);
		circle(this.pos.x - 50, this.pos.y - 50, this.radius);
		circle(this.pos.x + 40, this.pos.y - 20, this.radius * 4/5);
		circle(this.pos.x - 30, this.pos.y + 20, this.radius);
		circle(this.pos.x + 40, this.pos.y + 40, this.radius * 2/3);
	}
}