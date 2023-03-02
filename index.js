class Game {
  constructor() {
    this.gameController = this.initGameController();
    this.dimension = 8;
    this.obstacles = this.initObstacles();
    this.player = this.initPlayer();
    this.map = this.initMap(this.dimension);
  }

  checkForColliosion(location1, location2) {
    return this.calcFieldId(location1) === this.calcFieldId(location2);
  }

  gameControlHandler(event) {
    this.destLocation.x = this.player.location.x;
    this.destLocation.y = this.player.location.y;
    switch (event.code) {
      case 'SPACE':
        console.log('SPACEBAR');

        break;
      case 'ArrowLeft':
        this.player.moveWest(this.dimension);

        break;
      case 'ArrowUp':
        this.player.moveNorth(this.dimension);

        break;
      case 'ArrowRight':
        this.player.moveEast(this.dimension);

        break;
      case 'ArrowDown':
        this.player.moveSouth(this.dimension);

        break;
      case 'KeyS':
        this.showStatus();

        break;
      default:
        console.log('event key: ', event.code);
    }

    this.obstacles.forEach((obstacle) => {
      if (this.checkForColliosion(obstacle.location, this.player.location)) {
        console.log('Boom');
      } else {
        this.player.updateLocation();
      }
    });
  }

  calcFieldId(location) {
    return location.x * this.dimension + location.y;
  }

  calcRandomIntWithMax(max) {
    return Math.floor(Math.random() * max);
  }

  initGameController() {
    return document.addEventListener('keyup', (event) => {
      this.gameControlHandler(event);
    });
  }

  initObstacles() {
    const arr = [];
    for (let i = 0; i < this.dimension; i++) {
      console.log('create an obstacles');
      const x = this.calcRandomIntWithMax(this.dimension);
      const y = this.calcRandomIntWithMax(this.dimension);
      const obstacle = new Obstacle(this.calcFieldId({ x: x, y: y }), x, y);
      arr.push(obstacle);
    }
    console.log(arr);
    return arr;
  }

  initPlayer() {
    // const playerName = prompt('Give your player a name:');
    const playerName = 'Billy Bob';
    console.log('player born');
    return new Player(playerName);
  }

  initMap(dimension) {
    return new Map(dimension);
  }

  showStatus() {
    const fieldId = this.calcFieldId(this.player.location);
    console.log(this.player.showStatus());
    console.log(this.player.name, 'stands on field no.: ', fieldId);
    console.log('field:', this.map.getFieldById(fieldId));
  }
}

class Obstacle {
  constructor(id, x, y) {
    this.fieldId = id;
    this.location = {
      x: x,
      y: y,
    };
    this.type = 'flower';
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.location = {
      x: 0,
      y: 0,
    };
    this.destLocation = {
      x: x,
      y: y,
    };
  }
  moveEast(limit) {
    if (this.destLocation.x < limit - 1) {
      console.log('move East');
      this.destLocation.x++;
    } else {
      console.log('end of map');
    }
  }
  moveNorth(limit) {
    if (this.destLocation.y > 0) {
      console.log('move North');
      this.destLocation.y--;
    } else {
      console.log('end of map');
    }
  }
  moveSouth(limit) {
    if (this.destLocation.y < limit - 1) {
      console.log('move South');
      this.destLocation.y++;
    } else {
      console.log('end of map');
    }
  }
  moveWest(limit) {
    if (this.destLocation.x > 0) {
      console.log('move West');
      this.destLocation.x--;
    } else {
      console.log('end of map');
    }
  }

  updateLocation() {
    this.location = [...destLocation];
  }

  showStatus() {
    return `My name is ${this.name} and I am currently at location ${this.location.x}/${this.location.y}.`;
  }
}

class Map {
  constructor(dimension) {
    this.dimension = dimension;
    this.fields = this.initFields();
  }

  initFields() {
    const fields = [];
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        fields.push(new Field(i * this.dimension + j, i, j));
      }
    }
    return fields;
  }

  getFieldById(id) {
    return this.fields.filter((field) => field.id === id)[0];
  }
}

class Field {
  constructor(id, x, y) {
    this.fieldId = id;
    this.location = {
      x: x,
      y: y,
    };
  }
}

const game = new Game();
