import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();
    const M = nextInt();
    const C = nextInt();
    const B = new Array<number>(M);
    for (let i = 0; i < M; i++) {
        B[i] = nextInt();
    }
    let count = 0;
    for (let i = 0; i < N; i++) {
        let sum = 0;
        for (let j = 0; j < M; j++) {
            const Aij = nextInt();
            sum += Aij * B[j];
        }
        if (sum > -C) {
            count++;
        }
    }
    console.log(count);
})()