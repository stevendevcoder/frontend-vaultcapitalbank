import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { Transaction } from "../../types/Transaction"

interface Props {
  transactions: Transaction[]
}

export function StatisticsChart({ transactions }: Props) {
  const data = transactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount,
  }))

  return (
    <div className="bg-white dark:bg-darkBackground p-4 rounded-xl shadow border border-border">
      <h3 className="text-lg font-semibold mb-4 text-text">Historial de Transacciones</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#22D3EE" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
