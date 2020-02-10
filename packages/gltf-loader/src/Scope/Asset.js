import * as Graphic from "robo24-graphic";

export default class Asset {

    constructor({gltfData}) {
        if (!gltfData) {
            throw new Error("Invalid GLTF data.");
        }
        this.gltfData = gltfData;
        this.cache = {};
    }

    getScene(sceneNumber) {
        const scene = this.createScene(sceneNumber);
    }

    createScene(sceneNumber) {
        const {nodes} = this.gltfData.scenes;
        const scene = Graphic.Scene({name: ""});
        for (const nodeNumber of nodes) {
            const node = this.createSceneNode(nodeNumber);
            node.setParent(scene);
        }
        return scene;
    }

    createSceneNode(nodeNumber) {
        const node = this.gltfData.nodes[0];
        const sceneNode = Graphic.SceneNode({name: node.name});


    }
}
