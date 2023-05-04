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

function setupHeroe(data, scene, loop) {

    const heroe = data.scene.children[0];
    let indexVillainsToDelete = [];
    let materialShield = new MeshStandardMaterial({ color: 0xFFFF00 });

    heroe.position.set(
        infoHeroe.distance * Math.cos(MathUtils.degToRad(infoHeroe.countDegrees)),
        infoHeroe.positionY,
        infoHeroe.distance * Math.sin(MathUtils.degToRad(infoHeroe.countDegrees)));

    heroe.rotation.z = MathUtils.degToRad(infoHeroe.degreesRotation);

    heroe.scale.set(infoHeroe.scale, infoHeroe.scale, infoHeroe.scale);

    infoHeroe.material = heroe.material;

    heroe.tick = (delta) => {
        if (infoGame.villainsDeleted === 27) {
            loop.stop();
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
            loop.stop();
        }

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                     CREATE VILLAINS                                  //
        /*///////////////////////////////////////////////////////////////////////////////////////
        if (infoGame.level === 1 && !infoGame.createdVillains) {
            for (let i = 0; i < 3; i++) {
                const cloneVillain = infoVillain.model.scene.children[0].clone();
                const villain = setupVillain(
                    scene,
                    loop,
                    cloneVillain,
                    true,
                    false,
                    infoHeroe.countDegrees + 90,
                    i);

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
                    i);

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
                    i);

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
                    i);

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
                    i);

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
                    i);

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
                    i);

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
                    i);

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
                    i);

                scene.add(villain);
                loop.updatables.push(villain);

                villainsArray.push(villain);
                console.log(villainsArray);
            }

            infoGame.createdVillains = true;
        }

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                        MOVE HEROE                                    //
        /*///////////////////////////////////////////////////////////////////////////////////////
        //Aumentar contador de grados
        if (infoHeroe.left)
            infoHeroe.countDegrees += 0.6;
        else if (infoHeroe.right)
            infoHeroe.countDegrees -= 0.6;
        //Subir o bajar nave
        if (infoHeroe.down)
            heroe.position.y -= 0.1;
        else if (infoHeroe.up)
            heroe.position.y += 0.1;
        //Rotar la nave
        if (infoHeroe.right)
            heroe.rotation.z = infoHeroe.distance * Math.sin(MathUtils.degToRad((180 + infoHeroe.countDegrees) * 0.102));
        else if (infoHeroe.left)
            heroe.rotation.z = infoHeroe.distance * Math.sin(MathUtils.degToRad(infoHeroe.countDegrees * 0.108));
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
                scene.remove(villain);
                villainsToDelete.push(villain);
                indexVillainsToDelete.push(index);
                
                infoGame.villainsDeleted++;

                if (!infoHeroe.hasShield)
                    infoHeroe.lifes--;

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
            infoHeroe.left = true;
            infoHeroe.viewLeft = true;
            infoHeroe.viewRight = false;
        } else if (keyCode === keyboards.d) {
            infoHeroe.right = true;
            infoHeroe.viewLeft = false;
            infoHeroe.viewRight = true;
        } else if (keyCode === keyboards.w)
            infoHeroe.up = true;
        else if (keyCode === keyboards.s) {
            infoHeroe.down = true;
        }

        if (now - lastExecutionTime >= 100) {
            if (keyCode === keyboards.space) {
                //GENERAR BULLETS HEROE
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
                            i === 2 ? true : false);

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
                        false);

                    scene.add(bulletHeroe);
                    loop.updatables.push(bulletHeroe);
                }
            }

            lastExecutionTime = now;
        }
    }

    async function onHeoreStop(event) {
        var keyCode = event.which;
        if (keyCode === keyboards.w)
            infoHeroe.up = false;
        else if (keyCode === keyboards.s)
            infoHeroe.down = false;
        else if (keyCode === keyboards.a)
            infoHeroe.left = false;
        else if (keyCode === keyboards.d)
            infoHeroe.right = false;
    };

    document.addEventListener("keydown", onHeroeMove, false);
    document.addEventListener("keyup", onHeoreStop, false);

    return heroe;
}

export { setupHeroe };