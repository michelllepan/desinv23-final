export class Hands {

    constructor(handsfree, convertPos) {
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
        this.leftGesture = null;

        this.rightPos = createVector(0, 0);
	    this.rightPosOld = createVector(0, 0);
        this.rightGesture = null;

        this.convertPos = convertPos;
    }

    update() {
        const hands = this.handsfree.data?.hands;
        if (!hands?.landmarks) return;
        
        // update positions
        this.leftPosOld = this.leftPos;
        this.leftPos = this.convertPos(hands.landmarks[0][21]);

        this.rightPosOld = this.rightPos;
        this.rightPos = this.convertPos(hands.landmarks[1][21]);

        // detect gestures
        if (!hands?.gesture) return;
        this.leftGesture = hands.gesture[0]?.name;
        this.rightGesture = hands.gesture[1]?.name;
    }

}