import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/hero.css';
const styles = {
    typingContainer: {
        fontSize: "2.8rem",
        fontFamily: "Arial, sans-serif",
    },
    cursor: {
        display: "inline-block",
        animation: "blink 0.8s steps(2, start) infinite",
    },
};

// CSS for blinking cursor
const blinkKeyframes = `
@keyframes blink {
  to {
    visibility: hidden;
  }
}
`;
const Index = () => {
    const text = "Effortless Invoicing and Inventory Management...";
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 100)
            return () => clearTimeout(timer);
        }
    }, [index]);
    return (
        <div className="hero-section">
            <img
                src="images/main-background.webp"
                alt="Invoicing Dashboard Background"
                className="hero-background"
            />
            <div className="hero-content">
                <h1 style={styles.typingContainer}>
                    {displayText}
                </h1>
                <p>Streamline your business with easy-to-use tools for adding items, managing customers, and generating invoices.</p>
                <div className="icon-grid">
                    <div className="icon-item">
                        <Link to="/Items">
                            <img src="images/checklist.gif" alt="Items" />
                            <span className="tooltip">Items</span>
                        </Link>
                    </div>
                    <div className="icon-item">
                        <Link to="/customer">
                        <img src="images/customer-service.gif" alt="Customer" />
                        <span className="tooltip">Customer</span>
                        </Link>
                    </div>
                    <div className="icon-item">
                        <Link to="/invoice">
                        <img src="images/receipt.gif" alt="Invoice" />
                        <span className="tooltip">Invoice</span>
                        </Link>
                    </div>
                    <div className="icon-item">
                        <Link to="traders">
                            <img src="images/trader.gif" alt="Trader" />
                            <span className="tooltip">Traders</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;