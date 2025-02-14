export interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function NavButton({ icon, label, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-2 bg-dark px-3 py-2 text-xl font-extrabold tracking-wider text-light transition-opacity hover:opacity-80"
    >
      {icon}
      {label}
    </button>
  );
}
