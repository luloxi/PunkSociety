import { DescriptionInput } from "./DescriptionInput";

interface MetadataFormProps {
  description: string;
  setDescription: (desc: string) => void;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({ description, setDescription }) => {
  return (
    <div className="text-left flex-1 ">
      <div className="break-words">
        <strong>Text content</strong>{" "}
        <DescriptionInput
          name="description"
          value={description}
          onChange={setDescription}
          placeholder="Here goes the text for your post"
        />
      </div>
    </div>
  );
};
