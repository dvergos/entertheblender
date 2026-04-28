export function UnderConstruction() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full text-center">
        {/* Blender Illustration - using placeholder text */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-xl h-64 bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="text-6xl mb-2">🔨</div>
              <p className="text-neutral-400 text-sm font-mono">Under Construction</p>
            </div>
          </div>
        </div>

        {/* Variation 1: Elegant Serif (Playfair Display style) */}
        <div className="mb-12 pb-12 border-b border-neutral-200">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">VARIATION 1</p>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-serif italic max-w-xl mx-auto">
            We are currently cultivating our digital orchard and vineyard. The finest organic hospitality experiences take time to ripen.
          </p>
        </div>

        {/* Variation 2: Handwritten Script (Cursive) */}
        <div className="mb-12 pb-12 border-b border-neutral-200">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">VARIATION 2</p>
          <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-xl mx-auto" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: 300 }}>
            We are currently cultivating our digital orchard and vineyard. The finest organic hospitality experiences take time to ripen.
          </p>
        </div>

        {/* Variation 3: Minimal Sans with Letter Spacing */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">VARIATION 3</p>
          <p className="text-sm md:text-base leading-loose text-neutral-600 max-w-xl mx-auto tracking-wide font-light">
            We are currently cultivating our digital orchard and vineyard. The finest organic hospitality experiences take time to ripen.
          </p>
        </div>

        {/* Optional decorative element */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
