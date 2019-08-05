import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNextInt();

    const N = next();

    let max = next() - 1;
    let ans = true;
    for (let i = 0; i < N - 1; i++) {
        const H = next();
        if (H > max) {
            max = H - 1;
        } else if (H < max) {
            ans = false;
        }
    }

    if (ans) {
        console.log('Yes');
    } else {
        console.log('No');
    }
})()