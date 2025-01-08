import React from 'react';

export default function Footer() {
    const footerStyle = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '10px',
        fontSize: '19px',
        fontWeight: '500',
    };

    const spanStyle = {
        color: 'white',
        padding: '3px',
        borderRadius: '10px',
        letterSpacing: '2px',
        fontSize: '1.3rem',
    };

    return (
        <>
            <footer style={footerStyle}>
                <p className="footer copyright-text">
                    ©copyright | <span style={spanStyle}>CareAutomate </span> | 2025
                </p>
            </footer>
        </>
    );
}