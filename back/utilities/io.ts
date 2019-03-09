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

export const getFoolNextInt = async () => {
    const all = await readInput();
    const iterator = getFoolIterator(all);
    return () => parseInt(iterator.next().value);
}

export const getChottoMashinaNext = async () => {
    const all = await readInput();
    const getIterator = function* () {
        let head = -1;
        for (let i = 0; i <= all.length; i++) {
            if (all[i] === ' ' || all[i] === '\n' || i === all.length) {
                if (head === -1) {
                    continue;
                } else {
                    const res = all.substring(head, i);
                    head = -1;
                    yield res;
                }
            } else {
                if (head === -1) {
                    head = i;
                }
            }
        }
    }
    const iterator = getIterator();
    return () => iterator.next().value;
}

export const getChottoMashinaNextInt = async () => {
    const next = await getChottoMashinaNext();
    return () => parseInt(next());
}