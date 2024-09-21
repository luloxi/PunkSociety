import { InputBase } from "~~/components/scaffold-eth";

interface Attribute {
  traitType: string;
  value: string;
}

interface AttributesFormProps {
  attributes: Attribute[];
  setAttributes: (attributes: Attribute[]) => void;
}

export const AttributesForm: React.FC<AttributesFormProps> = ({ attributes, setAttributes }) => {
  const handleAttributeChange = (index: number, field: "traitType" | "value", value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { traitType: "", value: "" }]);
  };

  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Attributes</h3>

      <button onClick={addAttribute} className="mb-4 flex items-center bg-green-600 text-white p-2 rounded">
        <span className="mr-2">Add Attribute</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {attributes.map((attr, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <button onClick={() => removeAttribute(index)} className="ml-2 bg-red-500 text-white p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div>
            <span className="font-bold p-3">Trait Type:</span>
            <InputBase
              placeholder="Trait type"
              value={attr.traitType}
              onChange={value => handleAttributeChange(index, "traitType", value)}
            />
          </div>

          <div>
            <span className="font-bold p-3">Trait Value:</span>
            <InputBase
              placeholder="Value for trait"
              value={attr.value}
              onChange={value => handleAttributeChange(index, "value", value)}
            />
          </div>
        </div>
      ))}

      {attributes.length > 0 && attributes.some(attr => attr.traitType && attr.value) && (
        <div>
          <p>
            <strong>Attributes:</strong>
          </p>
          <ul className="list-disc ml-4">
            {attributes.map(
              (attr, index) =>
                attr.traitType &&
                attr.value && (
                  <li key={index} className="text-green-600">
                    {attr.traitType}: {attr.value}
                  </li>
                ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
