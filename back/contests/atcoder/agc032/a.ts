import { getChottoMashinaNextInt } from "utilities/io";

(async () => {
    const nextInt = await getChottoMashinaNextInt();

    const N = nextInt();

    let A = new Array<number>();

    for (let i = 0; i < N; i++) {
        A.push(nextInt() - 1);
    }

    let ans = new Array<number>();
    let solved = false;
    for (let flag = true; flag;) {
        // console.log(A);
        flag = false;
        const all0 = A.reduce((ac, cur) => ac && cur === 0, true);
        if (all0) {
            solved = true;
            for (let num of A) {
                ans.push(num);
            }
            break;
        }
        for (let j = N - 1; j >= 0; j--) {
            if (A[j] === j) {
                ans.push(j);
                A.splice(j, 1);
                flag = true;
                break;
            }
        }
    }
    // console.log(ans);
    ans = ans.reverse();

    if (solved) {
        for (let ope of ans) {
            console.log(ope + 1);
        }    
    } else {
        console.log(-1);
    }
})()