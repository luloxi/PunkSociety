import { DescriptionInput } from "./DescriptionInput";
import { InputBase } from "~~/components/scaffold-eth";

interface MetadataFormProps {
  description: string;
  setDescription: (desc: string) => void;
  animationUrl: string;
  setAnimationUrl: (url: string) => void;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({
  description,
  setDescription,
  animationUrl,
  setAnimationUrl,
}) => {
  return (
    <div className="text-left flex-1 ">
      <div className="break-words">
        <strong>Description</strong>{" "}
        <DescriptionInput
          name="description"
          value={description}
          onChange={setDescription}
          placeholder="Enter description"
        />
      </div>

      <div className="py-2">
        <span className="font-bold p-3">Audio/Video URL</span>
        <InputBase placeholder="ipfs:// or ipfs.io URLs" value={animationUrl} onChange={setAnimationUrl} />
      </div>
    </div>
  );
};
