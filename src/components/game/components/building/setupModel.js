function setupModel(data) {
    const model = data.scene.children[0];

    model.tick = (delta) => {
    };

    return model;
}

export { setupModel };