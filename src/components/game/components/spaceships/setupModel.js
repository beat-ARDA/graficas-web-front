import { MathUtils } from "three";
import { createBullet } from "./bullets/bullets";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');

function setupModelP1(data, scene) {
    let bulletsLeft = [];
    let bulletsRight = [];
    let bulletsDelete = [];
    let bulletMove = false;
    let left = true;
    let right = false;
    let arriba, abajo = false;

    const model = data.scene.children[0];

    model.tick = (delta) => {
        if (bulletMove) {
            bulletsLeft.map((bullet) => {
                bullet.position.x -= 0.05;
                if (bullet.position.x <= -2)
                    bulletsDelete.push(bullet);
            });

            bulletsRight.map((bullet) => {
                bullet.position.x += 0.05;
                if (bullet.position.x >= 2)
                    bulletsDelete.push(bullet);
            });
        }

        bulletsDelete.map((bullet) => scene.remove(bullet));
        bulletsDelete = [];

        if (arriba)
            model.position.y += 0.1;
        else if (abajo)
            model.position.y -= 0.1;
    };

    document.addEventListener("keydown", onDocumentKeyDown, false);
    async function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 65) {
            left = true;
            right = false;
            model.rotation.y = MathUtils.degToRad(275);
            socket.emit('moveLeft');
        } else if (keyCode == 68) {
            left = false;
            right = true;
            model.rotation.y = MathUtils.degToRad(90);
            socket.emit('moveRight');
        } else if (keyCode == 87) {
            arriba = true;
            socket.emit('moveUp');
        }
        else if (keyCode == 83) {
            abajo = true;
            socket.emit('moveDown');
        }
        else if (keyCode == 32) {
            let bullet = createBullet(model);
            if (left)
                bulletsLeft.push(bullet);
            else if (right)
                bulletsRight.push(bullet);
            scene.add(bullet);
            bulletMove = true;
            socket.emit('shoot');
        }
    };

    document.addEventListener("keyup", onDocumentKeyUp, false);
    async function onDocumentKeyUp(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            arriba = false;
            socket.emit('moveLeaveUp');
        }
        else if (keyCode == 83) {
            abajo = false;
            socket.emit('moveLeaveDown');
        }
    };

    return model;
}

function setupModelP2(data, scene) {
    let bulletsLeft = [];
    let bulletsRight = [];
    let bulletsDelete = [];
    let bulletMove = false;
    let left = true;
    let right = false;
    let arriba, abajo = false;

    const model = data.scene.children[0];

    model.tick = (delta) => {
        if (bulletMove) {
            bulletsLeft.map((bullet) => {
                bullet.position.x -= 0.05;
                if (bullet.position.x <= -2)
                    bulletsDelete.push(bullet);
            });

            bulletsRight.map((bullet) => {
                bullet.position.x += 0.05;
                if (bullet.position.x >= 2)
                    bulletsDelete.push(bullet);
            });
        }

        bulletsDelete.map((bullet) => scene.remove(bullet));
        bulletsDelete = [];

        if (arriba)
            model.position.y += 0.1;
        else if (abajo)
            model.position.y -= 0.1;
    };

    socket.on('moveLeft', () => {
        left = true;
        right = false;
        model.rotation.y = MathUtils.degToRad(275);
    });

    socket.on('moveRight', () => {
        left = false;
        right = true;
        model.rotation.y = MathUtils.degToRad(90);
    });

    socket.on('moveUp', () => {
        arriba = true;
    });

    socket.on('moveLeaveUp', () => {
        arriba = false;
    });

    socket.on('moveDown', () => {
        abajo = true;
    });

    socket.on('moveLeaveDown', () => {
        abajo = false;
    });

    socket.on('shoot', () => {
        console.log('shot');
        let bullet = createBullet(model);
        if (left)
            bulletsLeft.push(bullet);
        else if (right)
            bulletsRight.push(bullet);
        scene.add(bullet);
        bulletMove = true;
    });

    return model;
}


export { setupModelP1, setupModelP2 };