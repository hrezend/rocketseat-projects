import React, {TextareaHTMLAttributes} from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;
}

const TextArea: React.FC<TextareaProps> = ({label, name, ...resto}) =>{
    return(
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...resto}></textarea>
        </div>
    );
}

export default TextArea;