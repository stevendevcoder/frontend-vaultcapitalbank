interface Props {
  title: string
  value: string
}

export function ChartCard({ title, value }: Props) {
  return (
    <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
      <h3 className="text-[#22D3EE] font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}