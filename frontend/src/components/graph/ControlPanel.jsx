import Button from "../ui/Button";

export default function ControlPanel({
  priority,
  setPriority,
  links,
  setLinks,
  packet,
  sending,
  sendMessage,
  resumeDelivery,
}) {
  const toggleAB = () => {
    setLinks((prev) => ({
      ...prev,
      ab: !prev.ab,
    }));
  };

  const toggleBC = () => {
    const reconnecting = !links.bc;

    setLinks((prev) => ({
      ...prev,
      bc: reconnecting,
    }));

    if (reconnecting && packet.queued) {
      resumeDelivery();
    }
  };

  return (
    <div className="mt-6 space-y-6">

      <div className="flex flex-wrap gap-3">

        <Button
          variant="secondary"
          onClick={toggleAB}
        >
          {links.ab
            ? "Disconnect A-B"
            : "Reconnect A-B"}
        </Button>

        <Button
          variant="secondary"
          onClick={toggleBC}
        >
          {links.bc
            ? "Disconnect B-C"
            : "Reconnect B-C"}
        </Button>

      </div>

      <div className="flex gap-3">

        <Button
          variant={
            priority === "NORMAL"
              ? "primary"
              : "secondary"
          }
          onClick={() => setPriority("NORMAL")}
        >
          NORMAL
        </Button>

        <Button
          variant={
            priority === "SOS"
              ? "primary"
              : "secondary"
          }
          onClick={() => setPriority("SOS")}
        >
          SOS
        </Button>

      </div>

      <Button
        className="w-full"
        disabled={sending}
        onClick={sendMessage}
      >
        Send A → C
      </Button>

    </div>
  );
}