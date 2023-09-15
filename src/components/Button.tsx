interface ButtonProps {
  label: string;
  className?: string;
  onClick: (e: any) => void;
}
const Button = ({ label, className, onClick }: ButtonProps) => {
  return (
    <button
      role="presentation"
      onClick={onClick}
      className={`flex justify-center items-center text-white h-10 w-fit bg-green-800 rounded-full px-3 ${className}`}
    >
      <p>{label}</p>
    </button>
  );
};

export default Button;
