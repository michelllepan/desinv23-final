export class Hands {

    constructor(handsfree) {
        this.handsfree = handsfree;
        this.handsfree.useGesture({
            "name": "grab",
            "algorithm": "fingerpose",
            "models": "hands",
            "confidence": 5.0,
            "description": [
                ["addCurl", "Thumb", "HalfCurl", 0.9],
                ["addCurl", "Index", "FullCurl", 0.9],
                ["addCurl", "Middle", "FullCurl", 0.9],
                ["addCurl", "Ring", "FullCurl", 0.9],
                ["addCurl", "Pinky", "FullCurl", 0.9],
            ],
            "enabled": true,
        })
        this.handsfree.start();

        this.leftPos = createVector(0, 0);
	    this.leftPosOld = createVector(0, 0);
        this.leftGrab = false;

        this.rightPos = createVector(0, 0);
	    this.rightPosOld = createVector(0, 0);
        this.rightGrab = false;
    }

    update() {
        const hands = this.handsfree.data?.hands;
        if (!hands?.landmarks) return;
        
        // update positions
        this.leftPosOld = this.leftPos;
        this.leftPos = hands.landmarks[0][21];

        this.rightPosOld = this.rightPos;
        this.rightPos = hands.landmarks[1][21];

        // detect gestures
        if (!hands?.gesture) return;
        this.leftGrab = hands.gesture[0]?.name === "grab";
        this.rightGrab = hands.gesture[1]?.name === "grab";
    }

}