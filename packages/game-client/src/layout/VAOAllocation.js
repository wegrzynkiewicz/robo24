export default class VAOAllocation {

    constructor({vertices}) {
        this.vertives = vertices;
        this.allocations = Object.create(null);
    }

    add({attribute, stride, offset}) {
        this.allocations[attribute.name] = {attribute, stride, offset};
    }

    getAttributesAllocations() {
        return Object.values(this.allocations);
    }

    getAttributeAllocationByName(name) {
        const allocation = this.allocations[name];
        if (allocation === undefined) {
            throw new Error(`Not found attribute's allocation named (${name})`);
        }
        return allocation;
    }

    getByteLength(verticesPerPrimitive) {
        let count = 0;
        for (let {attribute} of Object.values(this.allocations)) {
            count += attribute.getByteLength(this.vertives, verticesPerPrimitive);
        }
        return count;
    }
}
