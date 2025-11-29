import { simulateDraw } from './src/lib/drawAlgorithm';
import { Group } from './src/lib/types';

function verifyDraw() {
    let successCount = 0;
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
        try {
            const groups = simulateDraw();

            // Check Hosts
            const groupA = groups.find(g => g.name === 'A');
            const groupB = groups.find(g => g.name === 'B');
            const groupD = groups.find(g => g.name === 'D');

            if (!groupA?.teams.some(t => t.id === 'mex')) throw new Error('Mexico not in Group A');
            if (!groupB?.teams.some(t => t.id === 'can')) throw new Error('Canada not in Group B');
            if (!groupD?.teams.some(t => t.id === 'usa')) throw new Error('USA not in Group D');

            // Check Group Sizes
            if (groups.some(g => g.teams.length !== 4)) throw new Error('Invalid group size');

            successCount++;
        } catch (e) {
            console.error(`Iteration ${i} failed:`, e);
        }
    }

    console.log(`Success rate: ${successCount}/${iterations}`);
}

verifyDraw();
