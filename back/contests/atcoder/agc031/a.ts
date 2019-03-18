import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    next();

    const S = next();

    const counts: {[key: string]: number} = {};
    for (let i = 0; i < S.length; i++) {
        const appear = counts[S[i]] || 0;
        counts[S[i]] = appear + 1;
    }

    const modify = (a: number) => {
        return (a + 1000000007) % 1000000007;
    }

    let ans = 1;
    // console.log(S);
    // console.log(counts);
    Object.keys(counts).forEach(char => {
        ans = modify(ans * (1 + counts[char]));
    });

    console.log(modify(ans - 1));
})()