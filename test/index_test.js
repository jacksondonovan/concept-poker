const assert = require('assert');
const PokerHand = require('../index');

describe('hand should be valid', function() {
  it('should hold 5 cards', function() {
    const hand = new PokerHand('As Ks Qs Js 10s 2c');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });
  it('should hold 5 unique cards', function() {
    const hand = new PokerHand('As Ks Qs Js Js');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });
  it('should contain only valid suits', function() {
    const hand = new PokerHand('10s 4s Js Jw Jm');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });
  it('should contain only valid values', function() {
    const hand = new PokerHand('Ad Rs Qd 4s 7s');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });
});

describe('hand should be assigned rank', function() {
  it('should recognize high card', function() {
    const hand = new PokerHand('10d 4s 3d Qh Ad');
    assert.equal(hand.rankHand(), 'High Card');
  });
  it('should recognize one pair', function() {
    const hand = new PokerHand('Ah As 10c 7d 6s');
    assert.equal(hand.rankHand(), 'One Pair');
  });
  it('should recognize two pair', function() {
    const hand = new PokerHand('Kh Kc 3s 3h 2d');
    assert.equal(hand.rankHand(), 'Two Pair');
  });
  it('should recognize three of a kind', function() {
    const hand = new PokerHand('Jc Js Jd 5d 2c');
    assert.equal(hand.rankHand(), 'Three Of A Kind');
  });
  it('should recognize straight', function() {
    const hand = new PokerHand('Jc 7s 8d 10d 9c');
    assert.equal(hand.rankHand(), 'Straight');
  });
  it('should recognize flush', function() {
    const hand = new PokerHand('Kh Qh 6h 2h 9h');
    assert.equal(hand.rankHand(), 'Flush');
  });
  it('should recognize full house', function() {
    const hand = new PokerHand('8d 8c 4c 4s 4h');
    assert.equal(hand.rankHand(), 'Full House');
  });
  it('should recognize four of a kind', function() {
    const hand = new PokerHand('Qh Qd Qc Qs 4h');
    assert.equal(hand.rankHand(), 'Four Of A Kind');
  });
  it('should recognize straight flush', function() {
    const hand = new PokerHand('4h 5h 7h 6h 3h');
    assert.equal(hand.rankHand(), 'Straight Flush');
  });
  it('should recognize royal flush', function() {
    const hand = new PokerHand('As Ks Qs Js 10s');
    assert.equal(hand.rankHand(), 'Royal Flush');
  });
});
