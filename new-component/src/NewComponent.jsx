//-RENAME:cmpName.jsx
import React from 'react';
import './NewComponent.css';

const DEFAULT_CLASS_NAME = 'new-component';

const NewComponent = props => {
    const {
        children,
        className = '',
        style,
        onClick,
        ...otherProps
    } = props;

    return (
        <div
            {...otherProps}
            className={`${DEFAULT_CLASS_NAME} ${className}`.trim()}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default NewComponent;