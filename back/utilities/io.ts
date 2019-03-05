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
