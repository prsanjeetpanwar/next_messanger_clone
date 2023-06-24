import clsx from "clsx";

interface ButtonProps {
  type?: 'button' | 'reset' | undefined;
  fullwidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({
  type,
  fullwidth,
  children,
  onClick,
  secondary,
  danger,
  disabled
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex
        justify-center
        items-center // Added items-center class to center the text vertically
        rounded-md
        px-3
        px-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-offset-2
      `,
        disabled && 'opacity-50 cursor-default',
        fullwidth && 'w-[20px] h-[40px]',
        secondary ? 'text-gray-900' : 'text-white',
        danger && 'bg-rose-500  focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
      style={{ width: fullwidth ? '100%' : 'auto' }}
    >
      {children}
    </button>
  );
}

export default Button;
