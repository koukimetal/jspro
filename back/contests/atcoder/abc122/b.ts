import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    const S = next();

    const a = S.match(/[A|C|G|T]+/g);

    if (!a) {
        console.log(0);
    } else {
        const ans = a.reduce((ac, cur) => Math.max(ac, cur.length), 0);
        console.log(ans);
    }
})()