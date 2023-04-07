import { MathUtils } from "three";
const keyboards = {
    "w": 87,
    "s": 83,
    "a": 65,
    "d": 68,
    "space": 32
}

const dirHeroe = {
    "left": false,
    "right": false,
    "down": false,
    "up": false
};

async function onHeroeMove(event) {
    var keyCode = event.which;

    if (keyCode === keyboards.a) {
        dirHeroe.left = true;
    } else if (keyCode === keyboards.d) {
        dirHeroe.right = true;
    } else if (keyCode === keyboards.w) {
        dirHeroe.up = true;
    } else if (keyCode === keyboards.s) {
        dirHeroe.down = true;
    } else if (keyCode === keyboards.space) {

    }
};

async function onHeoreStop(event) {
    var keyCode = event.which;

    if (keyCode === keyboards.w) {
        dirHeroe.up = false;
    } else if (keyCode === keyboards.s) {
        dirHeroe.down = false;
    } else if (keyCode === keyboards.a) {
        dirHeroe.left = false;
    } else if (keyCode === keyboards.d) {
        dirHeroe.right = false;
    }
};

function setupModelHeroe(data) {
    const model = data.scene.children[0];
    let i = 0;
    model.tick = (delta) => {
        //Move spacehsip around axis y
        model.position.y = dirHeroe.down ? model.position.y - 0.1 : (
            dirHeroe.up ? model.position.y + 0.1 : model.position.y);

        //Incremente i factor
        i = dirHeroe.left ? i + 0.6 : (dirHeroe.right ? i - 0.6 : i);


        //Calculate Position spaceship
        if (dirHeroe.left || dirHeroe.right) {
            model.position.x = 10 * Math.cos(MathUtils.degToRad(i));
            model.position.z = 10 * Math.sin(MathUtils.degToRad(i));
        }

        if (dirHeroe.right)
            model.rotation.z = 10 * Math.sin(MathUtils.degToRad((180 + i) * 0.10));
        if (dirHeroe.left)
            model.rotation.z = 10 * Math.sin(MathUtils.degToRad(i * 0.108));

        //Control the i factor
        i = i >= 360 ? 0 : (i <= -360 ? 0 : i);
    };

    document.addEventListener("keydown", onHeroeMove, false);
    document.addEventListener("keyup", onHeoreStop, false);

    return model;
}

function setupModelVillain(data) {
    const model = data.scene.children[0];

    model.tick = (delta) => {
        model.position.x = 10 * Math.cos(Date.now() * 0.00015);
        model.position.z = 10 * Math.sin(Date.now() * 0.00015);
    }

    return model;
}

export { setupModelHeroe, setupModelVillain };