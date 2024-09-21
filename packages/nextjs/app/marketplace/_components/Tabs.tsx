// Tabs.tsx
export const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <div className="tabs justify-start flex-wrap border-b-2 border-base-300">
      <a
        className={`tab tab-lifted text-lg whitespace-nowrap ${
          activeTab === "newest" ? "border-blue-500 font-bold text-blue-500" : ""
        }`}
        onClick={() => setActiveTab("newest")}
      >
        Newest
      </a>
      <a
        className={`tab tab-lifted text-lg whitespace-nowrap ${
          activeTab === "on-sale" ? "border-blue-500 font-bold text-blue-500" : ""
        }`}
        onClick={() => setActiveTab("on-sale")}
      >
        On Sale
      </a>
      <a
        className={`tab tab-lifted text-lg whitespace-nowrap ${
          activeTab === "mintables" ? "border-blue-500 font-bold text-blue-500" : ""
        }`}
        onClick={() => setActiveTab("mintables")}
      >
        Mintables
      </a>
    </div>
  );
};
