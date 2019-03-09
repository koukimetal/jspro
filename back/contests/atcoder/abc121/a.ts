import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const H = nextInt();
    const W = nextInt();
    const h = nextInt();
    const w = nextInt();

    console.log((H-h)*(W-w));
})()