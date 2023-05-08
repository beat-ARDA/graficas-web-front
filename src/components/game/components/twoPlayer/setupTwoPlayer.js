import { Box3, MathUtils, MeshStandardMaterial } from "three";
import {
    keyboards,
    infoVillain,
    infoGame,
    villainsArray,
    bullettwoPlayerToDelete,
    villainsToDelete,
    bulletVillainToDelete,
    infoTwoPlayer,
    infoBulletTwoPlayer,
    bulletTwoPlayerToDelete
} from "../../helpers/helpers";

import { setupVillain } from "../villain/setupVillain";
import { colisiontwoPlayer, colisionVillain } from "../event";
import { AudioListener, AudioLoader, Audio } from "three";
import { AnimationMixer } from "three";
import { setupBulletTwoPlayer } from "../bulletTwoPlayer/setupBulletTwoPlayer";

function setupTwoPlayer(data, scene, loop, socket) {
    const twoPlayer = data.scene.children[0];

    twoPlayer.position.set(
        infoTwoPlayer.distance * Math.cos(MathUtils.degToRad(infoTwoPlayer.countDegrees)),
        infoTwoPlayer.positionY,
        infoTwoPlayer.distance * Math.sin(MathUtils.degToRad(infoTwoPlayer.countDegrees)));

    twoPlayer.rotation.y = MathUtils.degToRad(infoTwoPlayer.degreesRotation);

    twoPlayer.scale.set(infoTwoPlayer.scale, infoTwoPlayer.scale, infoTwoPlayer.scale);

    infoTwoPlayer.material = twoPlayer.material;

    const listener = new AudioListener();

    scene.add(listener);
    const audioLoader = new AudioLoader();
    const audio = new Audio(listener);

    const clip = data.animations[0];
    const mixer = new AnimationMixer(twoPlayer);
    const action = mixer.clipAction(clip);
    action.play(data.animations[0]);

    let materialShield = new MeshStandardMaterial({ color: 0xFFFF00 });

    const moveLeft = (socketId) => {
        if (socketId !== localStorage.getItem('socketId')) {
            infoTwoPlayer.left = true;
            infoTwoPlayer.viewLeft = true;
            infoTwoPlayer.viewRight = false;
        }

    }

    socket.on('moveLeft', moveLeft);

    const moveRight = (socketId) => {
        if (socketId !== localStorage.getItem('socketId')) {
            infoTwoPlayer.right = true;
            infoTwoPlayer.viewLeft = false;
            infoTwoPlayer.viewRight = true;
        }

    }

    socket.on('moveRight', moveRight);

    const moveUp = (socketId) => {
        if (socketId !== localStorage.getItem('socketId'))
            infoTwoPlayer.up = true;

    }

    socket.on('moveUp', moveUp);

    const moveDown = (socketId) => {
        if (socketId !== localStorage.getItem('socketId'))
            infoTwoPlayer.down = true;

    }

    socket.on('moveDown', moveDown);

    const moveLeaveLeft = (socketId) => {
        if (socketId !== localStorage.getItem('socketId'))
            infoTwoPlayer.left = false;

    }

    socket.on('moveLeaveLeft', moveLeaveLeft);

    const moveLeaveRight = (socketId) => {
        if (socketId !== localStorage.getItem('socketId'))
            infoTwoPlayer.right = false;

    }

    socket.on('moveLeaveRight', moveLeaveRight);

    const moveLeaveUp = (socketId) => {
        if (socketId !== localStorage.getItem('socketId'))
            infoTwoPlayer.up = false;

    }

    socket.on('moveLeaveUp', moveLeaveUp);

    const moveLeaveDown = (socketId) => {
        if (socketId !== localStorage.getItem('socketId'))
            infoTwoPlayer.down = false;

    }

    socket.on('moveLeaveDown', moveLeaveDown);

    const moveShoot = (socketId) => {
        if (socketId !== localStorage.getItem('socketId')) {
            audio.stop();
            //GENERAR BULLETS HEROE
            audioLoader.load('sounds/laser-sound.mp3', (buffer) => {
                audio.setBuffer(buffer);
                audio.setLoop(false);
                audio.setVolume(infoGame.volume);
                audio.play();
            });

            if (infoTwoPlayer.hasBullet) {
                for (let i = 0; i < 3; i++) {
                    const cloneBulletTwoPlayer = infoBulletTwoPlayer.bullet.scene.children[0].clone();
                    const bulletTwoPlayer = setupBulletTwoPlayer(
                        cloneBulletTwoPlayer,
                        scene,
                        twoPlayer.position,
                        infoTwoPlayer.countDegrees,
                        infoTwoPlayer.viewLeft,
                        infoTwoPlayer.viewRight,
                        i === 0 ? true : false,
                        i === 2 ? true : false, loop);

                    scene.add(bulletTwoPlayer);
                    loop.updatables.push(bulletTwoPlayer);
                }
            } else {

                const cloneBulletTwoPlayer = infoBulletTwoPlayer.bullet.scene.children[0].clone();

                const bulletTwoPlayer = setupBulletTwoPlayer(
                    cloneBulletTwoPlayer,
                    scene,
                    twoPlayer.position,
                    infoTwoPlayer.countDegrees,
                    infoTwoPlayer.viewLeft,
                    infoTwoPlayer.viewRight,
                    false,
                    false, loop);
                scene.add(bulletTwoPlayer);
                loop.updatables.push(bulletTwoPlayer);
            }
        }
    }

    socket.on('moveShoot', moveShoot);

    twoPlayer.tick = (delta) => {
        ////////////////////////////////////////////////////////////
        //                              ITEMS                     //
        ////////////////////////////////////////////////////////////
        if (infoTwoPlayer.hasShield) {
            infoTwoPlayer.countHasShield += 0.1;
            twoPlayer.material = materialShield;
            if (infoTwoPlayer.countHasShield >= infoTwoPlayer.timeToHasShield) {
                infoTwoPlayer.hasShield = false;
                infoTwoPlayer.countHasShield = 0;
                twoPlayer.material = infoTwoPlayer.material;
            }
        }

        if (infoTwoPlayer.hasBullet) {
            infoTwoPlayer.countHasBullet += 0.1;
            if (infoTwoPlayer.countHasBullet >= infoTwoPlayer.timeToHasBullet) {
                infoTwoPlayer.hasBullet = false;
                infoTwoPlayer.countHasBullet = 0;
            }
        }
        ////////////////////////////////////////////////////////////
        //                    MOVE TWO PLAYER                     //
        ////////////////////////////////////////////////////////////
        //Aumentar contador de grados
        if (infoTwoPlayer.left) {
            infoTwoPlayer.countDegrees += 0.6;
            mixer.update(delta);
        }
        else if (infoTwoPlayer.right) {
            infoTwoPlayer.countDegrees -= 0.6;
            mixer.update(delta);
        }
        //Subir o bajar nave
        if (infoTwoPlayer.down)
            twoPlayer.position.y -= 0.1;
        else if (infoTwoPlayer.up)
            twoPlayer.position.y += 0.1;
        //Rotar la nave
        if (infoTwoPlayer.right)
            twoPlayer.rotation.y = -infoTwoPlayer.distance * Math.sin(MathUtils.degToRad((180 + infoTwoPlayer.countDegrees) * 0.102));
        else if (infoTwoPlayer.left)
            twoPlayer.rotation.y = -infoTwoPlayer.distance * Math.sin(MathUtils.degToRad(infoTwoPlayer.countDegrees * 0.108));
        //Mover twoPlayer a la derecha o izquierda
        if (infoTwoPlayer.left || infoTwoPlayer.right) {
            twoPlayer.position.x = infoTwoPlayer.distance * Math.cos(MathUtils.degToRad(infoTwoPlayer.countDegrees));
            twoPlayer.position.z = infoTwoPlayer.distance * Math.sin(MathUtils.degToRad(infoTwoPlayer.countDegrees));
        }
        //Restablecer contador de grados al llegar al limite
        if (infoTwoPlayer.countDegrees >= 360)
            infoTwoPlayer.countDegrees = 0;
        else if (infoTwoPlayer.countDegrees <= -360)
            infoTwoPlayer.countDegrees = 0;

        /*///////////////////////////////////////////////////////////////////////////////////////
        //                     DELETE COLISIONS BULET HEROE WITH VILLAIN                       //
        /*///////////////////////////////////////////////////////////////////////////////////////

        bulletTwoPlayerToDelete.forEach(bulletTwoPlayer => {
            scene.remove(bulletTwoPlayer);
            loop.updatables.splice(loop.updatables.indexOf(bulletTwoPlayer), 1);
        });

        bulletTwoPlayerToDelete.splice(0, bulletTwoPlayerToDelete.length);
    };

    return twoPlayer;
}

export { setupTwoPlayer };