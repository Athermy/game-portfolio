---
title: "Magnet Descent"
role: "Solo Developer"
engine: "Unity"
languages: ["C#"]
solo: true
startDate: "2026-09"
tags: ["Arcade", "Physics", "Procedural", "Hyper-Casual", "Mobile"]
shortDescription: "A single-tap 2D infinite faller where a charged particle descends through a procedurally generated shaft, steered entirely by flipping magnetic polarity against electromagnetic wall nodes."
isPrivateRepo: true
status: "ongoing"
tools: ["Unity"]
skills: ["Programming", "Systems Design", "UI", "VFX"]
featured: false
---

## About the Game

Magnet Descent is a fast-paced, single-tap 2D infinite faller built around electromagnetic physics instead of traditional directional controls. The player controls a glowing charged particle falling through an infinitely generated vertical shaft lined with magnetic wall nodes. There's exactly one input: a tap anywhere on screen instantly flips the particle's polarity between Positive (+) and Negative (-). Like-charges repel the particle away from a wall node; opposite charges pull it in. Every bit of navigation comes from timing that single flip against real-time force calculations, not from steering directly.

No story, no characters — the entire game is the physics toy itself: how far can you get by reading force vectors and timing polarity flips against an ever-escalating fall.

## Core Gameplay Loop

- **The Fall**: constant downward gravity, accelerating slightly the longer a run lasts.
- **The Magnetism**: wall nodes emit electromagnetic forces that bend the particle's trajectory in real time using inverse-square physics.
- **The Single Input**: tapping toggles charge state — Red (+) is repelled by Red nodes and attracted to Blue nodes; Blue (-) is the inverse.
- **Hazards & Progression**: spikes, laser barriers, and floating obstacles gate progress; the goal is simply depth and survival time.

## Visual Style & Presentation

- **Art direction**: minimalist cyberpunk / vector glow — high-contrast neon geometry over a dark vector background.
- **Palette**: red/pink glow for Positive charge, blue/cyan glow for Negative charge, dark charcoal/slate for walls, hazards, and UI.
- **Juice**: a neon motion trail that bends along calculated force vectors in real time, brightness-reactive "force connector" lines linking the player to nearby active nodes within magnetic range, bloom post-processing, and camera rumble on near-misses or high-velocity wall repulsions.

## Key Technical Systems

- **Physics & vector math**: a custom magnetic force calculation running alongside engine gravity, aggregating force vectors across every active node within proximity each frame.
- **Procedural level generation**: a chunk-based generator spawning sections ahead of the camera, with a level-validation pass to guarantee every generated layout has at least one mathematically beatable trajectory through it — not just "spawn obstacles and hope."
- **Memory optimization**: an object pooling system for wall nodes, hazards, and level chunks, specifically to eliminate runtime GC spikes and hold a steady 60 FPS.
- **State machine & audio**: a modular FSM handling Menu / Playing / Paused / GameOver transitions, with procedural pitch modulation on SFX driven by current speed and magnetic force strength.

## Current Status

Pre-production (concept, physics math, and procedural generation approach) is done — see the first four devlogs below. Implementation started this week: a minimal one-node, one-particle prototype now exists in Unity to validate the force model against a real build instead of paper math.
