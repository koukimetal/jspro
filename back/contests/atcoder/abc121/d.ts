import { ABit, BigBit } from 'utilities/bit';
import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const A = nextInt();
    const B = nextInt();

    const oddEven = (num: number) => {
        const bit = Array<ABit>();

        // case min digit
        const lmod = (num + 3) % 4;
        if (lmod === 1 || lmod === 2) {
            bit.push(1);
        } else {
            bit.push(0);
        }
        let prevDivider = 2;
        for (let divider = 4, digit = 2; Math.pow(2, digit - 1) < num; divider *= 2, digit++) {
            const mod = (num + divider - 1) % divider;
            if (mod < prevDivider) {
                bit.push(0);
            } else {
                bit.push((mod - prevDivider + 1) % 2 as ABit);
            }
            prevDivider = divider;
        }
        return bit;
    }


    const AF = new BigBit(oddEven(A));
    const BF = new BigBit(oddEven(B + 1));
    console.log(BF.xor(AF).toNumber());
})()