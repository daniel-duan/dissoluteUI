const data = new Map();

export function get(key) {
    return data.get(key);
}

export function put(key, value) {
    data.set(key, value);
}
