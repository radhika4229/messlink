# MessLink

**Build.IT '26 — Software Track: "First Contact"**

A decentralized mesh communication simulator. When traditional infrastructure (internet, cell towers, central servers) goes down, MessLink lets devices relay messages directly to each other — hop by hop — until they reach their destination, with automatic store-and-forward when a link is temporarily down.

🔗 **Live demo**: https://messlink.vercel.app/
🔗 **Repo**: https://github.com/radhika4229/messlink

---

## The Problem

Aliens disable all digital communication infrastructure worldwide. No WhatsApp, no cell towers, no central servers. MessLink rebuilds communication from the ground up using a peer-to-peer mesh model — inspired by real tools like Bridgefy and Briar, which use device-to-device relaying instead of centralized servers.

## How It Works

Three independent "devices" (Node A, Node B, Node C) simulate a mesh network:
Node A ⟷ Node B ⟷ Node C
Node A and Node C are **not directly connected** — any message between them must relay through Node B.

- **Direct messaging**: if the destination is a direct neighbor, the message goes straight there.
- **Multi-hop relay**: if not, the message floods to connected neighbors (except the one it came from) until it reaches its destination.
- **Store-and-forward**: if the next hop is disconnected, the message is queued in the database and automatically delivered once that link reconnects.
- **Priority handling**: SOS-priority messages are delivered ahead of normal messages when a queue flushes.
- **Message signing**: every message is signed; tampered or unsigned messages are rejected before being relayed.

## Architecture

- **Backend**: 3 independent Spring Boot instances (one per node), each with its own PostgreSQL database, communicating peer-to-peer over WebSocket.
- **Frontend**: React + Tailwind, showing a live network graph (connection state, hop animation) and a chat panel (message composer, live status log).
- **Deployment**: backend nodes on Render (Docker), databases on Neon (PostgreSQL), frontend on Vercel.

## Tech Stack

- **Backend**: Java 21, Spring Boot 4, Spring WebSocket, Spring Data JPA, PostgreSQL
- **Frontend**: React, Vite, Tailwind CSS
- **Infra**: Docker, Render, Neon, Vercel

## Live URLs

| Node | REST/Status | WebSocket |
|---|---|---|
| Node A | https://messlink-node-a.onrender.com | wss://messlink-node-a.onrender.com/ws/client |
| Node B | https://messlink-node-b.onrender.com | wss://messlink-node-b.onrender.com/ws/client |
| Node C | https://messlink-node-c.onrender.com | wss://messlink-node-c.onrender.com/ws/client |

> Backend is on Render's free tier, which sleeps after inactivity — the first request after idle time may take 30–50 seconds to wake up.

## Key API Endpoints
POST /api/message/send            { senderId, receiverId, payload, priority }
GET  /api/message/log/{nodeId}
POST /api/node/toggle-connection  { neighborId, connected }
GET  /api/node/status

## Team

- **Backend, Docker, Deployment**: Radhika
- **Frontend — Network Graph**: Priya
- **Frontend — Chat Panel & WebSocket Integration**: Palak

## Running Locally

**Backend** (needs 3 Postgres databases, one per node):
```bash
cd backend
docker-compose up --build
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

## What We'd Add With More Time

- TTL/hop-limit to cap flooding radius on larger networks
- Proper routing table instead of pure flooding, for scalability beyond a handful of nodes
- Per-node key pairs instead of a shared HMAC secret for signing