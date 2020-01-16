import assert from "assert";
import Allocation from "../../../../src/vao/layout/Allocation";
import VertexLayoutBlueprint from "../../../../src/vao/blueprint/VertexLayoutBlueprint";

function assertAttributeLayout(bufferLayout, attributeName, expectedStride, expectedOffset) {
    const attributeLayout = bufferLayout.getAttributeLayoutByName(attributeName);
    const {byteOffset, byteStride} = attributeLayout;
    assert.strictEqual(
        byteStride,
        expectedStride,
        `Invalid stride attribute named (${attributeName}) expected (${expectedStride}) actual (${byteStride})`
    );
    assert.strictEqual(
        byteOffset,
        expectedOffset,
        `Invalid offset attribute named (${attributeName}) expected (${expectedOffset}) actual (${byteOffset})`
    );
}

describe("ArrayBufferBlueprint", function () {

    it("should create valid ArrayBufferLayout object", function () {
        const bufferBlueprint = new VertexLayoutBlueprint.ArrayBuffer({
            batches: [
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexPosition",
                            type: "vec3<f32>"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexTexCoords",
                            type: "vec2<f32>"
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexNormal",
                            type: "vec3<f32>",
                            divisor: 1
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexColor",
                            type: "vec4<f32>",
                            divisor: 2
                        }),
                    ],
                }),
            ],
        });

        const allocation = new Allocation({
            primitive: "triangle",
            elementsCount: 2,
        });

        const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        const verticesCount = 6;
        const expectedLength = v => (v * 12) + (v * 8) + (v / 3 * 12) + (v / 6 * 16);
        assert.strictEqual(bufferLayout.byteLength, expectedLength(verticesCount));
    });

    it("should create valid complex ArrayBufferLayout object", function () {
        const bufferBlueprint = new VertexLayoutBlueprint.ArrayBuffer({
            type: "array",
            schema: "abc/de/f/g/hijk",
            batches: [
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexPosition",
                            type: "vec3<f32>"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexNormal",
                            type: "vec3<f32>"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexTexCoords",
                            type: "vec2<f32>"
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexColor",
                            type: "vec4<f32>"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexNegativeColor",
                            type: "f32"
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexWeight",
                            type: "s16"
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexVisibility",
                            type: "s8"
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexAdditional1",
                            type: "u16"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexAdditional2",
                            type: "u16"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexAdditional3",
                            type: "u32"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexAdditional4",
                            type: "vec4<s16>"
                        }),
                    ],
                }),

            ],
        });

        const allocation = new Allocation({
            primitive: "triangle",
            elements: 10,
        });

        const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        const verticesCount = 30;

        assertAttributeLayout(bufferLayout, "a_VertexPosition", 32, 0);
        assertAttributeLayout(bufferLayout, "a_VertexNormal", 32, 12);
        assertAttributeLayout(bufferLayout, "a_VertexTexCoords", 32, 24);

        const block1Offset = verticesCount * 32;
        assertAttributeLayout(bufferLayout, "a_VertexColor", 20, block1Offset);
        assertAttributeLayout(bufferLayout, "a_VertexNegativeColor", 20, block1Offset + 16);

        const block2Offset = block1Offset + (verticesCount * 20);
        assertAttributeLayout(bufferLayout, "a_VertexWeight", 2, block2Offset);

        const block3Offset = block2Offset + (verticesCount * 2);
        assertAttributeLayout(bufferLayout, "a_VertexVisibility", 1, block3Offset);

        const block4Offset = block3Offset + verticesCount;
        assertAttributeLayout(bufferLayout, "a_VertexAdditional1", 16, block4Offset);
        assertAttributeLayout(bufferLayout, "a_VertexAdditional2", 16, block4Offset + 2);
        assertAttributeLayout(bufferLayout, "a_VertexAdditional3", 16, block4Offset + 4);
        assertAttributeLayout(bufferLayout, "a_VertexAdditional4", 16, block4Offset + 8);

        const vertexByteLength = 71;
        const byteLength = verticesCount * vertexByteLength;
        assert.strictEqual(bufferLayout.byteLength, byteLength);
    });
});
