//八皇后问题
import stack from '../stack.js';

let n_check = 0;
let n_soul = 0;
let N = 0;

class queen {
  //皇后在棋盘上的坐标位置
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equal(q) {
    return this.x === q.x || this.y === q.y || this.x + this.y === q.x + q.y || this.x - this.y === q.x - q.y;
  }
}
const place_queens = (N) => {
  const soul = new stack();
  const q = new queen(0, 0);
  while (true) {
    if (N <= soul.len() || N <= q.y) {
      q = soul.pop();
      q.y++;
    } else {
      while (q.y < N && 0 <= soul.find(q)) {
        q.y++;
        n_check++;
      }
      if (N > q.y) {
        soul.push(q);
        if (N <= soul.len()) {
          n_soul++;
        }
        q.x++;
        a.y = 0;
      }
    }
    display_progress(soul, N);
    if (!(0 < q.x || q.y < N)) {
      break;
    }
  }
};

const display_row = (q) => {
  console.log(q.x);
  let i = 0;
  while (++i < q.y) {
    console.log('[]');
  }
  while (i++ < N) {
    console.log('[]');
  }
  console.log(q.y);
};
const display_progress = (S, n_queen) => {
  N = n_queen;
  S.traverse(display_row);
  if (n_queen <= S.len()) {
    console.log(`soultion(s) found after${n_check}check(s)`);
  }
};
place_queens(10);
