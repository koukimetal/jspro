import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const modify = (a: number) => {
        return (a + 1000000007) % 1000000007;
    }

    const N = nextInt();
    const dp = new Array<number>(N + 1);
    dp[0] = 1;
    const prevs: {[key: number]: number} = {};
    for (let i = 1; i <= N; i++) {
        const c = nextInt();
        const prev = prevs[c] || -1;
        if (prev === i - 1 || prev === -1) {
            dp[i] = dp[i - 1];
        } else {
            dp[i] = modify(dp[i - 1] + dp[prev]);
        }
        prevs[c] = i;
    }
    console.log(dp[N]);
})()