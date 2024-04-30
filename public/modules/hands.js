import {grab, poke} from "./gestures.js";

export class Hands {

    constructor(handsfree, convertPos) {
        this.handsfree = handsfree;
        this.handsfree.useGesture(grab);
        this.handsfree.useGesture(poke);
        this.handsfree.start();

        this.leftCenter = null;
	    this.leftCenterOld = null;
        this.leftPoint = null;
        this.leftPointOld = null;
        this.leftGesture = null;

        this.rightCenter = null;
	    this.rightCenterOld = null;
        this.leftPoint = null;
        this.leftPointOld = null;
        this.rightGesture = null;

        this.convertPos = convertPos;
    }

    update() {
        const hands = this.handsfree.data?.hands;
        if (!hands?.landmarks) return;
        
        // update positions
        this.leftCenterOld = this.leftCenter;
        this.leftCenter = this.convertPos(hands.landmarks[0][21]);

        this.leftPointOld = this.leftPoint;
        this.leftPoint = this.convertPos(hands.landmarks[0][8]);

        this.rightCenterOld = this.rightCenter;
        this.rightCenter = this.convertPos(hands.landmarks[1][21]);

        this.rightPointOld = this.rightPoint;
        this.rightPoint = this.convertPos(hands.landmarks[1][8]);

        // detect gestures
        if (!hands?.gesture) return;
        this.leftGesture = hands.gesture[0]?.name;
        this.rightGesture = hands.gesture[1]?.name;
    }

}