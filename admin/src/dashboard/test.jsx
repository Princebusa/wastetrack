import React from 'react';

const leaderboardData = [
  { rank: 1, name: 'City Name 1', score: 950, image: 'https://placehold.co/100x100?text=User' },
  { rank: 2, name: 'City Name 2', score: 880 },
  { rank: 3, name: 'City Name 3', score: 750 },
];

const test = () => {
  // Sort the data to display in 2, 1, 3 order
  const sortedData = [...leaderboardData].sort((a, b) => {
    const order = [2, 1, 3];
    return order.indexOf(a.rank) - order.indexOf(b.rank);
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 p-8 pb-12 font-sans">
      <h1 className="text-5xl font-bold uppercase tracking-wide mb-10 text-[#016630]">
        Green City Ranking
      </h1>
      <div className="flex justify-center items-end w-full max-w-4xl gap-5">
        {sortedData.map((item) => (
          <div
            key={item.rank}
            className={`
              relative flex flex-col justify-end items-center w-full sm:w-1/3 md:w-1/4
              p-5 pt-10 rounded-t-2xl shadow-xl transition-transform duration-300 hover:-translate-y-2
              text-white
              ${item.rank === 1 ? 'bg-gradient-to-t from-[#016630] to-[#1a854d] h-96' : ''}
              ${item.rank === 2 ? 'bg-gradient-to-t from-[#2f8859] to-[#45a86d] h-64' : ''}
              ${item.rank === 3 ? 'bg-gradient-to-t from-[#64b589] to-[#80c69d] h-48' : ''}
            `}
          >
            {item.rank === 1 && item.image && (
              <div className="absolute -top-12 bg-white border-4 border-white rounded-full w-24 h-24 overflow-hidden shadow-lg">
                <img src={item.image} alt="First Place User" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-center">
              <span className={`font-bold leading-none ${item.rank === 1 ? 'text-8xl' : item.rank === 2 ? 'text-6xl' : 'text-5xl'}`}>
                {item.rank}
              </span>
              <p className="text-xl font-semibold mb-1">{item.name}</p>
              <p className="text-lg font-medium opacity-80">{item.score} Points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default test;