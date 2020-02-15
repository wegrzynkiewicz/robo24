import * as Frontend from "robo24-frontend";

import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const vaoLayout = Graphic.VAOLayout.createBasicLayout({
        openGLPrimitiveType: WebGL2RenderingContext["TRIANGLES"],
        verticesCount: 3,
        indices: false,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_Position", type: "vec3<f32>"},
            {buffer: "primary", batch: 0, name: "a_Color", type: "vec3<f32>"},
        ],
    });

    const bufferLayout = vaoLayout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();

    const positionAccessor = bufferLayout.createAccessor({name: "a_Position", dataView});
    positionAccessor.write(0, [-0.5, -0.5, 0]);
    positionAccessor.write(1, [0.5, -0.5, 0]);
    positionAccessor.write(2, [-0.5, 0.5, 0]);

    const colorAccessor = bufferLayout.createAccessor({name: "a_Color", dataView});
    colorAccessor.write(0, [1, 0, 0]);
    colorAccessor.write(1, [0, 1, 0]);
    colorAccessor.write(2, [0, 0, 1]);

    const {bufferManager, vaoManager, programManager} = system.view;

    const buffer = bufferManager.createBuffer({
        name: "triangle",
        type: "ARRAY_BUFFER",
        bufferLayout
    });

    buffer.setDataView(dataView);

    programManager.registerShaderContent("triangle", vertexShaderContent, fragmentShaderContent);
    const program = programManager.getProgramByName("triangle");

    const vao = vaoManager.createVAO({
        name: "triangle",
        program,
        vaoLayout,
        buffers: [buffer],
    });

    system.animationLoop.on("frame", () => {
        program.use();
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.vaoLayout.allocation;
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
});