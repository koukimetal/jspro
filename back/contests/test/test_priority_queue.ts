import { PriorityQueue } from '../../utilities/priority_queue';

(() => {
    const a = [8,0,9,7,5,4,2,3,4,3,5,7,9,6,4,6,4,4,3,2,4,2,4,7,8,5,3,2,3,4,6,7,5,2,435,34,534,534,5,345,34,53,45,345,34,53,45,345,3,53,5,3,132,24,2,54,534,534,5];
    // const a = [8,0,9,7,5,4,2,3,4,3];
    const heap = new PriorityQueue<number>(a.length, (a, b) => a - b);
    for (let i = 0; i < a.length; i++) {
        const v = a[i];
        // console.log(v);
        heap.push(v);
        // heap.showHeap();
    }
    // heap.showHeap();
    let prev = heap.pop();
    while(!heap.isEmpty()) {
        const current = heap.pop();
        if (prev > current) {
            throw Error('Wrong answer');
        }
        console.log(heap.pop());
    }
})()