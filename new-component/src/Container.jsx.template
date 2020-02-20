//-RENAME:cmpName.jsx
import React from 'react';
import './NewComponent.css';

const NewComponent = props => {
    const {
        children,
        className,
        style,
        onClick,
        ...otherProps
    } = props;

    return (
        <div
            {...otherProps}
            className={className}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
}

export default NewComponent;