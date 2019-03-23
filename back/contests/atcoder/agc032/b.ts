import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();

    const ans = Array<{i: number, j: number}>();
    if (N%2 === 1) {
        for (let i = 1; i <= N; i++) {
            for (let j = i + 1; j <= N; j++) {
                if (i + j !== N) {
                    ans.push({i, j});
                }
            }
        }
    } else {
        for (let i = 1; i <= N; i++) {
            for (let j = i + 1; j <= N; j++) {
                if (i + j !== N + 1) {
                    ans.push({i, j});
                }
            }
        }
    }
    console.log(ans.length);
    for (const e of ans) {
        console.log(e.i + " " + e.j);
    }
})()