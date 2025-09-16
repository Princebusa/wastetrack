import Layout from '../layout/Layout'


const Leaderboard = () => {

  const leaderboardData = [
  {
    id: 1,
    name: "Alex Rodriguez",
    area: "Sales",
    points: 2850,
    badge: "Champion",
  },
  {
    id: 2,
    name: "Sarah Chen",
    area: "Marketing",
    points: 2720,
    badge: "Expert",
  },
  {
    id: 3,
    name: "Michael Johnson",
    area: "Development",
    points: 2650,
    badge: "Master",
  },
  {
    id: 4,
    name: "Emily Davis",
    area: "Design",
    points: 2480,
    badge: "Pro",
  },
  {
    id: 5,
    name: "David Wilson",
    area: "Operations",
    points: 2350,
    badge: "Advanced",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    area: "HR",
    points: 2200,
    badge: "Skilled",
  },
  {
    id: 7,
    name: "James Brown",
    area: "Finance",
    points: 2100,
    badge: "Rising Star",
  },
  {
    id: 8,
    name: "Maria Garcia",
    area: "Customer Success",
    points: 1950,
    badge: "Achiever",
  },
]
    return (
      <Layout>
        <div className='mt-3'>
          <div></div>
          <div>
           <table className="min-w-full border-separate border-spacing-y-3">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Rank</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Area</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Points</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Badge</th>
    </tr>
  </thead>
  <tbody>
    {leaderboardData.map((user, index) => (
      <tr key={user.id} className="bg-gray-50 shadow-sm rounded-lg">
        {/* Rank Number */}
        <td className="px-4 py-2 font-semibold text-gray-700">{index + 1}</td>

        {/* Avatar + Name */}
        <td className="px-4 py-2 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-800">{user.name}</span>
        </td>

        {/* Area */}
        <td className="px-4 py-2 text-gray-600">{user.area}</td>

        {/* Points */}
        <td className="px-4 py-2 text-gray-600">{user.points}</td>

        {/* Badge */}
        <td className="px-4 py-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {user.badge}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>



          </div>
        </div>
        </Layout>
)}

export default Leaderboard