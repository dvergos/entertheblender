export function LogoVariations() {
  // Using text logo instead of Figma image
  const LogoPlaceholder = () => (
    <div className="text-xl font-oswald tracking-widest uppercase font-bold text-neutral-900">
      The Blender
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <h1 className="text-3xl font-oswald uppercase tracking-widest mb-12 text-center">
        Logo Placement Variations
      </h1>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Variation 1: Current - Left Aligned */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">01 — CURRENT: Left Aligned, Large</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md h-24 flex items-center justify-between px-12">
            <div className="h-full py-4 flex items-center">
              <LogoPlaceholder />
            </div>
            <div className="flex items-center gap-6 text-sm uppercase">
              <span>Basket</span>
              <span>Orchard</span>
              <span>Vineyard</span>
            </div>
          </div>
        </div>

        {/* Variation 2: Centered Logo */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">02 — CENTER: Logo Centered, Nav Below</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md">
            <div className="h-20 flex items-center justify-center border-b border-neutral-200 py-3">
              <LogoPlaceholder />
            </div>
            <div className="h-12 flex items-center justify-center gap-8 text-sm uppercase">
              <span>Basket</span>
              <span>Orchard</span>
              <span>Vineyard</span>
              <span className="text-neutral-400">|</span>
              <span className="lowercase">events</span>
              <span className="lowercase">stories</span>
            </div>
          </div>
        </div>

        {/* Variation 3: Minimal Top Corner */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">03 — MINIMAL: Small Top-Left, More Space</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md h-16 flex items-center justify-between px-8">
            <div className="text-sm font-oswald tracking-widest uppercase font-bold opacity-90">
              The Blender
            </div>
            <div className="flex items-center gap-8 text-sm uppercase">
              <span>Basket</span>
              <span>Orchard</span>
              <span>Vineyard</span>
              <span className="text-neutral-400">|</span>
              <span className="lowercase">events</span>
              <span className="lowercase">stories</span>
              <span className="lowercase">why blender?</span>
            </div>
          </div>
        </div>

        {/* Variation 4: Text-Only Logo Style */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">04 — TYPOGRAPHIC: Text Logo with Architectural Accent</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md h-24 flex items-center justify-between px-12">
            <div className="relative">
              <div className="text-2xl font-oswald tracking-widest uppercase">THE BLENDER</div>
              <div className="absolute -top-3 -left-4 text-[8px] font-mono text-neutral-400 rotate-[-5deg]">
                ← HOSPITALITY PROJECT
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm uppercase">
              <span>Basket</span>
              <span>Orchard</span>
              <span>Vineyard</span>
            </div>
          </div>
        </div>

        {/* Variation 5: Split Navigation */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">05 — BALANCED: Logo Center, Nav Split Left/Right</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md h-24 flex items-center justify-between px-12">
            <div className="flex items-center gap-8 text-sm uppercase">
              <span>Basket</span>
              <span>Orchard</span>
              <span>Vineyard</span>
            </div>
            <div className="h-full py-4 flex items-center absolute left-1/2 -translate-x-1/2">
              <LogoPlaceholder />
            </div>
            <div className="flex items-center gap-6 text-sm lowercase">
              <span>events</span>
              <span>stories</span>
              <span>why blender?</span>
            </div>
          </div>
        </div>

        {/* Variation 6: Monogram Style */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">06 — MONOGRAM: Simple "B" Mark</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md h-20 flex items-center justify-between px-12">
            <div className="w-12 h-12 border-2 border-neutral-900 flex items-center justify-center">
              <span className="text-2xl font-oswald font-bold">B</span>
            </div>
            <div className="flex items-center gap-8 text-sm uppercase">
              <span>Basket</span>
              <span>Orchard</span>
              <span>Vineyard</span>
              <span className="text-neutral-400">|</span>
              <span className="lowercase">events</span>
              <span className="lowercase">stories</span>
              <span className="lowercase">why blender?</span>
            </div>
          </div>
        </div>

        {/* Variation 7: Architectural Blueprint Style */}
        <div className="bg-white border-2 border-neutral-900 p-8">
          <h2 className="text-sm font-mono mb-4 text-neutral-600">07 — BLUEPRINT: Technical Drawing Aesthetic</h2>
          <div className="border border-neutral-200 bg-white/90 backdrop-blur-md h-24 flex items-center justify-between px-12 relative">
            <div className="relative h-full py-6 flex items-center">
              <LogoPlaceholder />
              <div className="absolute -bottom-1 left-0 w-full h-px bg-neutral-300"></div>
              <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-neutral-400">
                ELEVATION A1
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm uppercase font-mono">
              <span className="text-[10px] text-neutral-400">01</span>
              <span>Basket</span>
              <span className="text-[10px] text-neutral-400">02</span>
              <span>Orchard</span>
              <span className="text-[10px] text-neutral-400">03</span>
              <span>Vineyard</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-neutral-600 max-w-2xl mx-auto">
        <p className="mb-4">
          Each variation offers a different balance of visual hierarchy, space, and brand presence.
        </p>
        <p className="text-xs">
          Consider: Does the logo need to dominate, or should it integrate more subtly? 
          Should navigation be symmetrical or asymmetrical? What feels most aligned with your architectural, minimal aesthetic?
        </p>
      </div>
    </div>
  );
}
