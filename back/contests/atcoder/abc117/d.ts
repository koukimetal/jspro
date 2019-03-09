import { BigBit, ABit } from 'utilities/bit';
import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();
    const K = new BigBit(nextInt());
    const A = new Array<BigBit>(N);

    for (let i = 0; i < N; i++) {
        A[i] = new BigBit(nextInt());
    }

    const base: Array<ABit> = [1];
    const count: Array<{0: number, 1: number}> = [];
    for (let i = 0; i < 41; i++) {
        const bit = new BigBit(base);
        const score = [0, 0];
        A.forEach(a => {
            if (a.and(bit).isZero()) {
                score[1]++;
            } else {
                score[0]++;
            }
        });
        count[i] = {
            0: score[0], 1: score[1]
        };
        base.unshift(0);
    }


    const cachedPow = (() => {
        const cache: {[key: number] : number} = {};

        return (i: number) => {
            if (cache[i] !== undefined) {
                return cache[i];
            }
            cache[i] = Math.pow(2, i);
            return cache[i];
        }
    })();

    const getIdeal = (from: number) => {
        let sum = 0;
        for (let i = 0; i < from; i++) {
            sum += Math.max(count[i][0], count[i][1]) * cachedPow(i);
        }
        return sum;
    }

    const cacheGetIdeal = (() => {
        const cache: {[key: number] : number} = {};

        return (i: number) => {
            if (cache[i] !== undefined) {
                return cache[i];
            }
            cache[i] = getIdeal(i);
            return cache[i];
        }
    })();

    const calc0 = () => {
        let sum = 0;
        for (let i = 0; i < count.length; i++) {
            sum += count[i][0] * cachedPow(i);
        }
        return sum;
    }


    // console.log(count);

    let max = calc0();
    let sum = 0;
    for (let i = 40; i >= 0; i--) {
        if (K.getHighestZeroIndex() < i) {
            continue;
        }
        if (K.getBit(i) === 1) {
            // calc when it's 0
            const idealScore = sum + cacheGetIdeal(i) + (count[i][0] * cachedPow(i));
            max = Math.max(max, idealScore);

            // let's use bigger one
            sum += Math.max(count[i][1], count[i][0]) * cachedPow(i);
        } else {
            sum += count[i][0] * cachedPow(i);
        }
    }
    console.log(Math.max(sum, max));
})()