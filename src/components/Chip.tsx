import { ReactComponent as Cross } from "../icons/cross.svg";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  labelStyle?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  className,
  labelStyle,
}) => {
  const chipClassName = `flex items-center justify-between gap-1 rounded-10px py-1 px-2 text-xs' ${className}`;

  return (
    <div
      className={`bg-[#E5F3F8] w-fit text-black border border-[#028EBF] rounded-full ${chipClassName}`}
    >
      <span className={`text-xs ${labelStyle}`}>{label}</span>
      {onRemove && (
        <button onClick={onRemove}>
          <Cross className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Chip;
