import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    const N = parseInt(next());
    const Q = parseInt(next());
    const S = next();

    const AC = new Array<number>(N);

    AC[0] = 0;
    let cnt = 0;
    for (let i = 1; i < N; i++) {
        if (S[i - 1] === 'A' && S[i] === 'C') {
            cnt++;
        }
        AC[i] = cnt;
    }

    for (let i = 0; i < Q; i++) {
        const l = parseInt(next()) - 1;
        const r = parseInt(next()) - 1;
        console.log(AC[r] - AC[l]);
    }

})()