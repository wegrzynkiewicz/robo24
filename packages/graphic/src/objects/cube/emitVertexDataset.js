function mapping(char) {
    switch (char) {
        case "0":
            return 0.0;
        case "+":
            return 1.0;
        case "-":
            return -1.0;
    }
}

function parse(...args) {
    return args.map(arg => arg.split("").map(mapping));
}

export default function emitVertexDataset(callback) {

    const emit = (...args) => callback(...parse(...args));

    // top
    emit("-++", "0+", "0+0");
    emit("+++", "++", "0+0");
    emit("++-", "+0", "0+0");
    emit("-+-", "00", "0+0");

    // down
    emit("---", "0+", "0-0");
    emit("+--", "++", "0-0");
    emit("+-+", "+0", "0-0");
    emit("--+", "00", "0-0");

    // front
    emit("--+", "0+", "00-");
    emit("+-+", "++", "00-");
    emit("+++", "+0", "00-");
    emit("-++", "00", "00-");

    // back
    emit("+--", "0+", "00+");
    emit("---", "++", "00+");
    emit("-+-", "+0", "00+");
    emit("++-", "00", "00+");

    // left
    emit("---", "0+", "-00");
    emit("--+", "++", "-00");
    emit("-++", "+0", "-00");
    emit("-+-", "00", "-00");

    // right
    emit("+-+", "0+", "+00");
    emit("+--", "++", "+00");
    emit("++-", "+0", "+00");
    emit("+++", "00", "+00");
}
