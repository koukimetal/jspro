import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    const S = next() + 'R';
    const ans = new Array(S.length - 1).fill(0);

    let Rcount = 1;
    let Lcount = 0;
    for (let i = 1; i < S.length; i++) {
        if (Lcount > 0 && S[i] === 'R') {
            // People from L tile
            if (Lcount % 2 === 0) {
                ans[i - Lcount] += Lcount / 2;
                ans[i - Lcount - 1] += Lcount / 2;
            } else {
                ans[i - Lcount] += (Lcount + 1) / 2;
                ans[i - Lcount - 1] += (Lcount - 1) / 2;
            }

            // People from R tile
            if (Rcount % 2 === 0) {
                ans[i - Lcount] += Rcount / 2;
                ans[i - Lcount - 1] += Rcount / 2;
            } else {
                ans[i - Lcount] += (Rcount - 1) / 2;
                ans[i - Lcount - 1] += (Rcount + 1) / 2;
            }

            Rcount = 1;
            Lcount = 0;
        } else if (Lcount === 0 && S[i] === 'R') {
            Rcount++;
        } else {
            // S[i] === 'L'
            Lcount++;
        }
    }
    console.log(ans.join(' '));
})()