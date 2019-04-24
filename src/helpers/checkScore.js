export const checkScore = ({ id, dice }) => {
  let sum = 0;

  switch (id) {
    case 'Ones':
      return (dice.match(/1/g) || []).length * 1;
    case 'Twos':
      return (dice.match(/2/g) || []).length * 2;
    case 'Threes':
      return (dice.match(/3/g) || []).length * 3;
    case 'Fours':
      return (dice.match(/4/g) || []).length * 4;
    case 'Fives':
      return (dice.match(/5/g) || []).length * 5;
    case 'Sixes':
      return (dice.match(/6/g) || []).length * 6;
    case 'Full House':
      if (
        !!dice.match(
          /([1-6])\1{1}(?!\1)([1-6])\2{2}|([1-6])\3{2}(?!\3)([1-6])\4{1}/g
        ) === true
      ) {
        return 25;
      }
      return 0;
    case 'Three of a Kind':
      sum = 0;
      if (!!dice.match(/([1-6])\1{2,}/g) === true) {
        for (let i = 0; i < dice.length; i++) {
          sum += parseInt(dice[i]);
        }
        return sum;
      }
      return sum;
    case 'Four of a Kind':
      sum = 0;
      if (!!dice.match(/([1-6])\1{3,}/g) === true) {
        for (let i = 0; i < dice.length; i++) {
          sum += parseInt(dice[i]);
        }
        return sum;
      }
      return sum;
    case 'Small Straight':
      if (
        !!dice.match(
          /(.?(1).?(2).?(3).?(4).?)|(.?(2).?(3).?(4).?(5).?)|(.?(3).?(4).?(5).?(6).?)/g
        )
      ) {
        return 30;
      }
      return 0;
    case 'Large Straight':
      if (!!dice.match(/(12345|23456)/g)) {
        return 40;
      }
      return 0;
    case 'Yahtzee':
      if (!!dice.match(/([1-6])\1{4}/g)) {
        return 50;
      }
      return 0;
    case 'Chance':
      sum = 0;
      for (let i = 0; i < dice.length; i++) {
        sum += parseInt(dice[i]);
      }
      return sum;
    default:
      return '-';
  }
};
