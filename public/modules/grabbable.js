const PADDING = 150;	

// a general class for grabbable objects
export class Grabbable {
	
	constructor(x, y, velocity, radius, childCallback) {
		this.pos = createVector(x, y);
		this.velocity = velocity;
		this.radius = radius;

		this.force = null;
		this.force_length = 0;
		this.force_time = 0;

		this.childCallback = childCallback;
	}

	updatePos(hand) {
		if (hand.gesture == "grab") {
			const grabbed = this.maybeGrab(hand.center, hand.oldCenter);
			if (grabbed) return;
		} else if (hand.gesture == "poke") {
			const poked = this.maybePoke(hand.point, hand.oldPoint);
			if (poked) return;
		} else if (hand.gesture == "pinch") {
			const pinched = this.maybePinch(hand.pinch, hand.oldPinch);
			if (pinched) return;
		}

		if (this.force && this.force_time > 0) {
			this.velocity.add(this.force);
			this.force_time -= 1;
		} else if (this.force && this.force_time > -this.force_length*10) {
			this.velocity.sub(p5.Vector.mult(this.force, 0.1));
			this.force_time -= 1;
		} else if (this.force && this.force_time == -this.force_length*10) {
			this.force = null;
		}
		
		this.pos.add(this.velocity);
		if (this.pos.x > windowWidth + PADDING) this.pos.x = -PADDING;
		if (this.pos.x < -PADDING) this.pos.x = windowWidth + PADDING;
	}

	maybeGrab(newHandPos, oldHandPos) {
		if (!newHandPos || !oldHandPos) return;
		if (newHandPos.dist(this.pos) < this.radius) {
			const dHandPos = p5.Vector.sub(newHandPos, oldHandPos);
			this.pos.add(dHandPos);
			return true;
		} 
	}

	maybePoke(newHandPos, oldHandPos) {
		if (!newHandPos || !oldHandPos) return;
		if (oldHandPos.dist(this.pos) > this.radius &&
			oldHandPos.dist(this.pos) < this.radius + 15) {
			if (!this.force) {
				this.force = p5.Vector.sub(this.pos, newHandPos);
				this.force.mult(0.001);
				this.force_length = 10;
				this.force_time = 10;
			}
			return true;
		} 
	}

	maybePinch(newHandPos, oldHandPos) {
		if (!newHandPos || !oldHandPos) return;
		if (newHandPos.dist(this.pos) < this.radius) {
			const child = this.makeChild(newHandPos.x, newHandPos.y);
			if (child) {
				this.childCallback(child);
			} else {
				const dHandPos = p5.Vector.sub(newHandPos, oldHandPos);
				this.pos.add(dHandPos);
			}
			return true;
		} 
	}

	makeChild() {}
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
		circle(this.pos.x - 30, this.pos.y - 30, 1.2 * this.radius);
		circle(this.pos.x + 30, this.pos.y - 10, 1.2 * this.radius);
		circle(this.pos.x - 50, this.pos.y + 20, 1.2 * this.radius);
		circle(this.pos.x + 10, this.pos.y + 20, 1.2 * this.radius);
	}

	makeChild(x, y) {
		return new Cloud3(x, y, p5.Vector.mult(this.velocity, 0.5), this.radius / 2, 255);
	}
}

export class Cloud2 extends Grabbable {
	draw() {
		fill(230);
		strokeWeight(0);
		circle(this.pos.x, this.pos.y, this.radius);
		circle(this.pos.x - 50, this.pos.y - 50, 1.2 * this.radius);
		circle(this.pos.x + 40, this.pos.y - 20, 1.2 * this.radius * 4/5);
		circle(this.pos.x - 30, this.pos.y + 20, 1.2 * this.radius);
		circle(this.pos.x + 40, this.pos.y + 40, 1.2 * this.radius * 2/3);
	}

	makeChild(x, y) {
		return new Cloud3(x, y, p5.Vector.mult(this.velocity, 0.5), this.radius / 2, 230);
	}
}

export class Cloud3 extends Grabbable {
	constructor(x, y, velocity, radius, color) {
		super(x, y, velocity, radius, null);
		this.color = color;
	}

	draw() {
		fill(this.color);
		strokeWeight(0);
		circle(this.pos.x, this.pos.y, this.radius);
	}
}