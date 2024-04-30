import {grab, poke} from "./gestures.js";

export class Hands {

    constructor(handsfree, convertPos) {
        this.handsfree = handsfree;
        this.handsfree.useGesture(grab);
        this.handsfree.useGesture(poke);
        this.handsfree.start();

        this.left = new Hand();
        this.right = new Hand();

        this.convertPos = convertPos;
    }

    update() {
        const hands = this.handsfree.data?.hands;
        if (!hands?.landmarks) return;

        this.left.update(
            this.convertPos(hands.landmarks[0][21]),
            this.convertPos(hands.landmarks[0][8])
        );
        this.left.gesture = hands.gesture[0]?.name;

        this.right.update(
            this.convertPos(hands.landmarks[1][21]),
            this.convertPos(hands.landmarks[1][8])
        );
        this.right.gesture = hands.gesture[1]?.name;
    }

    draw(getHandImage) {
        this.left.draw(getHandImage);
        this.right.draw(getHandImage);
    }
}

class Hand {
    constructor() {
        this.center = this.oldCenter = null;
        this.point = this.oldPoint = null;
        this.gesture = "";
    }

    update(center, point) {
        this.oldCenter = this.center;
        this.center = center;
        this.oldPoint = this.point;
        this.point = point;
    }

    draw(getHandImage) {
        if (!this.center) return;
        image(getHandImage(this.gesture), this.center.x - 100, this.center.y - 100, 200, 200);
    }
}