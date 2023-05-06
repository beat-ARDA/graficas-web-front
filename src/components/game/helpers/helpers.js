let cameraHeroePosition = 90;

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
  "volume": 0.2,
  "dificulty": 'easy'
}

export const infoVillain = {
  "model": null,
  "animations": null,
  "score": 3,
}

export let villainsArray = [];

export let bulletVillainToDelete = [];

export let bulletHeroeToDelete = [];

export let villainsToDelete = [];

export const infoHeroe = {
  "scale": 0.07,
  "degreesRotation": 90,
  "distance": 10,
  "countDegrees": cameraHeroePosition,
  "positionY": 0,
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
  "countDegrees": cameraHeroePosition
}

export const infoBulletHeroe = {
  "bullet": null
}

export const infoBulletVillain = {
  "bullet": null
}

export const renderer_ = null;