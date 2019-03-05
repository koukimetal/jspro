
import fs from 'fs';
const filePath = process.env.HANOI_FILE || "/dev/stdin";

console.log(filePath);
const read = () : Promise<string> => {
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

(async () => {
    const S = await read();
    const count: {[key: string]: number} = {'0': 0, '1': 0};
    for (let i = 0; i < S.length; i++) {
        count[S[i]]++;
    }
    console.log(Math.max(count['0'], count['1']));
})()