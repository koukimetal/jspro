import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();
    const M = nextInt();

    const AB = new Array<{a: number, b: number}>(N);

    for (let i = 0; i < N; i++) {
        const a = nextInt();
        const b = nextInt();
        AB[i] = {a, b};
    }

    AB.sort((x, y) => x.a - y.a);

    let sum = 0;
    let m = M;
    for (let i = 0; i < N; i++) {
        const {a, b} = AB[i];
        if (m <= b) {
            sum += a * m;
            break;
        } else {
            sum += a * b;
            m -= b;
        }
    }

    console.log(sum);
})()