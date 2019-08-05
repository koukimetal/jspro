import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    const S = next();
    const N = parseInt(S);

    /*
    1: n
    2: 9
    3: 9 - 99 + n
    4: 9 - 99 + 999
    5: 9 - 99 + 999 - 9999 + n
    6: 9 - 99 + 999 - 9999 + 99999
    */

    let sum = 0;
    for (let i = 1; i < S.length; i++) {
        sum += (Math.pow(10, i) - 1) * (i % 2 === 0 ? -1 : 1);
    }
    if (S.length % 2 === 1) {
        sum += N;
    }
    console.log(sum);
})()