import Badge from "./custom-ui/badge"

export default function CommunityMapSection() {
  const recentReports = [
    { id: 1, location: "Main Street Park", status: "cleaning", reporter: "Sarah M.", coins: 50 },
    { id: 2, location: "Downtown Plaza", status: "completed", reporter: "Mike R.", coins: 75 },
    { id: 3, location: "River Walk Trail", status: "reported", reporter: "Anna K.", coins: 60 },
    { id: 4, location: "School Playground", status: "cleaning", reporter: "David L.", coins: 40 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported":
        return "bg-yellow-100 text-yellow-800"
      case "cleaning":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Community Activity Map</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See real-time reports and cleaning activities in your area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mock Map Area */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Interactive Map</h3>
            <div className="bg-green-50 rounded-lg h-80 flex items-center justify-center border-2 border-dashed border-green-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-gray-600">Interactive map showing reported locations</p>
                <p className="text-sm text-gray-500 mt-2">Click anywhere to report a dirty place</p>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Reports</h3>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{report.location}</h4>
                    <p className="text-sm text-gray-600">Reported by {report.reporter}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">{report.coins} coins</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
