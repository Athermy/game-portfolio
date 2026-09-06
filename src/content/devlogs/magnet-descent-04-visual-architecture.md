---
game: "magnet-descent"
number: 4
title: "Visual Direction & System Architecture (Week 2)"
date: "2026-09-17"
tags: ["Design & Research", "2D Art", "Unity"]
excerpt: "Locking the vector-glow art direction and sketching the FSM/pooling architecture before writing the first line of gameplay code."
---

## Why Vector Glow, Specifically

Wanted an art direction that could communicate the entire ruleset through color alone, since the whole game hinges on players reading polarity at a glance mid-fall. Minimalist cyberpunk / vector glow does this almost for free: red/pink reads as one state, blue/cyan reads as the other, and a dark charcoal background makes both colors pop without needing any UI to explain "this node is currently repelling you." Collected reference from vector-art and neon-outline styles rather than filled sprite work, specifically because line-based glow scales cleanly across mobile and web resolutions without needing multiple sprite resolutions.

The "Force Connector" lines (visualizing active force vectors between the player and nearby nodes) are doing double duty here — they're not just juice, they're the primary readability tool for understanding *why* the particle is moving the way it is at any given moment. That elevates them from "nice to have" to "core UI," which changes how much priority they get once implementation starts.

## Sketching the System Architecture

Before writing gameplay code, mapped out how the major systems need to talk to each other, since several of them (physics, pooling, procedural generation, FSM) have real ordering dependencies:

- **FSM gates everything else.** Menu / Playing / Paused / GameOver needs to exist first, even as a stub, since the physics and generation systems should only ever run during the Playing state — building them without a state boundary risks needing an awkward retrofit later.
- **Object pooling has to exist before procedural generation gets built on top of it**, not after. If chunks/nodes/hazards are instantiated and destroyed normally during initial prototyping "just to get something on screen," that's exactly the kind of shortcut that's expensive to unwind once generation logic starts assuming pooled objects.
- **The coarse-simulation validator from devlog #3 sits between generation and pooling** — it needs access to a candidate chunk's data before that chunk is drawn from the pool and placed, so it's being designed as a pure function operating on chunk data, not on live GameObjects, to keep it fast and testable in isolation.

## Audio Direction

Procedural pitch modulation (SFX pitch shifting with current speed and force magnitude) needs hooks into both the physics system and the FSM, but deliberately as a *listener*, not a dependency — audio should never be able to affect gameplay timing, only react to it. Keeping this one-directional now avoids a whole category of "why does turning sound off change hitboxes" bugs later.

## Where This Leaves Things

Two weeks in, and everything so far has been paper, spreadsheets, and reference boards — no Unity project has been created yet. That's deliberate: the mechanic (devlog #1), the force math (devlog #2), and the generation/validation approach (devlog #3) were all things I wanted to fail cheaply on paper if they were going to fail, rather than discover a design flaw after weeks of implementation. Next devlog will be the first one written *after* opening Unity.

## Next Steps

Create the actual Unity project, get a single node and a single particle on screen with the clamped inverse-square force from devlog #2 driving movement, and see whether the paper-tuned numbers survive contact with an actual build.
