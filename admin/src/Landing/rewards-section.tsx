import Card, { CardContent, CardHeader, CardTitle } from "./custom-ui/card"
import Button from "./custom-ui/button"

export default function RewardsSection() {
  const rewards = [
    {
      title: "Coffee Voucher",
      coins: 100,
      description: "Get a free coffee at participating local cafes",
      icon: "☕",
    },
    {
      title: "Plant a Tree",
      coins: 250,
      description: "We'll plant a tree in your name in the city park",
      icon: "🌳",
    },
    {
      title: "Eco Shopping Bag",
      coins: 150,
      description: "Sustainable shopping bag made from recycled materials",
      icon: "🛍️",
    },
    {
      title: "City Recognition",
      coins: 500,
      description: "Get featured as 'Citizen of the Month' on city website",
      icon: "🏆",
    },
  ]

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Earn Rewards for Clean Communities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every report that gets resolved earns you special coins. Redeem them for amazing rewards!
          </p>
        </div>

        {/* Coin System Explanation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🪙</div>
              <h3 className="text-xl font-semibold mb-2">Earn Coins</h3>
              <p className="text-gray-600">Get 25-100 coins per resolved report based on impact</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Build Reputation</h3>
              <p className="text-gray-600">Higher quality reports earn bonus coins and badges</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Redeem Rewards</h3>
              <p className="text-gray-600">Use coins for local perks and environmental initiatives</p>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{reward.icon}</div>
                <CardTitle className="text-lg">{reward.title}</CardTitle>
                <div className="text-2xl font-bold text-green-600">{reward.coins} coins</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Redeem Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            View All Rewards
          </Button>
        </div>
      </div>
    </section>
  )
}
