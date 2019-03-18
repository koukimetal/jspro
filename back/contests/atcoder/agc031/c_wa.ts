import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();
    const A = nextInt();
    const B = nextInt();

    const bitDiffCount = (a: number, b: number) => {
        let count = 0;
        for (let i = 0; i < N; i++) {
            if ((a & (1<<i)) !== (b & (1<<i))) {
                count++;
            }
        }
        return count;
    }

    if (bitDiffCount(A, B) !== 1) {
        console.log('NO');
        return;
    }

    const gray = (bits: Array<number>, shift: number) => {
        const res = new Array<number>(bits.length * 2);
        for (let i = 0; i < bits.length; i++) {
            res[i] = bits[i];
        }
        let tail = bits.length - 1;
        for (let i = bits.length; i < res.length; i++) {
            res[i] = bits[tail--] + (1<<shift);
        }
        return res;
    }

    const findTargetIdx = (target: number, bits: Array<number>) => {
        for (let i = 0; i < bits.length; i++) {
            if (bits[i] === target) {
                return i;
            }
        }
        return -1;
    }

    const grayGray = (len: number) => {
        let bits = [0, 1];
        for (let i = 1; i < len; i++) {
            if ((A & (1<<i)) !== (B & (1<<i))) {
                const target = A & ((1<<i) - 1);                
                const targetIdx = findTargetIdx(target, bits);
                const prevify = (a: number) => (a - 1 + bits.length) % bits.length;
                const modifiedBits = [];
                for (let j = prevify(targetIdx); bits[j] !== target; j = prevify(j)) {
                    modifiedBits.push(bits[j]);
                }
                modifiedBits.push(target);
                bits = modifiedBits;
            }
            bits = gray(bits, i);
        }
        return bits;
    }

    const check = grayGray(N);
    const aIdx = findTargetIdx(A, check);

    const nextify = (a: number) => (a + 1) % check.length;
    const prevify = (a: number) => (a - 1 + check.length) % check.length;

    const nextI = nextify(aIdx);
    const prevI = prevify(aIdx);


    const verify = (ans: Array<number>) => {
        for (let i = 1; i < ans.length; i++) {
            if (bitDiffCount(ans[i], ans[i-1]) !== 1) {
                console.log('WA', ans[i], ans[i-1]);
                return false;
            }
        }
        return true;
    }

    if (check[nextI] === B) {
        const ans = [];
        for (let i = aIdx; i !== nextI; i = prevify(i)) {
            ans.push(check[i]);
        }
        ans.push(B);
        if (verify(ans) === false) {
            return;
        }

        console.log('YES');
        console.log(ans.join(' '));
    } else if (check[prevI] === B) {
        const ans = [];
        for (let i = aIdx; i !== prevI; i = nextify(i)) {
            ans.push(check[i]);
        }
        ans.push(B);
        if (verify(ans) === false) {
            return;
        }

        console.log('YES');
        console.log(ans.join(' '));
    } else {
        console.log('NOaaa');
    }
})()