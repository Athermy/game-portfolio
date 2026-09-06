---
game: "magnet-descent"
number: 5
title: "First Prototype: One Node, One Particle (Week 3)"
date: "2026-09-22"
tags: ["Programming", "Unity", "Physics"]
excerpt: "Opening Unity for the first time on this project — implementing the clamped inverse-square force from devlog #2 and seeing if the paper-tuned numbers hold up."
---

## Finally Writing Code

Created the actual Unity project this week — the first concrete implementation step after three weeks of paper design (devlogs #1-#4). Kept the scope deliberately tiny: one static node, one particle affected by gravity and that node's force, no procedural generation, no hazards, no FSM yet. The only goal was to validate the clamped inverse-square force model from devlog #2 against a real, playable frame-by-frame simulation instead of a spreadsheet.

## Implementing the Clamped Force

```csharp
Vector2 GetMagneticForce(Vector2 particlePos, MagneticNode node, int particleCharge)
{
    Vector2 delta = node.Position - particlePos;
    float distance = Mathf.Max(delta.magnitude, node.MinDistance);
    float interaction = particleCharge * node.Charge; // + or - depending on match
    float magnitude = node.ForceConstant * interaction / (distance * distance);
    return delta.normalized * magnitude;
}
```

This is close to a direct translation of the spreadsheet formula from devlog #2, with `node.MinDistance` doing the same job the clamp did on paper — preventing the force from spiking toward infinity as the particle approaches the node's exact position.

## The Numbers Didn't Survive Contact Unchanged

The paper estimate (peak force roughly 3-4x fall-speed's worth of acceleration) was in the right neighborhood but not correct. At that strength, the particle's first real repulsion felt noticeably more violent in an actual build than it did in my hand-walked trajectory notes — likely because the paper walkthrough sampled discrete steps and smoothed over exactly the kind of frame-to-frame snap that's obvious the moment it's rendered and moving in real time.

Brought peak force down to roughly 2x fall-speed's worth of acceleration as a new working number, which immediately felt closer to "satisfying push" rather than "particle got yeeted off screen." Still not calling this final — it needs testing against actual node layouts, not just one node in isolation — but it's a much better starting point than the original paper estimate.

## One Thing The Paper Prototype Didn't Catch

Fall speed increasing over time (per the "accelerating slightly" design from the original concept) interacts with force tuning in a way I hadn't fully considered: a force value tuned to feel right early in a run will feel progressively weaker relative to fall speed later in a run, since gravity's contribution keeps growing while node force strength is currently static. Whether that's a problem or an intentional difficulty curve (later nodes need to be stronger or more numerous to matter) is an open question — flagging it now rather than solving it, since it's premature to answer before hazards and depth-based difficulty scaling exist at all.

## Next Steps

Get a second node on screen with opposite polarity so there's an actual "choose when to flip" decision to test, instead of a single node that only ever does one thing.
