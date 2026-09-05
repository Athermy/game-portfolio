---
game: "the-deep-dig"
number: 1
title: "Terrain Deformation Research (Week 1)"
date: "2026-09-05"
tags: ["Design & Research", "Unity"]
excerpt: "Surveying how other games handle real-time deformable terrain before committing to an approach for the dig mechanic."
---

## The Core Technical Question

Before writing any real code, I wanted to understand the actual solution space for real-time deformable terrain, since this is the single biggest technical risk in the whole project. The look I'm after is specific: irregular, hand-dug shapes with noise-jittered edges — not a blocky grid, not perfectly smooth geometry either. That rules out some of the more common approaches outright and narrows things down to a few real candidates.

## Approaches I Looked At

### Voxel Grids (Cubic)

The most common approach for destructible/diggable terrain (Minecraft being the obvious reference point, though far from the only one). Fast, well-understood, tons of prior art and tutorials. The problem is the look — cubic voxels read as blocky by default, and while you can fake smoother shapes with clever texturing or greedy meshing, getting a genuinely irregular, organic dig shape out of an axis-aligned grid fights the medium rather than working with it. Rejected for this project specifically because of the visual target, not because it's a bad technique in general.

### Marching Cubes on a Dense Voxel Field

A step up from raw cubic voxels: instead of rendering each voxel as a literal cube, you sample a 3D density field and generate a smooth isosurface mesh from it (this is how a lot of "smooth terrain" games — Landmark, some Minecraft-likes with smooth terrain mods — get organic-looking deformation while still using a voxel-like data structure underneath). This gets much closer to the look I want, and edge noise/jitter is relatively natural to add by perturbing the density field itself rather than the mesh directly. Main costs: more expensive per-edit than raw voxels (regenerating a marching-cubes mesh isn't free), and getting genuinely *sharp, hand-tool-shaped* cuts out of a smooth isosurface can fight the algorithm a little, since marching cubes naturally wants to smooth things out.

### Direct Mesh Boolean Operations (CSG)

Rather than an underlying voxel/density representation, treat the ground as a real mesh and literally subtract a "cutter" shape (the shovel's dig volume) from it in real time using boolean mesh operations. This is closer to how some destruction-focused games handle chunk-based cutting. The appeal here is directness — the cutter shape *is* the dig shape, so getting an irregular, non-cubic, noise-displaced cut is almost the default behavior rather than something you have to work to preserve through an intermediate representation. The concern is robustness and performance: real-time CSG on arbitrary meshes has a reputation for being fragile (degenerate geometry, topology edge cases) and potentially expensive if not carefully constrained.

## Where I've Landed (For Now)

I don't think I can responsibly pick a final approach from research alone — this is exactly the kind of decision that needs a rough, throwaway prototype of each candidate before committing, since "feels right" and "performs well enough" are both things I can only actually evaluate hands-on. My plan for the next stretch:

1. Build the smallest possible marching-cubes prototype: one small terrain block, one dig tool, see how the "hand-dug" look actually reads once it exists in 3D rather than in my head.
2. Build an equivalent small prototype using direct mesh boolean subtraction on a simple plane, using Unity's existing mesh boolean tooling (or a well-regarded third-party CSG library if the built-in options are too limited) as a starting point rather than writing boolean geometry from scratch.
3. Compare both on three axes: visual result against the reference "hand-dug" look, edit performance (time to regenerate geometry per dig action), and how much custom code each approach would realistically need beyond the prototype stage.

## Next Steps

Build both throwaway prototypes and actually dig a hole in each one. No further research until there's something on screen to react to — this is a case where reading about the tradeoffs can only take the decision so far.
