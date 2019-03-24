import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    const ans = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'};
    console.log(ans[next()]);
})()