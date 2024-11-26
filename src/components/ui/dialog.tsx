import React, { ReactNode } from 'react';

interface DialogProps {
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children }) => {
    return <div className="dialog">{children}</div>;
};

interface DialogTriggerProps {
    children: ReactNode;
    onClick?: () => void;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
            {children}
        </button>
    );
};

interface DialogContentProps {
    children: ReactNode;
}

const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
    return <div className="dialog-content p-6 bg-white rounded-md shadow-lg">{children}</div>;
};

interface DialogHeaderProps {
    children: ReactNode;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
    return <div className="dialog-header text-lg font-semibold">{children}</div>;
};

interface DialogTitleProps {
    children: ReactNode;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
    return <h2 className="text-xl font-bold">{children}</h2>;
};

interface DialogDescriptionProps {
    children: ReactNode;
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => {
    return <p className="text-sm text-gray-500">{children}</p>;
};

export {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
};
