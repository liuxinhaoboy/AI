import { useState } from 'react';
import { Calculator, Dices, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { solve24 } from '@/utils/calc24';

export default function Home() {
  const [cards, setCards] = useState<string[]>(['', '', '', '']);
  const [results, setResults] = useState<string[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      const num = parseInt(value);
      // Limit to 1-13
      if (value === '' || (num >= 1 && num <= 13)) {
        const newCards = [...cards];
        newCards[index] = value;
        setCards(newCards);
        setResults(null); // Reset results on input change
      }
    }
  };

  const handleRandom = () => {
    const newCards = Array.from({ length: 4 }, () => String(Math.floor(Math.random() * 13) + 1));
    setCards(newCards);
    setResults(null);
  };

  const handleClear = () => {
    setCards(['', '', '', '']);
    setResults(null);
  };

  const handleCalculate = () => {
    if (cards.some(c => c === '')) return;
    
    setIsCalculating(true);
    
    // Slight delay to allow UI to show calculating state if needed
    setTimeout(() => {
      const nums = cards.map(c => parseInt(c));
      const res = solve24(nums);
      setResults(res);
      setIsCalculating(false);
    }, 100);
  };

  const isAllFilled = cards.every(c => c !== '');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-4 md:px-8 flex items-center justify-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md">
            <Calculator size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">24点计算器</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8">
        
        {/* Input Section */}
        <section className="flex flex-col items-center gap-8 mt-4 md:mt-8">
          <p className="text-slate-500 text-sm md:text-base">请输入4个数字 (1-13)，我们将为你计算出结果为24的所有可能算式。</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-2xl shadow-sm border border-slate-200 aspect-[3/4] flex items-center justify-center group focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all overflow-hidden"
              >
                {/* Decorative card elements */}
                <div className="absolute top-2 left-3 text-xs font-semibold text-slate-300 pointer-events-none select-none">{card || '?'}</div>
                <div className="absolute bottom-2 right-3 text-xs font-semibold text-slate-300 pointer-events-none select-none rotate-180">{card || '?'}</div>
                
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={card}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full h-full text-center text-4xl md:text-5xl font-bold text-slate-700 bg-transparent outline-none placeholder:text-slate-200"
                  placeholder="?"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm active:scale-95"
            >
              <RotateCcw size={18} />
              <span>清空</span>
            </button>
            
            <button
              onClick={handleRandom}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm active:scale-95"
            >
              <Dices size={18} />
              <span>随机发牌</span>
            </button>

            <button
              onClick={handleCalculate}
              disabled={!isAllFilled || isCalculating}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95
                ${!isAllFilled 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'}`}
            >
              {isCalculating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Calculator size={20} />
              )}
              <span>计算 24 点</span>
            </button>
          </div>
        </section>

        {/* Results Section */}
        {results !== null && (
          <section className="w-full mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                {results.length > 0 ? (
                  <>
                    <div className="text-emerald-500 bg-emerald-50 p-2 rounded-full">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">计算成功</h2>
                      <p className="text-slate-500 text-sm">共找到 {results.length} 种不同的解法</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-rose-500 bg-rose-50 p-2 rounded-full">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">无解</h2>
                      <p className="text-slate-500 text-sm">当前数字组合无法得出 24 点</p>
                    </div>
                  </>
                )}
              </div>

              {results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {results.map((expr, i) => (
                    <div 
                      key={i} 
                      className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 font-mono text-lg text-slate-700 flex items-center justify-between group hover:bg-blue-50 hover:border-blue-100 hover:text-blue-700 transition-colors"
                    >
                      <span className="tracking-wider">{expr}</span>
                      <span className="text-slate-300 group-hover:text-blue-300 font-sans text-sm font-medium">= 24</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
        
      </main>
      
      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-slate-400 text-sm">
        <p>24点计算工具 &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
