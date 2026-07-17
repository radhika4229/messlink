import Badge from "../ui/Badge";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import SectionTitle from "../ui/SectionTitle";
import Table from "../ui/Table";

import { messageContract } from "../../data/messageContract";
import { endpoints } from "../../data/endpoints";

export default function MessageContract() {
  return (
    <section
      id="contract"
      className="py-24"
    >
      <SectionTitle
        badge="API Contract"
        title="How nodes communicate."
        description="Each node exchanges structured JSON messages over WebSockets while exposing REST APIs for network control and monitoring."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {/* JSON */}

        <Card>

          <Badge>Packet Format</Badge>

          <h3 className="mt-5 font-mono text-2xl font-bold text-white">
            Message Schema
          </h3>

          <div className="mt-6">
            <CodeBlock
              language="json"
              code={JSON.stringify(messageContract, null, 2)}
            />
          </div>

        </Card>

        {/* API */}

        <Card>

          <Badge>REST API</Badge>

          <h3 className="mt-5 font-mono text-2xl font-bold text-white">
            Available Endpoints
          </h3>

          <div className="mt-6 overflow-x-auto">
            <Table
              columns={[
                {
                  header: "Method",
                  accessor: "method",
                },
                {
                  header: "Endpoint",
                  accessor: "endpoint",
                },
                {
                  header: "Description",
                  accessor: "description",
                },
              ]}
              data={endpoints}
            />
          </div>

        </Card>
      </div>

      {/* Notes */}

      <Card className="mt-10">

        <Badge>Security</Badge>

        <p className="mt-6 leading-8 text-[#94A3B8]">
          Every message contains a unique message ID, timestamp, routing
          information, priority level, payload, and an HMAC-SHA256 signature.
          Nodes verify the signature before forwarding packets, ensuring message
          integrity throughout the mesh network.
        </p>

      </Card>
    </section>
  );
}