class PokerHand {
  constructor(cards) {
    this.cards = cards;
    this.hand = {}
    this.cardArray = this.cards.split(' ');
    this.valueArray = [];
    this.suitArray = [];
    this.valueFrequencyCount = {};
  }

  separateValuesSuits() {
    for(let i = 0; i < this.cardArray.length; i++) {
      switch(this.cardArray[i][0]) {
        case 'A': this.valueArray.push(12)
          break;
        case 'K': this.valueArray.push(11);
          break;
        case 'Q': this.valueArray.push(10)
          break;
        case 'J': this.valueArray.push(9);
          break;
        case '1': this.valueArray.push(8)
          break;
        case '9': this.valueArray.push(7);
          break;
        case '8': this.valueArray.push(6)
          break;
        case '7': this.valueArray.push(5);
          break;
        case '6': this.valueArray.push(4);
          break;
        case '5': this.valueArray.push(3)
          break;
        case '4': this.valueArray.push(2);
          break;
        case '3': this.valueArray.push(1)
          break;
        case '2': this.valueArray.push(0);
          break;
        default: this.hand.isValid = false;
      }
      let suit = this.cardArray[i].split('').pop();
      this.suitArray.push(suit);
    }
    this.valueArray.sort(function(a, b){return a - b});
  }

  evaluateFlush() {
    if(this.suitArray[0] === this.suitArray[1] && this.suitArray[0] === this.suitArray[2] && this.suitArray[0] === this.suitArray[3] && this.suitArray[0] === this.suitArray[4]) {
      this.hand.isFlushHand = true;
    } else {
      this.hand.isFlushHand = false;
    }
  }

  evaluateStraight() {
    if(this.valueArray[4] - this.valueArray[0] === 4 && this.valueArray[3] - this.valueArray[0] === 3 && this.valueArray[2] - this.valueArray[0] === 2 && this.valueArray[1] - this.valueArray[0] === 1) {
      this.hand.isStraightHand = true;
    } else {
      this.hand.isStraightHand = false;
    }
  }

  evaluatePairings() {
    for(let i = 0; i < this.valueArray.length; i++) {
      if(this.valueFrequencyCount[this.valueArray[i]]) {
        this.valueFrequencyCount[this.valueArray[i]]++;
      } else {
        this.valueFrequencyCount[this.valueArray[i]] = 1;
      }
    }
    var pairingData = Object.values(this.valueFrequencyCount);

    if(pairingData.length !== 5) {
      this.hand.containsPairings = true;
    } else {
      this.hand.containsPairings = false;
    }
  }

  evaluateRanking() {
    var pairingData = Object.values(this.valueFrequencyCount);
    pairingData.sort(function(a, b){return a - b});

    if(this.hand.containsPairings) {
      if(pairingData.toString() == [1,1,1,2].toString()) {
        this.hand.rank = 'One Pair';
      } else if(pairingData.toString() == [1,2,2].toString()) {
        this.hand.rank = 'Two Pair';
      } else if(pairingData.toString() == [1,1,3].toString()) {
        this.hand.rank = 'Three Of A Kind';
      } else if(pairingData.toString() == [2,3].toString()) {
        this.hand.rank = 'Full House';
      } else if(pairingData.toString() == [1,4].toString()) {
        this.hand.rank = 'Four Of A Kind';
      }
    } else if(this.hand.isStraightHand && this.hand.isFlushHand) {
      if(this.valueArray[4] === 12) {
        this.hand.rank = 'Royal Flush';
      } else {
        this.hand.rank = 'Straight Flush';
      }
    } else if(this.hand.isStraightHand && !this.hand.isFlushHand) {
      this.hand.rank = 'Straight';
    } else if(!this.hand.isStraightHand && !this.hand.containsPairings && this.hand.isFlushHand) {
      this.hand.rank = 'Flush';
    } else {
      this.hand.rank = 'High Card'
    }
  }

  validateHand() {
    var validSuitCount = 0;
    var validValueCount = 0;
    if(this.cardArray.length !== 5) {
      this.hand.isValid = false;
    }
    for(let i = 0; i < this.cardArray.length; i++) {
      for(let j = i + 1; j < this.cardArray.length; j++) {
        if(this.cardArray[i] === this.cardArray[j]) {
          this.hand.isValid = false;
        }
      }
    }
    for(let i = 0; i < this.suitArray.length; i++) {
      if(this.suitArray[i] === 'd' || this.suitArray[i] === 'h' || this.suitArray[i] === 's' || this.suitArray[i] === 'c') {
        validSuitCount++;
      }
    }
    if(validSuitCount !== 5) {
      this.hand.isValid = false;
    }
    for(let i = 0; i < this.valueArray.length; i++) {
      if(this.valueArray[i] === 0 || this.valueArray[i] === 1 || this.valueArray[i] === 2 || this.valueArray[i] === 3 || this.valueArray[i] === 4 || this.valueArray[i] === 5 || this.valueArray[i] === 6 || this.valueArray[i] === 7 || this.valueArray[i] === 8 || this.valueArray[i] === 9 || this.valueArray[i] === 10 || this.valueArray[i] === 11 || this.valueArray[i] === 12) {
        validValueCount++;
      }
    }
    if(validValueCount !== 5) {
      this.hand.isValid = false;
    }
  }

  rankHand() {
    this.separateValuesSuits();
    this.evaluateFlush();
    this.evaluateStraight();
    this.evaluatePairings();
    this.evaluateRanking();
    this.validateHand();
    if(this.hand.isValid === false) {
      return 'Invalid Hand';
    } else {
      return this.hand.rank;
    }
  }
}

module.exports = PokerHand;
