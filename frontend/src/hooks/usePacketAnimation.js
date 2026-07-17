import { useCallback, useEffect, useRef, useState } from "react";
import { NODES } from "../data/graphData";

const SPEED = 700;

export default function usePacketAnimation() {
  const animationFrame = useRef();

  const [priority, setPriority] = useState("NORMAL");

  const [status, setStatus] = useState(
    "Idle. Toggle a link, then send a message."
  );

  const [sending, setSending] = useState(false);

  const [links, setLinks] = useState({
    ab: true,
    bc: true,
  });

  const [packet, setPacket] = useState({
    x: NODES.A.x,
    y: NODES.A.y,
    visible: false,
    queued: false,
  });

  const animate = useCallback((from, to, duration = SPEED) => {
    return new Promise((resolve) => {
      const start = performance.now();

      const frame = (time) => {
        const progress = Math.min(1, (time - start) / duration);

        setPacket((prev) => ({
          ...prev,
          visible: true,
          x: from.x + (to.x - from.x) * progress,
          y: from.y + (to.y - from.y) * progress,
        }));

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(frame);
        } else {
          resolve();
        }
      };

      animationFrame.current = requestAnimationFrame(frame);
    });
  }, []);

  const finishDelivery = useCallback(() => {
    setStatus("✅ DELIVERED via 2 hops");

    setTimeout(() => {
      setPacket((prev) => ({
        ...prev,
        visible: false,
        queued: false,
      }));

      setSending(false);
    }, 800);
  }, []);

  const resumeDelivery = useCallback(async () => {
    setPacket((prev) => ({
      ...prev,
      queued: false,
      visible: true,
    }));

    setStatus(
      '🟢 IN_TRANSIT — Resuming NODE_B → NODE_C via ["NODE_A","NODE_B"]'
    );

    await animate(NODES.B, NODES.C);

    finishDelivery();
  }, [animate, finishDelivery]);

  const sendMessage = useCallback(async () => {
    if (sending) return;

    setSending(true);

    setPacket({
      x: NODES.A.x,
      y: NODES.A.y,
      visible: true,
      queued: false,
    });

    setStatus(`🟢 IN_TRANSIT — NODE_A → NODE_B (${priority})`);

    await animate(NODES.A, NODES.B);

    if (!links.bc) {
      setPacket((prev) => ({
        ...prev,
        queued: true,
      }));

      setStatus("🟡 QUEUED at NODE_B waiting for B-C connection");

      setSending(false);

      return;
    }

    setStatus("🟢 IN_TRANSIT — NODE_B → NODE_C");

    await animate(NODES.B, NODES.C);

    finishDelivery();
  }, [
    animate,
    finishDelivery,
    links.bc,
    priority,
    sending,
  ]);

//   useEffect(() => {
//     if (links.bc && packet.queued) {
//       resumeDelivery();
//     }
//   }, [links.bc, packet.queued, resumeDelivery]);

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return {
    packet,
    priority,
    setPriority,
    links,
    setLinks,
    sending,
    status,
    sendMessage,
    resumeDelivery,
  };
}