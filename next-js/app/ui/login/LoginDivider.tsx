interface LoginDividerProps {
  label?: string;
  className?: string;
}

export default function LoginDivider({ label, className = "" }: LoginDividerProps) {
  if (label) {
    return (
      <div className={`relative flex items-center justify-center w-full my-6 ${className}`}>
        <div className="w-full border-t border-[#292929]" />
        <span className="absolute bg-[#121212] px-3 text-xs uppercase tracking-widest text-[#a7a7a7]">
          {label}
        </span>
      </div>
    );
  }

  return <hr className={`w-full border-t border-[#292929] my-8 ${className}`} />;
}
