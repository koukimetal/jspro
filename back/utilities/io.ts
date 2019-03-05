import fs from 'fs';

export const readInput = () : Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile("/dev/stdin", "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

export function* getFoolIterator(allInput: string) {
    const inputs = allInput.split(/\s+/).filter(str => str.length > 0);
    for (let i = 0; i < inputs.length; i++) {
        yield inputs[i];
    }
}
