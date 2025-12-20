import Image from "next/image";

export const VacantHouseBankSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <div className="pl-0 pr-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  空き家バンク
                </h3>
                <p className="text-gray-600 mb-4">自治体運営の空き家バンク</p>
              </div>
              <div className="relative md:col-span-3">
                <a
                  href="https://www.city.isesaki.lg.jp/kurashi_tetsuzuki/iju_teiju/akiyataisaku/akiyabank/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/vacant_house_bank.png"
                    alt="空き家バンク"
                    width={600}
                    height={400}
                    className="w-1/2 h-auto rounded-lg"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
