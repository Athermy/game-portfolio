---
game: "magnet-descent"
number: 3
title: "Guaranteeing Solvable Layouts (Week 2)"
date: "2026-09-15"
tags: ["Design & Research", "Procedural Generation"]
excerpt: "Why 'randomly place nodes and hazards' isn't good enough for an infinite runner, and the validation approach I'm planning instead."
---

## The Problem With Naive Random Generation

The easy version of procedural generation for this game is: pick random node positions and polarities, scatter some hazards, repeat forever. The problem is that nothing about that process guarantees a layout is actually survivable. Given the paper-prototype finding from devlog #1 — that matched-height nodes on opposite walls can create genuinely unresolvable force combinations — pure randomness will eventually generate a chunk with no valid sequence of flips through it. In an infinite runner, "eventually" means "regularly," since the player sees hundreds of chunks per run.

An unbeatable chunk in a high-score chaser is worse than a hard one — a hard chunk feels like a skill check; an unbeatable one feels like the game cheated.

## Toward a Validation Pass

The plan is a two-step generation process rather than one: generate a candidate chunk, then run a lightweight validator against it before it's allowed to spawn. The validator doesn't need to find the *best* path, only confirm *a* path exists.

### Approach: Simplified Trajectory Simulation

Rather than a full physics simulation (expensive, and probably unnecessary for validation purposes), the plan is to run a coarse, simplified simulation at generation time: step the particle downward in fixed increments, and at each step, try both polarity states and see if at least one keeps the particle within safe bounds and clear of hazards for that step. This is essentially a narrow search over the two possible flip-states at each vertical band, pruning paths that lead into a hazard or off the shaft edges.

This is deliberately coarser than the real gameplay physics — it doesn't need pixel-perfect accuracy, it needs to answer one yes/no question: does at least one flip-timing sequence survive this chunk. If the search finds zero valid paths, the chunk gets regenerated (or hazard density gets reduced) before it's ever shown to the player.

## Design Rules Feeding Into This

A few constraints from earlier devlogs directly shape what the generator is and isn't allowed to produce:

- No opposing-wall nodes at matching heights without a resolvable path between them (from the devlog #1 paper prototype finding).
- Hazard density should scale with depth, but the validator needs to run *after* difficulty scaling is applied, not before — a layout that's valid at low difficulty isn't guaranteed to stay valid once more hazards get layered in.
- Chunks need to be generated and validated far enough ahead of the camera that a failed validation (requiring regeneration) never causes a visible hitch — this ties directly into the chunk-based spawning and object pooling system, which needs to keep a buffer of validated chunks ready, not generate-and-validate just-in-time at the last possible moment.

## Next Steps

This is the piece I'm least confident about without a working prototype — the "coarse simulation as validator" approach sounds reasonable on paper, but I won't know if it's fast enough to run per-chunk without stalling generation until there's actual code to profile. That's likely the very first system I build once implementation starts, ahead of anything visual, specifically to de-risk it early.
