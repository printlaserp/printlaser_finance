import React, { CSSProperties, ReactNode } from 'react';
import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle"
interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean;
    styles?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen, styles }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center h-screen w-screen z-50 bg-black bg-opacity-50" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col absolute h-fit max-h-[90%] overflow-y-auto w-fit min-w-[25rem] bg-white z-10 rounded-lg z-60 shadow-lg p-4 transition-transform scale-100 transform duration-300`} style={styles}>
                <div className="absolute top-2 right-2">
                    <button onClick={onClose}>
                        <XCircle size={24} className="text-red-400" />
                    </button>
                </div>
                {children}
            </div>
        </div>

    );
};

export default Modal;