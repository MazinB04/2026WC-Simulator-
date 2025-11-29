import { Team, Group, Confederation } from './types';
import { POTS } from './data';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function getConfederationCount(group: Group, conf: Confederation): number {
    return group.teams.filter(t => t.confederation === conf).length;
}

function isValidAssignment(group: Group, team: Team): boolean {
    // 1. Check max size (should be handled by logic, but safety check)
    if (group.teams.length >= 4) return false;

    // 2. Check standard confederation constraints
    const confCount = getConfederationCount(group, team.confederation);
    if (team.confederation === 'UEFA') {
        if (confCount >= 2) return false;
    } else {
        if (confCount >= 1) return false;
    }

    // 3. Check Playoff "avoid" constraints
    if (team.avoidConfederations) {
        for (const avoidConf of team.avoidConfederations) {
            // If the group already has a team from a confederation we must avoid
            if (group.teams.some(t => t.confederation === avoidConf)) {
                return false;
            }
        }
    }

    // 4. Check if existing teams in group have "avoid" constraints that conflict with THIS team
    // e.g. Group has FIFA Play-off 1 (avoids CONCACAF). We try to add USA (CONCACAF).
    for (const existingTeam of group.teams) {
        if (existingTeam.avoidConfederations) {
            if (existingTeam.avoidConfederations.includes(team.confederation)) {
                return false;
            }
        }
    }

    return true;
}

function backtrack(
    teamsToAssign: Team[],
    groups: Group[],
    teamIndex: number
): boolean {
    if (teamIndex === teamsToAssign.length) {
        return true; // All assigned
    }

    const team = teamsToAssign[teamIndex];

    // Try to find a valid group for this team
    // Optimization: Sort groups by some heuristic? Random order helps variety.
    // We need to ensure we don't just fill Group A first.
    // Actually, for the draw, we usually go Team by Team and assign to a Group.
    // But here we are simulating the result.
    // We should try to assign the team to ANY valid group that has space (for the current pot).
    // Since we process Pot by Pot, we assume previous Pots are filled.
    // Current Pot teams need to go to groups that don't have a team from this Pot yet.

    // Actually, the standard draw procedure is:
    // Draw a team from Pot.
    // Draw a Group.
    // If valid, place.
    // But for simulation, we can just find a valid assignment for all teams in the Pot.

    // We need to assign each team in `teamsToAssign` to a distinct group (since there are 12 teams and 12 groups).
    // So each group receives exactly one team from the current Pot.

    // Available groups are those that don't have a team from this Pot yet?
    // Since we pass `groups` which are accumulating teams, and we process 12 teams for 12 groups.
    // We can just iterate through the groups?
    // No, we need to assign the 12 teams to the 12 groups.
    // It's a matching problem.

    // Let's try to assign `team` to one of the available groups.
    // Which groups are available?
    // In a Pot-based draw, every group gets 1 team from the Pot.
    // So we need to match the 12 teams to the 12 groups.

    // We can iterate through the available groups (indices 0-11) that haven't received a team from this batch yet.
    // But `backtrack` function structure needs to be careful.
    // Let's say `teamsToAssign` is the shuffled Pot.
    // `teamIndex` 0..11.
    // We need to assign `teamsToAssign[0]` to a group, `teamsToAssign[1]` to another group...
    // We can keep track of which groups are used in this Pot round.

    // Better approach for `backtrack` within a Pot:
    // Arguments: `teams` (12), `groups` (12), `assignments` (map or array of group indices used).

    // Actually, let's simplify:
    // We have 12 teams. We have 12 groups.
    // We want to find a permutation of groups that satisfies constraints.
    // `backtrack(teamIndex, availableGroupIndices)`

    // But wait, the "Draw" usually draws a team, then finds the *first available valid group* (A-L order).
    // Or draws a group ball?
    // "The draw follows strict FIFA rules... Position Allocation... Draw Algorithm... uses backtracking".
    // Usually: Draw Team X. Go through Groups A-L. First valid group? Or Draw Group ball?
    // In 2022, they drew a Team, then tried to place in Group A, if invalid Group B...
    // Wait, no. They draw a Team, then they draw a Group ball. If invalid, they draw another Group ball?
    // Actually, usually they draw a Team, then start from Group A (or first available) and check constraints.
    // If there's a constraint, the computer tells them "Group A is invalid, move to B".
    // So the order of Groups is A->L, but skipped if invalid.
    // AND we must ensure that placing Team X in Group A doesn't make it impossible to place remaining teams.
    // That's why we need backtracking or "forced placement".

    // So the simulation should:
    // 1. Shuffle Teams (simulating the order they are drawn).
    // 2. For each Team in order, assign to the *first valid group* (in A-L order) that allows a valid completion of the rest of the draw.
    // This is the "computer assistant" part.

    // So `simulateDraw` logic:
    // For each Pot:
    //   Shuffle teams (draw order).
    //   Call `assignPot(teams, groups)`

    // `assignPot(teams, groups)`:
    //   This is the backtracking part.
    //   We need to assign the 12 teams to the 12 groups (1 each).
    //   `solve(teamIndex, usedGroupIndices)`

    for (let i = 0; i < groups.length; i++) {
        // Check if group i is already used in this pot assignment (passed via argument?)
        // Let's refine the backtrack signature.
    }
    return false;
}

// Helper for the backtracking within a Pot
function assignPot(teams: Team[], groups: Group[]): boolean {
    // We need to map teams[0..11] to groups[0..11] uniquely.
    // `usedGroups` tracks which groups have received a team in this pot.
    const usedGroups = new Set<number>();

    return solvePot(teams, groups, 0, usedGroups);
}

function solvePot(teams: Team[], groups: Group[], teamIdx: number, usedGroups: Set<number>): boolean {
    if (teamIdx === teams.length) {
        return true;
    }

    const team = teams[teamIdx];

    // Try groups A-L (0-11)
    // Optimization: Sort groups by "most constrained" first?
    // Or shuffle groups to add randomness?
    // Let's shuffle the order of groups we try, to ensure variety in simulation.
    // BUT, we must ensure we try ALL groups.
    const groupIndices = Array.from({ length: groups.length }, (_, i) => i);
    // Shuffle indices for randomness
    for (let i = groupIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groupIndices[i], groupIndices[j]] = [groupIndices[j], groupIndices[i]];
    }

    for (const i of groupIndices) {
        if (usedGroups.has(i)) continue;

        const group = groups[i];

        if (isValidAssignment(group, team)) {
            // Tentatively assign
            group.teams.push(team);
            usedGroups.add(i);

            // Recurse
            if (solvePot(teams, groups, teamIdx + 1, usedGroups)) {
                return true;
            }

            // Backtrack
            group.teams.pop();
            usedGroups.delete(i);
        }
    }

    return false;
}

export function simulateDraw(): Group[] {
    const MAX_ATTEMPTS = 100;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
            // Initialize empty groups
            const groups: Group[] = GROUPS.map(name => ({ name, teams: [] }));

            // Process pots 1 to 4
            const pots = [1, 2, 3, 4] as const;

            for (const potNum of pots) {
                let potTeams = shuffle(POTS[potNum]);

                if (potNum === 1) {
                    // Special handling for Pot 1 (Hosts)
                    // Mexico -> Group A (index 0)
                    // Canada -> Group B (index 1)
                    // USA -> Group D (index 3)

                    const hosts = {
                        mex: 0, // Group A
                        can: 1, // Group B
                        usa: 3  // Group D
                    };

                    // Assign hosts to their specific groups
                    Object.entries(hosts).forEach(([teamId, groupIdx]) => {
                        const team = potTeams.find(t => t.id === teamId);
                        if (team) {
                            groups[groupIdx].teams.push(team);
                        }
                    });

                    // Filter out hosts from the pot
                    const remainingPot1 = potTeams.filter(t => !Object.keys(hosts).includes(t.id));

                    // Assign remaining Pot 1 teams to remaining empty groups
                    // Groups A(0), B(1), D(3) are taken.
                    // Empty: C(2), E(4) ... L(11)
                    const emptyGroupIndices = [2, 4, 5, 6, 7, 8, 9, 10, 11];

                    for (let i = 0; i < remainingPot1.length; i++) {
                        const groupIdx = emptyGroupIndices[i];
                        groups[groupIdx].teams.push(remainingPot1[i]);
                    }

                    continue; // Done with Pot 1
                }

                const success = assignPot(potTeams, groups);
                if (!success) {
                    throw new Error(`Deadlock detected in Pot ${potNum}`);
                }
            }

            return groups; // Success!

        } catch (e) {
            // Retry
            if (attempt === MAX_ATTEMPTS - 1) throw e;
        }
    }

    throw new Error('Failed to generate draw after max attempts');
}
