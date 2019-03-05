import { readInput } from "utilities/io";

(async () => {
    const S = await readInput();
    const count: {[key: string]: number} = {'0': 0, '1': 0};
    for (let i = 0; i < S.length; i++) {
        count[S[i]]++;
    }
    console.log(Math.min(count['0'], count['1']) * 2);
})()