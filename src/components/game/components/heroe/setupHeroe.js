import { Box3, MathUtils, MeshStandardMaterial } from "three";
import {
    keyboards,
    infoHeroe,
    infoBulletHeroe,
    infoVillain,
    infoGame,
    villainsArray,
    bulletHeroeToDelete,
    villainsToDelete,
    bulletVillainToDelete
} from "../../helpers/helpers";
import { setupBulletHeroe } from "../bulletHeroe/setupBulletHeroe";
import { setupVillain } from "../villain/setupVillain";
import { colisionHeroe, colisionVillain, winner } from "../event";
import { AudioListener, AudioLoader, Audio } from "three";
import { AnimationMixer } from "three";
import { insertScoreOnePlayer, insertScoreTwoPlayer } from "../../../../services/services";
import { userData } from "../../helpers/helpers";

function setupHeroe(data, scene, loop, socket) {

    const heroe = data.scene.children[0];
    let indexVillainsToDelete = [];
    let materialShield = new MeshStandardMaterial({ color: 0xFFFF00 });

    heroe.position.set(
        infoHeroe.distance * Math.cos(MathUtils.degToRad(infoHeroe.countDegrees)),
        infoHeroe.positionY,
        infoHeroe.distance * Math.sin(MathUtils.degToRad(infoHeroe.countDegrees)));

    heroe.rotation.y = MathUtils.degToRad(infoHeroe.degreesRotation);

    heroe.scale.set(infoHeroe.scale, infoHeroe.scale, infoHeroe.scale);

    infoHeroe.material = heroe.material;

    const listener = new AudioListener();

    scene.add(listener);
    const audioLoader = new AudioLoader();
    const audio = new Audio(listener);

    const clip = data.animations[0];
    const mixer = new AnimationMixer(heroe);
    const action = mixer.clipAction(clip);
    action.play(data.animations[0]);

    heroe.tick = (delta) => {
        if (infoGame.villainsDeleted === 27) {
            audio.stop();
            audioLoader.load('sounds/win.mp3', (buffer) => {
                audio.setBuffer(buffer);
                audio.setLoop(false);
                audio.setVolume(1);
                audio.play();
            });
            loop.stop();
            infoGame.winner = localStorage.getItem('socketId');
            winner();
            insertScoreOnePlayer({ "user_name": userData.user_name, "score": infoGame.score });
        }
        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                     COUNT ITEMS                                      //
        /*///////////////////////////////////////////////////////////////////////////////////////

        if (infoHeroe.hasShield) {
            infoHeroe.countHasShield += 0.1;
            heroe.material = materialShield;
            if (infoHeroe.countHasShield >= infoHeroe.timeToHasShield) {
                infoHeroe.hasShield = false;
                infoHeroe.countHasShield = 0;
                heroe.material = infoHeroe.material;
            }
        }

        if (infoHeroe.hasBullet) {
            infoHeroe.countHasBullet += 0.1;
            if (infoHeroe.countHasBullet >= infoHeroe.timeToHasBullet) {
                infoHeroe.hasBullet = false;
                infoHeroe.countHasBullet = 0;
            }
        }

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                     VALIDATE LIFES                                   //
        /*///////////////////////////////////////////////////////////////////////////////////////
        if (infoHeroe.lifes === 0) {
            audio.stop();

            audioLoader.load('sounds/game-over.mp3', (buffer) => {
                audio.setBuffer(buffer);
                audio.setLoop(false);
                audio.setVolume(1);
                audio.play();
            });

            loop.stop();
            infoGame.winner = 'p2';
            winner();

            if (infoGame.mode === 'OnePlayer')
                insertScoreOnePlayer({ "user_name": userData.user_name, "score": infoGame.score });
        }

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                     CREATE VILLAINS                                  //
        /*///////////////////////////////////////////////////////////////////////////////////////
        if (socket === null) {
            if (infoGame.level === 1 && !infoGame.createdVillains) {
                for (let i = 0; i < 3; i++) {

                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        false,
                        true,
                        infoHeroe.countDegrees + 90,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        false,
                        true,
                        infoHeroe.countDegrees - 90,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                infoGame.createdVillains = true;
            }

            if (infoGame.level === 2 && !infoGame.createdVillains) {
                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees + 90,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees - 90,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees + 180,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                infoGame.createdVillains = true;
            }

            if (infoGame.level === 3 && !infoGame.createdVillains) {
                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees + 45,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees + 90,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees + 135,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                for (let i = 0; i < 3; i++) {
                    const cloneVillain = infoVillain.model.scene.children[0].clone();
                    const villain = setupVillain(
                        scene,
                        loop,
                        cloneVillain,
                        true,
                        false,
                        infoHeroe.countDegrees + 180,
                        i, infoVillain.animations);

                    scene.add(villain);
                    loop.updatables.push(villain);

                    villainsArray.push(villain);
                }

                infoGame.createdVillains = true;
            }
        }

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                        MOVE HEROE                                    //
        /*///////////////////////////////////////////////////////////////////////////////////////
        //Aumentar contador de grados
        if (infoHeroe.left) {
            infoHeroe.countDegrees += 0.6;
            mixer.update(delta);
        }
        else if (infoHeroe.right) {
            infoHeroe.countDegrees -= 0.6;
            mixer.update(delta);
        }
        //Subir o bajar nave
        if (infoHeroe.down)
            heroe.position.y -= 0.1;
        else if (infoHeroe.up)
            heroe.position.y += 0.1;
        //Rotar la nave
        if (infoHeroe.right)
            heroe.rotation.y = -infoHeroe.distance * Math.sin(MathUtils.degToRad((180 + infoHeroe.countDegrees) * 0.102));
        else if (infoHeroe.left)
            heroe.rotation.y = -infoHeroe.distance * Math.sin(MathUtils.degToRad(infoHeroe.countDegrees * 0.108));
        //Mover heroe a la derecha o izquierda
        if (infoHeroe.left || infoHeroe.right) {

            heroe.position.x = infoHeroe.distance * Math.cos(MathUtils.degToRad(infoHeroe.countDegrees));
            heroe.position.z = infoHeroe.distance * Math.sin(MathUtils.degToRad(infoHeroe.countDegrees));
        }
        //Restablecer contador de grados al llegar al limite
        if (infoHeroe.countDegrees >= 360)
            infoHeroe.countDegrees = 0;
        else if (infoHeroe.countDegrees <= -360)
            infoHeroe.countDegrees = 0;

        /*///////////////////////////////////////////////////////////////////////////////////////
        //                     DELETE COLISIONS BULET HEROE WITH VILLAIN                       //
        /*///////////////////////////////////////////////////////////////////////////////////////

        bulletHeroeToDelete.forEach(bulletHeroe => {
            scene.remove(bulletHeroe);
            loop.updatables.splice(loop.updatables.indexOf(bulletHeroe), 1);
        });

        bulletHeroeToDelete.splice(0, bulletHeroeToDelete.length);

        villainsToDelete.forEach(villain => {
            scene.remove(villain);
            loop.updatables.splice(loop.updatables.indexOf(villain), 1);
        });

        villainsToDelete.splice(0, villainsToDelete.length);

        bulletVillainToDelete.forEach(bulletVillain => {
            scene.remove(bulletVillain);
            loop.updatables.splice(loop.updatables.indexOf(bulletVillain), 1);
        });

        bulletVillainToDelete.splice(0, bulletVillainToDelete.length);


        /*///////////////////////////////////////////////////////////////////////////////////////
        //                            COLISIONS HEROE VILLAIN                                  //
        /*///////////////////////////////////////////////////////////////////////////////////////

        villainsArray.forEach((villain, index) => {

            let boxHeroe = new Box3().setFromObject(heroe);
            let boxVillain = new Box3().setFromObject(villain);

            if (boxVillain.intersectsBox(boxHeroe)) {
                audio.stop();

                audioLoader.load('sounds/colision.mp3', (buffer) => {
                    audio.setBuffer(buffer);
                    audio.setLoop(false);
                    audio.setVolume(1);
                    audio.play();
                });
                scene.remove(villain);
                villainsToDelete.push(villain);
                indexVillainsToDelete.push(index);

                infoGame.villainsDeleted++;
                infoGame.score += infoVillain.score;
                colisionVillain();

                if (!infoHeroe.hasShield) {
                    infoHeroe.lifes--;
                    colisionHeroe();
                }

                if (infoGame.villainsDeleted === 6) {
                    infoGame.level = 2;
                    infoGame.createdVillains = false;
                }
                else if (infoGame.villainsDeleted === 15) {
                    infoGame.level = 3;
                    infoGame.createdVillains = false;
                }
            }
        });

        //DELETE VILLAINS ARRAY
        indexVillainsToDelete.forEach((index) => {
            villainsArray.splice(index, 1);
        });

        indexVillainsToDelete = [];
    };

    let lastExecutionTime = 0;

    async function onHeroeMove(event) {
        var keyCode = event.which;
        const now = Date.now();

        if (keyCode === keyboards.a) {
            if (socket !== null)
                socket.emit('moveLeft', localStorage.getItem('socketId'));
            infoHeroe.left = true;
            infoHeroe.viewLeft = true;
            infoHeroe.viewRight = false;

        } else if (keyCode === keyboards.d) {
            if (socket !== null)
                socket.emit('moveRight', localStorage.getItem('socketId'));
            infoHeroe.right = true;
            infoHeroe.viewLeft = false;
            infoHeroe.viewRight = true;
        } else if (keyCode === keyboards.w) {
            if (socket !== null)
                socket.emit('moveUp', localStorage.getItem('socketId'));
            infoHeroe.up = true;
        }
        else if (keyCode === keyboards.s) {
            if (socket !== null)
                socket.emit('moveDown', localStorage.getItem('socketId'));
            infoHeroe.down = true;
        }
        if (now - lastExecutionTime >= 100) {
            if (keyCode === keyboards.space) {
                if (socket !== null)
                    socket.emit('moveShoot', localStorage.getItem('socketId'));
                audio.stop();
                //GENERAR BULLETS HEROE
                audioLoader.load('sounds/laser-sound.mp3', (buffer) => {
                    audio.setBuffer(buffer);
                    audio.setLoop(false);
                    audio.setVolume(infoGame.volume);
                    audio.play();
                });
                if (infoHeroe.hasBullet) {
                    for (let i = 0; i < 3; i++) {
                        const cloneBulletHeroe = infoBulletHeroe.bullet.scene.children[0].clone();
                        const bulletHeroe = setupBulletHeroe(
                            cloneBulletHeroe,
                            scene,
                            heroe.position,
                            infoHeroe.countDegrees,
                            infoHeroe.viewLeft,
                            infoHeroe.viewRight,
                            i === 0 ? true : false,
                            i === 2 ? true : false, socket, loop);

                        scene.add(bulletHeroe);
                        loop.updatables.push(bulletHeroe);
                    }
                } else {

                    const cloneBulletHeroe = infoBulletHeroe.bullet.scene.children[0].clone();

                    const bulletHeroe = setupBulletHeroe(
                        cloneBulletHeroe,
                        scene,
                        heroe.position,
                        infoHeroe.countDegrees,
                        infoHeroe.viewLeft,
                        infoHeroe.viewRight,
                        false,
                        false, socket, loop);
                    scene.add(bulletHeroe);
                    loop.updatables.push(bulletHeroe);
                }
            }

            lastExecutionTime = now;
        }
    }

    async function onHeoreStop(event) {
        var keyCode = event.which;
        if (keyCode === keyboards.w) {
            if (socket !== null)
                socket.emit('moveLeaveUp', localStorage.getItem('socketId'));
            infoHeroe.up = false;
        }
        else if (keyCode === keyboards.s) {
            if (socket !== null)
                socket.emit('moveLeaveDown', localStorage.getItem('socketId'));
            infoHeroe.down = false;
        }
        else if (keyCode === keyboards.a) {
            if (socket !== null)
                socket.emit('moveLeaveLeft', localStorage.getItem('socketId'));
            infoHeroe.left = false;
        }
        else if (keyCode === keyboards.d) {
            if (socket !== null)
                socket.emit('moveLeaveRight', localStorage.getItem('socketId'));
            infoHeroe.right = false;
        }
    };

    document.addEventListener("keydown", onHeroeMove, false);
    document.addEventListener("keyup", onHeoreStop, false);

    return heroe;
}

export { setupHeroe };