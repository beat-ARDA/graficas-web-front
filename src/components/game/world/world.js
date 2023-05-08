import { createCamera } from '../components/camera.js';
import { createScene } from '../components/scene.js';
import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Reziser.js';
import { Loop } from '../systems/Loop.js';
import { createControls } from '../systems/controls.js';
import { loadBuilding } from '../components/building/building.js';
import { loadHearthItem } from '../components/items/hearthItem/hearthItem.js';
import { loadBulletItem } from '../components/items/bulletItem/bulletItem.js';
import { loadShieldItem } from '../components/items/shieldItem/shieldItem.js';
import { loadHeroe } from '../components/heroe/heroe.js';
import { loadBulletHeroe } from '../components/bulletHeroe/bulletHeroe.js';
import { infoBulletHeroe, infoBulletTwoPlayer, infoBulletVillain, infoCamera, infoGame, infoHeroe, infoTwoPlayer, infoVillain } from '../helpers/helpers.js';
import { MathUtils, Vector3 } from 'three';
import { loadVillain } from '../components/villain/villain.js';
import { loadBulletVillain } from '../components/bulletVillain/bulletVillain.js';
import { ambientLight } from '../components/lights/ambiental.js';
import { spotLight } from '../components/lights/spot.js';
import { directionalLight } from '../components/lights/directional.js';
import { AudioListener, AudioLoader, Audio } from "three";
import socketIO from 'socket.io-client';
import { loadTwoPlayer } from '../components/twoPlayer/twoPlayer.js';
import { loadTwoPlayerBullet } from '../components/bulletTwoPlayer/bulletTwoPlayer.js';

let camera;
let renderer;
let controls;
let scene;
let loop;
let socket;
let posUser;

class World {

    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);
        scene.add(ambientLight());
        scene.add(directionalLight());
        scene.add(spotLight(new Vector3(20, 0, 0), '#FFFFFF'));
        scene.add(spotLight(new Vector3(-20, 0, 0), '#FFFFFF'));
        scene.add(spotLight(new Vector3(0, 0, 20), '#FFFFFF'));
        scene.add(spotLight(new Vector3(0, 0, -20), '#FFFFFF'));
        loop.updatables.push(camera, controls);
        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.activeCamera = camera;
        renderer.render(scene, camera);
    }

    async init() {

        if (infoGame.mode === 'TwoPlayers')
            socket = socketIO.connect('http://localhost:4000');
        else if (infoGame.mode === 'OnePlayer')
            socket = null;

        if (socket !== null) {
            socket.on('socketId', (socketId) => {
                localStorage.setItem('socketId', socketId.socketId);
                posUser = socketId.posUser;
                if (socketId.posUser === 1) {
                    infoHeroe.countDegrees = 120;
                    infoCamera.countDegrees = 120;
                    infoTwoPlayer.countDegrees = 300;
                } else if (socketId.posUser === 2) {
                    infoHeroe.countDegrees = 300;
                    infoCamera.countDegrees = 300;
                    infoTwoPlayer.countDegrees = 120;
                }
                socket.removeListener('socketId');
            });
        }

        const { building } = await loadBuilding();
        if (socket === null) {
            const hearthItem = await loadHearthItem(scene, socket);
            const bulletItem = await loadBulletItem(scene, socket);
            const shieldItem = await loadShieldItem(scene, socket);

            scene.add(hearthItem, bulletItem, shieldItem);
            loop.updatables.push(hearthItem, bulletItem, shieldItem);
        }
        const [villain, villainData] = await loadVillain(scene, loop, true, false, 50, 0, null);
        infoVillain.model = villainData;
        infoVillain.animations = villainData.animations[0];
        const listener = new AudioListener();

        scene.add(listener);
        const audioLoader = new AudioLoader();
        const audio = new Audio(listener);
        audioLoader.load('sounds/main-music.mp3', (buffer) => {
            audio.setBuffer(buffer);
            audio.setLoop(true);
            audio.setVolume(infoGame.volume);
            audio.play();
        });

        const heroe = await loadHeroe(scene, loop, socket);

        infoHeroe.model = heroe;

        if (socket !== null) {
            const [bulletTwoPlayer, dataBulletTwoPlayer] = await loadTwoPlayerBullet(
                new Vector3(10 * Math.cos(MathUtils.degToRad(45)), 0, 10 * Math.sin(MathUtils.degToRad(45))),
                scene,
                45,
                false,
                false,
                false,
                false, loop);

            infoBulletTwoPlayer.bullet = dataBulletTwoPlayer;

            const twoPlayer = await loadTwoPlayer(scene, loop, socket);

            infoTwoPlayer.model = twoPlayer;

            scene.add(twoPlayer);
            loop.updatables.push(twoPlayer);
        }

        const [bulletHeroe, dataBulletHeroe] = await loadBulletHeroe(
            new Vector3(Math.cos(MathUtils.degToRad(45)), 0, Math.sin(MathUtils.degToRad(45))),
            scene,
            45,
            false,
            false,
            false,
            false, socket, loop);

        infoBulletHeroe.bullet = dataBulletHeroe;

        const [bulletVillain, bulletVillainData] = await loadBulletVillain(
            new Vector3(Math.cos(MathUtils.degToRad(45)), 0, Math.sin(MathUtils.degToRad(45))),
            scene,
            45,
            false,
            false);

        infoBulletVillain.bullet = bulletVillainData;
        scene.add(heroe, building);
        loop.updatables.push(heroe, building);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };