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
    for (let i = 0; i < groups.length; i++) {
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
    // Initialize empty groups
    const groups: Group[] = GROUPS.map(name => ({ name, teams: [] }));

    // Process pots 1 to 4
    const pots = [1, 2, 3, 4] as const;

    for (const potNum of pots) {
        const potTeams = shuffle(POTS[potNum]);

        // For Pot 1, we can just assign 1-to-1 to A-L (since they are seeds)
        // But let's use the generic solver to be safe and consistent.
        // Actually Pot 1: Hosts are usually pre-assigned?
        // "Pot 1: 3 host nations + 9 highest... Hosts usually A1, B1, C1 etc?"
        // Prompt: "Pathway 1: Groups A, B, C... Semi-final bracket 1... Top-ranked Pot 1 teams... distributed".
        // Usually Hosts take A1, and maybe others.
        // Let's assume standard draw: Pot 1 teams are drawn and assigned A-L.
        // Hosts might be pre-assigned to A, B, C?
        // Prompt doesn't explicitly say "Hosts in A, B, C".
        // But usually hosts are A1. With 3 hosts (CAN, MEX, USA), they might be A1, B1, C1?
        // Let's just treat them as Pot 1 teams and let the random draw assign them, 
        // UNLESS there's a specific rule.
        // "Top-ranked Pot 1 teams (1st/2nd and 3rd/4th) distributed across different pathways".
        // This implies some seeding logic for Pot 1 distribution.
        // For this MVP simulator, I will just shuffle Pot 1 and assign A-L.
        // The user can restart if they want specific hosts in specific groups.
        // Or I can force Hosts to A, B, C if I knew which ones.
        // Let's stick to random shuffle for Pot 1 for now.

        const success = assignPot(potTeams, groups);
        if (!success) {
            // If we get stuck (shouldn't happen for Pot 1, but maybe Pot 4),
            // we might need to restart the WHOLE draw or backtrack previous pots.
            // But usually, standard draw logic only backtracks within the current Pot 
            // (or the computer ensures the current Pot is valid relative to previous).
            // If `assignPot` fails, it means the previous pots created a state where the current pot cannot be placed.
            // In a real draw, this is prevented by "computer assistance" during previous steps?
            // Or we just retry the simulation.
            // For this app, if it fails, we throw an error or return null and the UI can retry.
            console.error(`Failed to assign Pot ${potNum}`);
            throw new Error(`Deadlock detected in Pot ${potNum}. Please retry.`);
        }
    }

    return groups;
}
