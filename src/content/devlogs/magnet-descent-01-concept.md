---
game: "magnet-descent"
number: 1
title: "Locking the Core Concept (Week 1)"
date: "2026-09-08"
tags: ["Design & Research"]
excerpt: "Why a single-tap polarity flip beats directional controls for this specific idea, and what that constraint forces onto everything else."
---

## Starting From the Input, Not the Theme

The seed for this project wasn't "make a magnet game" — it was a narrower question: can a game built around exactly one input (a single tap, no direction, no hold-vs-release distinction) still produce enough moment-to-moment decision-making to be interesting for more than thirty seconds? Hyper-casual arcade games live or die on that question, and I wanted to pick a physical system where "one binary toggle" is a natural fit rather than a forced simplification.

Electromagnetic polarity fit immediately: a charge is binary (+/-) by nature, so flipping it is a complete, self-contained action with no missing states to design around. That's different from, say, forcing a platformer into one-button jump-only controls, where you're removing expressiveness the genre normally has. Here, the one-button constraint isn't a compromise — it's the actual mechanic.

## Why Repel/Attract Instead of Direct Steering

The obvious alternative design would give the player some direct left/right influence and use magnetism as a secondary hazard. I deliberately ruled that out. The moment there's direct steering, the magnetic field becomes decoration rather than the core skill test, and the game stops being about *reading forces and timing a flip* — which is the one thing I actually want players doing every second of a run.

Committing to zero direct steering means every ounce of player agency has to come from *when* you flip, not *where* you push. That's a much narrower design space, but a much clearer one, and it's the entire reason inverse-square force falloff matters (more on that in the next devlog) — the *shape* of the force field is doing all the work that a directional input would normally do in another game.

## Early Paper Prototype

Before touching Unity, I mocked up a few shaft layouts on paper — node positions, hazard placements — and manually walked through what a "correct" sequence of flips would look like to survive each one. This is a slow way to validate a design, but it caught an early problem fast: with nodes on both walls at matching heights, there's often no flip timing that avoids both walls simultaneously repelling or attracting the player into a hazard. That directly informed a design rule for the procedural generator (devlog #3): opposing-wall nodes can't share the same vertical band without a clear resolvable path between them.

## Next Steps

Nail down the actual force math — specifically how strong repulsion/attraction needs to be relative to fall speed and gravity so that flips feel *responsive* without making the particle whip around unpredictably. That's next week's focus before any code gets written.
