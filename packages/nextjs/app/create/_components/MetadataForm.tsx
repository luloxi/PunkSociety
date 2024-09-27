import { DescriptionInput } from "./DescriptionInput";
import { InputBase } from "~~/components/scaffold-eth";

interface MetadataFormProps {
  collectionName: string;
  setCollectionName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  animationUrl: string;
  setAnimationUrl: (url: string) => void;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({
  collectionName,
  setCollectionName,
  description,
  setDescription,
  animationUrl,
  setAnimationUrl,
}) => {
  return (
    <div className="text-left flex-1 ">
      <div className="py-2">
        <strong>
          Collection Name <span className="text-red-500">*</span>
        </strong>{" "}
        <InputBase placeholder="Picca Who?" value={collectionName} onChange={setCollectionName} />
      </div>

      <div className="flex flex-row gap-2 my-4 items-center"></div>

      <div className="break-words">
        <strong>
          Description <span className="text-red-500">*</span>
        </strong>{" "}
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
