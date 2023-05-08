export const keyboards = {
  "w": 87,
  "s": 83,
  "a": 65,
  "d": 68,
  "space": 32,
  "esc": 27
}

export const infoGame = {
  "levels": 3,
  "level": 1,
  "createdVillains": false,
  "villainsDeleted": 0,
  "score": 0,
  "scene": 1,
  "volume": 0.4,
  "dificulty": 'easy',
  "mode": '',
  "session": []
}

export const infoVillain = {
  "model": null,
  "animations": null,
  "score": 3,
}

export let villainsArray = [];

export let bulletVillainToDelete = [];

export let bulletHeroeToDelete = [];

export let bulletTwoPlayerToDelete = [];

export let villainsToDelete = [];

export const infoHeroe = {
  "scale": 0.07,
  "degreesRotation": 90,
  "distance": 10,
  "countDegrees": 0,
  "positionY": -4,
  "hasShield": false,
  "timeToHasShield": 15,
  "countHasShield": 0,
  "hasBullet": false,
  "timeToHasBullet": 10,
  "countHasBullet": 0,
  "countShiled": 5,
  "lifes": 3,
  "left": false,
  "right": false,
  "viewLeft": false,
  "viewRight": true,
  "down": false,
  "up": false,
  "material": null,
  "model": null
};

export const infoTwoPlayer = {
  "scale": 0.07,
  "degreesRotation": 90,
  "distance": 10,
  "countDegrees": 0,
  "positionY": -4,
  "hasShield": false,
  "timeToHasShield": 15,
  "countHasShield": 0,
  "hasBullet": false,
  "timeToHasBullet": 10,
  "countHasBullet": 0,
  "countShiled": 5,
  "lifes": 3,
  "left": false,
  "right": false,
  "viewLeft": false,
  "viewRight": true,
  "down": false,
  "up": false,
  "material": null,
  "model": null
};

export const infoCamera = {
  "left": false,
  "right": false,
  "distance": 20,
  "countDegrees": 0
}

export const infoBulletHeroe = {
  "bullet": null
}

export const infoBulletTwoPlayer = {
  "bullet": null
}

export const infoBulletVillain = {
  "bullet": null
}

export const renderer_ = null;

export const userData = {
  "user_name": ''
}