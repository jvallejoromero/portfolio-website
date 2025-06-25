type GenericButtonProps = {
    onClick?: () => void;
    label: string;
    disabled?: boolean;
    className?: string;
}

const GenericButton = ({ onClick, label, disabled, className="" }: GenericButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative overflow-hidden self-start 
                        bg-gradient-to-br from-background to-neutral-100 dark:to-neutral-900 border border-neutral-300 dark:border-white/20 
                        rounded-sm font-medium shadow-md dark:shadow-sm hover:shadow-lg dark:hover:shadow-neutral-50/50 cursor-pointer 
                        disabled:opacity-50 disabled:cursor-auto ${className}`}
        >
            {label}
        </button>
    );
}

export default GenericButton;