import React from 'react';

interface InputProps {
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    className,
    disabled = false,
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
            disabled={disabled}
        />
    );
};

export { Input };
