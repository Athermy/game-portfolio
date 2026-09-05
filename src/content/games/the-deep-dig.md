---
title: "The Deep Dig"
role: "Solo Developer"
engine: "Unity"
languages: ["C#"]
solo: true
startDate: "2026-09"
tags: ["Excavation", "Restoration", "Meditative", "First-Person", "Systemic"]
shortDescription: "A slow-burn, meditative first-person game about unearthing a colossal buried monolith and restoring it to its original glory."
isPrivateRepo: true
status: "ongoing"
tools: ["Unity", "Blender"]
skills: ["Programming", "Systems Design", "Level Design"]
featured: false
---

## About the Game

The Deep Dig (working title, previously "Project Monolith") is a solo-developed excavation and restoration game built around a simple core fantasy: a colossal ancient structure lies buried beneath a flat, empty landscape, with only a small, mysterious tip poking through the surface. The player's job is to dig it out, then restore it.

There's no story in the traditional sense — no NPCs, no dialogue, no plot beats. The narrative, such as it is, is entirely environmental: whatever the monolith turns out to be is communicated by what gets uncovered, not by anyone telling you about it. First-person was chosen deliberately, partly for atmosphere and partly for practical solo-dev reasons — it sidesteps character modeling, rigging, and animation entirely, letting all development time go toward the systems that actually carry the game.

The project is structured in two distinct phases:

### Phase 1 — Excavation & Economy

Digging uses irregular, non-voxel mesh cutting with noise-jittered edge displacement, aiming for a hand-dug look rather than a blocky or grid-aligned one. Progress is gated by geological tiers — Topsoil, then Packed Clay & Roots, then Dense Rock & Bedrock — each requiring a better tool (Shovel → Mattock → Pneumatic Chisel) to break through. A limited-capacity backpack forces regular trips back to a Surface Camp, where dirt gets sold at the Hopper and earnings get spent at the Workbench on better tools, more capacity, and better lighting. Sunlight fades with depth, so lighting upgrades (Headlamps, deployable Lanterns) become a real progression axis of their own, not just flavor.

### Phase 2 — The Deep Clean

Once the monolith's full base is exposed, the game shifts from heavy excavation to slow, tactile restoration across a large surface area: an Outer Shell pass with a scraping tool, a Mineral Crust pass with a solvent spray, and a final Fine Dust & Moss pass with a precision water jet and soft brush. The payoff is watching the monolith's true architecture — its patterns, its design, whatever it turns out to be — emerge from underneath the grime.

## Current Status

This project just started. Right now the entire focus is **Milestone 1**: proving out the core dig mechanic in isolation, before any tools, tiers, economy, or lighting systems exist. Real-time, irregular, non-voxel terrain deformation is the single biggest technical unknown in the whole design, so it needs to work — and feel right — before anything else gets built on top of it.

### Planned Milestones

1. **Core dig mechanic** — irregular mesh cutting, no tools/tiers/economy yet
2. **Depth gating & tool tiers** — Topsoil → Clay → Bedrock, tool requirements
3. **Economy loop** — backpack capacity, Hopper, Workbench, upgrades
4. **Lighting & atmosphere** — sunlight falloff, headlamps, deployable lanterns
5. **Phase 2: The Deep Clean** — the full restoration sequence, built once Phase 1 is playable end-to-end
