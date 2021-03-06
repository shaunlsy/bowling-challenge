"use strict";

// TODO: 
// strike, spare logic

function Bowling(pins = new Pins()) {
    this.pins = pins;
    this.score = 0;
    this.scores = [];
    this.totalScores = 0;
    this.scoreBoard = [
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null, null]
    ];
    this.frame = 0;
    this.roll = 0;
}

Bowling.prototype.possiblePins = function() {
    if (this.roll === 0) { return this.pins.knockDownPins() }
    return this.pins.knockDownPins(10 - this.scoreBoard[this.frame][0]);
};

Bowling.prototype.getScore = function() {
    return this.score
}

Bowling.prototype.play = function(knockDownPins = null) {
    if (knockDownPins === null) {
        this.scoreBoard[this.frame][this.roll] = this.possiblePins();
        this.score = this.scoreBoard[this.frame][this.roll];
    } else {
        if (this.roll === 1 && (this.scoreBoard[this.frame][0] + knockDownPins > 10)) {
            return this.moreThan10()
        }
        this.scoreBoard[this.frame][this.roll] = knockDownPins;
        this.score = this.scoreBoard[this.frame][this.roll];
    };
    this.nextRoll();
    this.nextFrame();
}

Bowling.prototype.moreThan10 = function() {
    var pinsLeft = (10 - this.scoreBoard[this.frame][0])
    return "Exceed max number of pins. Pick number smaller than " + pinsLeft;
}


Bowling.prototype.nextFrame = function() {
    if (this.strike()) {
        this.nextRoll();
    };
    if (this.roll === 0) {
        this.calculateScore();
        this.frame++;
    }
    if (this.frame === 9 && this.roll > 2) {
        this.calculateScore();
    }
}

Bowling.prototype.nextRoll = function() {
    if (this.frame === 9) { return this.roll++; }
    if (this.roll === 0) {
        this.roll = 1
    } else if (this.roll === 1) {
        this.roll = 0;
    }
}

Bowling.prototype.calculateScore = function() {
    // if (this.strike()) { this.scores.push(this.strikeScore()) }
    if (this.frame === 0) {
        this.scores.push(this._sum(this.scoreBoard[this.frame]))
    } else {
        this.scores.push(this._sum(this.scoreBoard[this.frame]) + (this.scores[this.frame - 1]));
    }
}

Bowling.prototype.strike = function(frame = this.frame) {
    return this.scoreBoard[frame][0] === 10;
}

Bowling.prototype.strikeScore = function(frame = this.frame) {
    this.scoreBoard[frame + 1][0] + this.scoreBoard[frame + 1][1] + 10
}

Bowling.prototype.spare = function(frame = this.frame) {
    if (frame > 0) {
        return (this.scoreBoard[frame - 1][0] + this.scoreBoard[frame - 1][1] === 10)
    }
}

Bowling.prototype._sum = function(array) {
    var total = 0;
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        total += array[i];
    }
    return total;
};

// Bowling.prototype.getScoresTotalEvery2Elements = function() {
//     for (var i = 0; i < this.scores.length; i += 2) {
//         var myChunk = this.scores.slice(i, i + 2);
//         this.totalScores.push(this._sum(myChunk));
//     }
//     return this.totalScores;
//     // return this.scores.reduce((a, b) => a + b, 0);
// };