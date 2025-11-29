import { Team } from './types';

export const TEAMS: Team[] = [
    // POT 1
    { id: 'can', name: 'Canada', confederation: 'CONCACAF', pot: 1, iso2: 'ca' },
    { id: 'mex', name: 'Mexico', confederation: 'CONCACAF', pot: 1, iso2: 'mx' },
    { id: 'usa', name: 'USA', confederation: 'CONCACAF', pot: 1, iso2: 'us' },
    { id: 'esp', name: 'Spain', confederation: 'UEFA', pot: 1, iso2: 'es' },
    { id: 'arg', name: 'Argentina', confederation: 'CONMEBOL', pot: 1, iso2: 'ar' },
    { id: 'fra', name: 'France', confederation: 'UEFA', pot: 1, iso2: 'fr' },
    { id: 'eng', name: 'England', confederation: 'UEFA', pot: 1, iso2: 'gb-eng' },
    { id: 'bra', name: 'Brazil', confederation: 'CONMEBOL', pot: 1, iso2: 'br' },
    { id: 'por', name: 'Portugal', confederation: 'UEFA', pot: 1, iso2: 'pt' },
    { id: 'ned', name: 'Netherlands', confederation: 'UEFA', pot: 1, iso2: 'nl' },
    { id: 'bel', name: 'Belgium', confederation: 'UEFA', pot: 1, iso2: 'be' },
    { id: 'ger', name: 'Germany', confederation: 'UEFA', pot: 1, iso2: 'de' },

    // POT 2
    { id: 'cro', name: 'Croatia', confederation: 'UEFA', pot: 2, iso2: 'hr' },
    { id: 'mar', name: 'Morocco', confederation: 'CAF', pot: 2, iso2: 'ma' },
    { id: 'col', name: 'Colombia', confederation: 'CONMEBOL', pot: 2, iso2: 'co' },
    { id: 'uru', name: 'Uruguay', confederation: 'CONMEBOL', pot: 2, iso2: 'uy' },
    { id: 'sui', name: 'Switzerland', confederation: 'UEFA', pot: 2, iso2: 'ch' },
    { id: 'jpn', name: 'Japan', confederation: 'AFC', pot: 2, iso2: 'jp' },
    { id: 'sen', name: 'Senegal', confederation: 'CAF', pot: 2, iso2: 'sn' },
    { id: 'irn', name: 'IR Iran', confederation: 'AFC', pot: 2, iso2: 'ir' },
    { id: 'kor', name: 'Korea Republic', confederation: 'AFC', pot: 2, iso2: 'kr' },
    { id: 'ecu', name: 'Ecuador', confederation: 'CONMEBOL', pot: 2, iso2: 'ec' },
    { id: 'aut', name: 'Austria', confederation: 'UEFA', pot: 2, iso2: 'at' },
    { id: 'aus', name: 'Australia', confederation: 'AFC', pot: 2, iso2: 'au' },

    // POT 3
    { id: 'nor', name: 'Norway', confederation: 'UEFA', pot: 3, iso2: 'no' },
    { id: 'pan', name: 'Panama', confederation: 'CONCACAF', pot: 3, iso2: 'pa' },
    { id: 'egy', name: 'Egypt', confederation: 'CAF', pot: 3, iso2: 'eg' },
    { id: 'alg', name: 'Algeria', confederation: 'CAF', pot: 3, iso2: 'dz' },
    { id: 'sco', name: 'Scotland', confederation: 'UEFA', pot: 3, iso2: 'gb-sct' },
    { id: 'par', name: 'Paraguay', confederation: 'CONMEBOL', pot: 3, iso2: 'py' },
    { id: 'tun', name: 'Tunisia', confederation: 'CAF', pot: 3, iso2: 'tn' },
    { id: 'civ', name: 'Côte d\'Ivoire', confederation: 'CAF', pot: 3, iso2: 'ci' },
    { id: 'uzb', name: 'Uzbekistan', confederation: 'AFC', pot: 3, iso2: 'uz' },
    { id: 'qat', name: 'Qatar', confederation: 'AFC', pot: 3, iso2: 'qa' },
    { id: 'ksa', name: 'Saudi Arabia', confederation: 'AFC', pot: 3, iso2: 'sa' },
    { id: 'rsa', name: 'South Africa', confederation: 'CAF', pot: 3, iso2: 'za' },

    // POT 4
    { id: 'jor', name: 'Jordan', confederation: 'AFC', pot: 4, iso2: 'jo' },
    { id: 'cpv', name: 'Cabo Verde', confederation: 'CAF', pot: 4, iso2: 'cv' },
    { id: 'gha', name: 'Ghana', confederation: 'CAF', pot: 4, iso2: 'gh' },
    { id: 'cur', name: 'Curaçao', confederation: 'CONCACAF', pot: 4, iso2: 'cw' },
    { id: 'hai', name: 'Haiti', confederation: 'CONCACAF', pot: 4, iso2: 'ht' },
    { id: 'nzl', name: 'New Zealand', confederation: 'OFC', pot: 4, iso2: 'nz' },

    // European Play-offs (Treat as UEFA)
    { id: 'po_uefa_a', name: 'UEFA Play-off A', confederation: 'UEFA', pot: 4, iso2: 'eu' }, // Placeholder EU flag
    { id: 'po_uefa_b', name: 'UEFA Play-off B', confederation: 'UEFA', pot: 4, iso2: 'eu' },
    { id: 'po_uefa_c', name: 'UEFA Play-off C', confederation: 'UEFA', pot: 4, iso2: 'eu' },
    { id: 'po_uefa_d', name: 'UEFA Play-off D', confederation: 'UEFA', pot: 4, iso2: 'eu' },

    // FIFA Play-offs
    // Play-off 1: NCL (OFC), JAM (CONCACAF), COD (CAF)
    {
        id: 'po_fifa_1',
        name: 'FIFA Play-off 1',
        confederation: 'OFC', // Placeholder, but use avoidConfederations for logic
        pot: 4,
        avoidConfederations: ['OFC', 'CONCACAF', 'CAF'],
        iso2: 'un' // Placeholder UN flag
    },
    // Play-off 2: IRQ (AFC), BOL (CONMEBOL), SUR (CONCACAF)
    {
        id: 'po_fifa_2',
        name: 'FIFA Play-off 2',
        confederation: 'AFC', // Placeholder
        pot: 4,
        avoidConfederations: ['AFC', 'CONMEBOL', 'CONCACAF'],
        iso2: 'un'
    }
];

export const POTS = {
    1: TEAMS.filter(t => t.pot === 1),
    2: TEAMS.filter(t => t.pot === 2),
    3: TEAMS.filter(t => t.pot === 3),
    4: TEAMS.filter(t => t.pot === 4),
};
