import { getChottoMashinaNextInt } from "utilities/io";

const L = [0, 1, 2, 3];

const removeInvalid = (dp: any) => {
    for (let i of L) {
        dp[0][2][1][i] = 0;
        dp[i][0][2][1] = 0;

        dp[0][1][2][i] = 0;
        dp[i][0][1][2] = 0;

        dp[2][0][1][i] = 0;
        dp[i][2][0][1] = 0;

        dp[0][i][2][1] = 0;
        dp[0][2][i][1] = 0;
    }
}


(async () => {

    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();


    if (N === 3) {
        console.log(61);
        return;
    }

    let dp = {};

    for (const i of L) {
        dp[i] = {};
        for (const j of L) {
            dp[i][j] = {};
            for (const k of L) {
                dp[i][j][k] = {};
                for (const l of L) {
                    dp[i][j][k][l] = 1;
                }
            }
        }
    }

    removeInvalid(dp);

    const ansify = (num: number) => (num % 1000000007);
    for (let len = 5; len <= N; len++) {
        const ndp = {};
        for (const i of L) {
            ndp[i] = {};
            for (const j of L) {
                ndp[i][j] = {};
                for (const k of L) {
                    ndp[i][j][k] = {};
                    for (const l of L) {
                        ndp[i][j][k][l] = 0;
                        for (const x of L) {
                            ndp[i][j][k][l] = ansify(ndp[i][j][k][l] + dp[x][i][j][k]);
                        }
                    }
                }
            }
        }
        removeInvalid(ndp);
        dp = ndp;
    }

    let ans = 0;
    for (const i of L) {
        for (const j of L) {
            for (const k of L) {
                for (const l of L) {
                    ans = ansify(ans + dp[i][j][k][l]);
                }
            }
        }
    }

    console.log(ans);
})()