export type ButtonVariant = "primary" | "secondary";
interface ButtonProps {
  label: string;
  className?: string;
  onClick: (e: any) => void;
  variant: ButtonVariant;
}
const Button = ({ label, className, onClick, variant }: ButtonProps) => {
  return (
    <button
      role="presentation"
      onClick={onClick}
      className={`flex justify-center items-center h-10 w-fit p-3 rounded-lg ${
        variant === "primary"
          ? "bg-blue-500 hover:bg-blue-800  text-white"
          : "border border-blue-500 hover:bg-blue-200  text-blue-800"
      } ${className}`}
    >
      <p>{label}</p>
    </button>
  );
};

export default Button;
