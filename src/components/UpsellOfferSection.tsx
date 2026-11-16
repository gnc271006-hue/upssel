import { useEffect } from 'react';
import { motion } from 'motion/react';

const HOTMART_SCRIPT_SRC =
  'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';

const RIBBON_TEXT =
  'BLACK FRIDAY · BLACK FRIDAY · BLACK FRIDAY · BLACK FRIDAY · BLACK FRIDAY · BLACK FRIDAY · BLACK FRIDAY';

declare global {
  interface Window {
    checkoutElements?: {
      init: (type: string) => {
        mount: (selector: string) => void;
      };
    };
  }
}

export function UpsellOfferSection() {
  useEffect(() => {
    let isCancelled = false;

    const mountHotmartWidget = () => {
      if (isCancelled) return;
      const container = document.getElementById('hotmart-sales-funnel');
      if (!container || container.dataset.hotmartInitialized === 'true') {
        return;
      }

      if (window.checkoutElements) {
        container.dataset.hotmartInitialized = 'true';
        window.checkoutElements
          .init('salesFunnel')
          .mount('#hotmart-sales-funnel');
      }
    };

    if (window.checkoutElements) {
      mountHotmartWidget();
      return () => {
        isCancelled = true;
      };
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${HOTMART_SCRIPT_SRC}"]`,
    );

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        mountHotmartWidget();
        return () => {
          isCancelled = true;
        };
      }

      existingScript.addEventListener('load', mountHotmartWidget, {
        once: true,
      });
      return () => {
        isCancelled = true;
        existingScript.removeEventListener('load', mountHotmartWidget);
      };
    }

    const script = document.createElement('script');
    script.src = HOTMART_SCRIPT_SRC;
    script.async = true;
    const handleLoad = () => {
      script.dataset.loaded = 'true';
      mountHotmartWidget();
    };
    script.addEventListener('load', handleLoad, { once: true });
    document.body.appendChild(script);

    return () => {
      isCancelled = true;
      script.removeEventListener('load', handleLoad);
    };
  }, []);
  return (
    <section
      aria-labelledby="upsell-offer-heading"
      className="bg-[#101D35] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Dobras físicas da fita envolvidas na borda do cartão (sem causar overflow horizontal) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1.5 right-[122px] z-0 h-3 w-7 skew-x-[40deg] bg-[#030303] sm:right-[184px] sm:w-8"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[102px] -right-1.5 z-0 h-7 w-3 skew-y-[40deg] bg-[#030303] sm:top-[156px] sm:h-8"
          />

          {/* Cartão principal de oferta Black Friday */}
          <div className="relative z-10 overflow-hidden rounded-3xl border border-[#315B88]/50 bg-[#080F1E] shadow-[0_30px_70px_-18px_rgba(0,0,0,0.65)]">
            {/* Brilho sutil azul-noite interno */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#1D3557]/35 blur-3xl"
            />

            {/* FITA BLACK FRIDAY DIAGONAL EM CAMADAS (CSS puro, contida no cartão) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {/* Camada inferior cruzada para dar sensação de fita física amarrada */}
              <div className="absolute top-[22px] -right-[104px] flex h-[28px] w-[320px] rotate-[24deg] items-center justify-center border-y border-white/15 bg-gradient-to-b from-[#171717] via-[#040404] to-[#121212] opacity-90 shadow-[0_6px_14px_rgba(0,0,0,0.7)] sm:top-[30px] sm:-right-[94px] sm:h-[32px] sm:w-[400px]">
                <span className="font-display text-[9px] font-extrabold tracking-[0.2em] whitespace-nowrap text-white/45 uppercase sm:text-[10px]">
                  {RIBBON_TEXT}
                </span>
              </div>

              {/* Fita diagonal principal (~40 graus) com texto BLACK FRIDAY repetido */}
              <div className="absolute top-[30px] -right-[92px] flex h-[32px] w-[340px] rotate-[40deg] items-center justify-center border-y border-white/25 bg-gradient-to-b from-[#242424] via-[#080808] to-[#1A1A1A] shadow-[0_10px_24px_rgba(0,0,0,0.85)] sm:top-[42px] sm:-right-[84px] sm:h-[38px] sm:w-[420px]">
                {/* Linha interna sutil simulando costura da fita */}
                <div className="flex h-[24px] w-full items-center justify-center border-y border-dashed border-white/20 sm:h-[28px]">
                  <span className="font-display text-[10px] font-extrabold tracking-[0.18em] whitespace-nowrap text-white uppercase sm:text-xs">
                    {RIBBON_TEXT}
                  </span>
                </div>
              </div>
            </div>

            {/* Conteúdo do cartão com espaçamento protegido para a fita não cobrir textos */}
            <div className="relative px-4 pt-20 pb-8 sm:px-8 sm:pt-16 sm:pb-12 lg:px-12 lg:py-14">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                {/* Coluna esquerda: título promocional centralizado e texto de apoio legível */}
                <div className="min-w-0 space-y-4 lg:col-span-6">
                  <div className="space-y-2 text-center">
                    <p className="text-xs font-semibold tracking-wider text-[#8EAFD2] uppercase sm:text-sm">
                      Oferta complementar exclusiva
                    </p>

                    <h2
                      id="upsell-offer-heading"
                      className="font-display text-2xl leading-[1.15] font-extrabold tracking-tight text-white uppercase sm:text-3xl lg:text-[2.25rem]"
                    >
                      MEGA OFERTA BLACK FRIDAY
                    </h2>
                  </div>

                  <p className="mx-auto max-w-xl text-left text-[15px] leading-relaxed text-[#EAF1F9]/85 sm:text-base">
                    Adicione o Plano de Prática Guiada à sua compra e tenha
                    acesso aos materiais complementares para organizar sua
                    prática ao longo das próximas quatro semanas.
                  </p>
                </div>

                {/* Coluna direita: bloco de preços (vermelho riscado + verde destaque) + slot Hotmart */}
                <div className="min-w-0 lg:col-span-6 lg:pt-16">
                  <div className="mx-auto box-border w-full max-w-md overflow-hidden rounded-2xl border border-[#315B88]/45 bg-[#101D35]/90 px-4 py-6 text-center shadow-inner sm:px-6 sm:py-7">
                    <div className="space-y-1">
                      <p className="font-display text-lg font-bold text-[#EF4444] line-through decoration-[#EF4444] decoration-2 tabular-nums sm:text-xl">
                        R$ 95,00
                      </p>

                      <p className="font-display text-5xl leading-none font-extrabold tracking-tight text-[#22C55E] tabular-nums sm:text-[3.5rem]">
                        R$ 47,50
                      </p>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#8EAFD2] sm:text-[13px]">
                      Plano de Prática Guiada — 4 Semanas (acesso digital
                      complementar)
                    </p>

                    {/* HOTMART - Sales Funnel Widget */}
                    <div className="mx-auto mt-6 box-border w-full max-w-full border-t border-[#315B88]/40 pt-5">
                      <div id="hotmart-sales-funnel" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
