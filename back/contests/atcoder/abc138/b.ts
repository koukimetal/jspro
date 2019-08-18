

import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNextInt();

    const N = next();
    const A: Array<number> = [];

    let mul = 1;
    for (let i = 0; i < N; i++) {
        const a = next();
        mul *= a;
        A.push(a);
    }

    let mom = 0;
    for (const a of A) {
        mom += Math.floor(mul / a);
    }
    console.log(mul / mom);
})()