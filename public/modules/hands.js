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

        this.left.update_pos(
            this.convertPos(hands.landmarks[0][21]),
            this.convertPos(hands.landmarks[0][8]),
            this.convertPos(hands.curPinch?.[0][0])
        );
        this.left.update_gesture(hands.gesture[0]?.name, hands.pinchState?.[0][0])

        this.right.update_pos(
            this.convertPos(hands.landmarks[1][21]),
            this.convertPos(hands.landmarks[1][8]),
            this.convertPos(hands.curPinch?.[1][0])
        );
        this.right.update_gesture(hands.gesture[1]?.name, hands.pinchState?.[1][0])
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
        this.pinch = this.oldPinch = null;
        this.gesture = "";
    }

    update_pos(center, point, pinch) {
        this.oldCenter = this.center;
        this.center = center;
        this.oldPoint = this.point;
        this.point = point;
        this.oldPinch = this.pinch;
        this.pinch = pinch;
    }

    update_gesture(gesture, pinchState) {
        if (gesture) {
            this.gesture = gesture;
        } else if (pinchState == "held") {
            this.gesture = "pinch";
        } else {
            this.gesture = "";
        }
    }

    draw(getHandImage) {
        if (!this.center) return;
        image(getHandImage(this.gesture), this.center.x - 100, this.center.y - 100, 200, 200);
    }
}