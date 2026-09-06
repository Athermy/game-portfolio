---
game: "magnet-descent"
number: 2
title: "Tuning the Force Math on Paper (Week 1)"
date: "2026-09-10"
tags: ["Design & Research", "Physics"]
excerpt: "Working out the inverse-square force model and why realistic physics would actually make the game feel worse, not better."
---

## Starting From Real Inverse-Square Law

Electromagnetic force in reality falls off with the square of distance: double the distance, force drops to a quarter. That's the obvious starting point for "Force Connectors" — the closer the particle is to a node, the more violently it should react.

Modeled this out as a spreadsheet before committing to it in code: force magnitude as `k * q1 * q2 / r²`, summed as vectors across every node within a maximum range `R_max`. Walked through several fall trajectories by hand, computing force at each sampled distance, to get a feel for how the numbers behave before there's anything visual to react to.

## Where True Inverse-Square Falls Apart For Gameplay

The math-accurate version has a real problem: as the particle gets very close to a node, `1/r²` approaches infinity, meaning force spikes explosively at close range. In reality this is fine because things don't actually touch a point charge. In a 2D arcade game where the particle has real size and can end up genuinely close to a node's visual position, this produces violent, unreadable flings — the particle can be repelled hard enough to instantly cross the entire shaft width in a single frame, which feels like a bug, not a mechanic.

### The Fix: Clamped Falloff

Rather than pure `1/r²`, I'm using a clamped version — inverse-square falloff for the "gameplay-relevant" mid-range, but with a minimum effective distance below which the force plateaus instead of spiking. This keeps close-range interactions strong and readable without ever producing an infinite (or absurdly large) instantaneous force.

```
force = k * charge_interaction / max(distance, min_distance)^2
```

This one-line change was the difference between "feels like a physics toy" and "feels like a glitch" in my hand-calculated trajectory walkthroughs.

## Balancing Force Strength Against Fall Speed

The other open question was relative scale: how strong should peak magnetic force be compared to gravity and fall speed? Too weak, and flipping barely matters — the player just falls through everything. Too strong, and a single well-timed flip can fling the particle sideways faster than gravity can ever pull it back down, which breaks the "descent" framing entirely.

Landed on a rule of thumb for the tuning pass once code exists: peak force at minimum distance should be roughly 3-4x current fall speed's worth of acceleration, decaying to roughly parity with gravity at `R_max`. That's a starting hypothesis, not a final number — this is exactly the kind of thing that needs to be felt in an actual build, not just computed on paper, so it's flagged as the first thing to tune once the prototype exists.

## Next Steps

Move from paper math to the procedural generation problem — specifically, how to guarantee a generated shaft is always survivable before it ever reaches the player, since a level generator that can produce unbeatable layouts is worse than no procedural generation at all.
