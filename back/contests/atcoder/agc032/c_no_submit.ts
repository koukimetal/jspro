import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();
    const M = nextInt();

    const D = new Array<number>(N);
    for (let i = 0; i < M; i++) {
        const a = nextInt() - 1;
        const b = nextInt() - 1;
        D[a] = (D[a] || 0) + 1;
        D[b] = (D[b] || 0) + 1;
    }
    
    const count: { [s: number]: number } = {};
    for (let i = 0; i < N; i++) {
        count[D[i]] = (count[D[i]] || 0) + 1;
    }

    console.log(D);
    console.log(count);

    const d2 = count[2] || 0;
    const d4 = count[4] || 0;
    const d6 = count[6] || 0;

    console.log(d2, d4, d6);

    if (d6 === 1 && d2 === N - 1) {
        console.log('Yes')
    } else if (d4 === 2 && d2 === N - 2) {
        console.log('Yes')
    } else {
        console.log('No')
    }
})()