// JSONViewer.tsx
import dynamic from "next/dynamic";

const LazyReactJson = dynamic(() => import("react-json-view"), { ssr: false });

export const JSONViewer = ({ yourJSON, setYourJSON }: { yourJSON: object; setYourJSON: (json: object) => void }) => {
  return (
    <div className="self-center w-full collapse bg-base-300">
      <input type="checkbox" />
      <div className="collapse-title text-center text-xl font-medium">
        View <strong className="text-green-500">raw metadata</strong>
      </div>
      <div className="collapse-content">
        <LazyReactJson
          style={{ padding: "1rem", borderRadius: "0.75rem" }}
          src={yourJSON}
          theme="solarized"
          enableClipboard={false}
          onEdit={edit => setYourJSON(edit.updated_src)}
          onAdd={add => setYourJSON(add.updated_src)}
          onDelete={del => setYourJSON(del.updated_src)}
        />
      </div>
    </div>
  );
};
