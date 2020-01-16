export default class ArrayBufferAllocation {

    constructor({byteLength}) {
        this.byteLength = byteLength;
        this.attributeBatchAllocationSet = new Set();
    }

    createArrayBufferByDataView() {
        const bufferLength = this.getByteLength();
        const buffer = new ArrayBuffer(bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
