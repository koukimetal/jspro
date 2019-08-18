

import { getChottoMashinaNext } from "utilities/io";

(async () => {
    const next = await getChottoMashinaNext();

    const a = parseInt(next());
    const s = next();

    if (a >= 3200) {
        console.log(s);
    } else {
        console.log("red");
    }
})()