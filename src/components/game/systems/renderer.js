import { WebGLRenderer } from 'three';

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.useLegacyLights = true;

    return renderer;
}

export { createRenderer };