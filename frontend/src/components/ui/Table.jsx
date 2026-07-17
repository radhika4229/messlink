export default function Table({
  columns = [],
  data = [],
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#232B36]">
      <table className="min-w-full border-collapse">
        <thead className="bg-[#10151D]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="border-b border-[#232B36] px-5 py-4 text-left font-mono text-xs uppercase tracking-wider text-[#3ECF8E]"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors duration-200 hover:bg-[#10151D]"
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="border-b border-[#232B36] px-5 py-4 text-sm text-[#CBD5E1]"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-8 text-center text-sm text-[#64748B]">
          No data available.
        </div>
      )}
    </div>
  );
}