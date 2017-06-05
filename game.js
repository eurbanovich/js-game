'use strict';
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error ('Можно прибавлять к вектору только вектор типа Vector');
    }
    this.x += vector.x;
    this.y += vector.y;
    return new Vector(this.x, this.y);
  }

  times(n) {
    this.x *= n;
    this.y *= n;
    return new Vector(this.x, this.y);
  }
}

class Actor {
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {
    if (!(pos instanceof Vector)) {
      throw new Error ('pos не является объектом типа Vector');
    }
    if (!(size instanceof Vector)) {
      throw new Error ('size не является объектом типа Vector');
    }
    if (!(speed instanceof Vector)) {
      throw new Error ('speed не является объектом типа Vector');
    }
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.act = function() {
    };
    Object.defineProperty(this, "type", {
      value: "actor",
      writable: false, // запретить присвоение
      // configurable: false // запретить удаление
    });
    // this.type = "actor";
  }

  get left() {
    return this.pos.x;
  }

  get top() {
    return this.pos.y;
  }

  get right() {
    return this.pos.x + this.size.x;
  }

  get bottom() {
    return this.pos.y + this.size.y;
  }

  isIntersect(moveObj) {
    if (!(moveObj instanceof Actor) || (moveObj === undefined)) {
      throw new Error ('pos не является объектом типа Vector');
    }
    if ((this === moveObj || (this - moveObj)!=0)) {
      return false;
    } //else if ((this.pos >= moveObj.pos && this.size <= moveObj.size) || (this.pos <= moveObj.pos && this.size <= moveObj.size) || (this.pos>= moveObj.pos && this.size >= moveObj.size)) {
    //   return true;
    // }
    if ((this.pos === moveObj.pos) && (this.size === moveObj.size)) {
      return true;
    }
  }
}

// Object.defineProperty(this, "type", {
//     value: 'actor',
//     writable: false, // запретить присвоение
//     // configurable: false // запретить удаление
//   });

class Level {
  constructor(grid = [] , actors) {
    this.grid = grid;
    this.actors = actors;
    this.player = {type: 'player'};
    this.height = this.grid.length;
    this.width = Math.max(...this.grid.reduce((memo, el) => {memo.push(el.length); return memo},[]));
    this.status = null;
    this.finishDelay = 1;
  }

  isFinished() {
    if (this.status !=0 && this.finishDelay < 0) {
      return true;
    } else {
      return false;
    }
  }

  actorAt(moveObj) {
    if (!(moveObj instanceof Actor) || (moveObj === undefined)) {
      throw new Error ('объект не является объектом типа Actor');
    }
    if (Actor.isIntersect(moveObj) === false) {
      return undefined;
    }
    return moveObj;
  }
}
