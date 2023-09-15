import { ReactComponent as View } from "../icons/view.svg";

interface ListCardProps {
  name: string;
  className?: string;
  handleClick: (e: any) => void;
}

const ListCard = ({ name, className, handleClick }: ListCardProps) => {
  return (
    <div
      className={`bg-[#E8EAEB] hover:bg-[#BBC0C5] w-full py-4 rounded-lg mt-4 flex items-center ${className}`}
    >
      <p className="px-4">{name}</p>
      <div
        className="ml-auto mr-6 hover:bg-[#626E79] hover:rounded-full p-1"
        onClick={handleClick}
      >
        <View />
      </div>
    </div>
  );
};

export default ListCard;