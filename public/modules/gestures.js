export const grab = {
    "name": "grab",
    "algorithm": "fingerpose",
    "models": "hands",
    "confidence": 5.0,
    "description": [
        ["addCurl", "Thumb", "HalfCurl", 0.5],
        ["addCurl", "Index", "FullCurl", 0.9],
        ["addCurl", "Middle", "FullCurl", 0.9],
        ["addCurl", "Ring", "FullCurl", 0.9],
        ["addCurl", "Pinky", "FullCurl", 0.9],
    ],
    "enabled": true,
};

export const poke = {
    "name": "poke",
    "algorithm": "fingerpose",
    "models": "hands",
    "confidence": 5.0,
    "description": [
        ["addCurl", "Thumb", "HalfCurl", 0.5],
        ["addCurl", "Index", "NoCurl", 0.9],
        ["addCurl", "Middle", "FullCurl", 0.9],
        ["addCurl", "Ring", "FullCurl", 0.9],
        ["addCurl", "Pinky", "FullCurl", 0.9],
    ],
    "enabled": true,
};