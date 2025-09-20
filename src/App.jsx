/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const FinanceDashboard = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [cryptoData, setCryptoData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const containerRef = useRef(null);

  const balanceHistory = [
    { month: "Jan", balance: 125000, income: 15000, expenses: 8200 },
    { month: "Feb", balance: 138500, income: 16200, expenses: 7800 },
    { month: "Mar", balance: 152000, income: 18800, expenses: 9100 },
    { month: "Apr", balance: 168800, income: 20000, expenses: 8900 },
    { month: "May", balance: 187200, income: 22200, expenses: 11400 },
    { month: "Jun", balance: 205500, income: 25500, expenses: 12200 },
  ];

  const expenseCategories = [
    {
      name: "Housing",
      value: 3500,
      percentage: 35,
      color: "#6366f1",
      icon: "fas fa-home",
    },
    {
      name: "Food",
      value: 2500,
      percentage: 25,
      color: "#06b6d4",
      icon: "fas fa-utensils",
    },
    {
      name: "Transport",
      value: 1500,
      percentage: 15,
      color: "#10b981",
      icon: "fas fa-car",
    },
    {
      name: "Entertainment",
      value: 1200,
      percentage: 12,
      color: "#f59e0b",
      icon: "fas fa-gamepad",
    },
    {
      name: "Healthcare",
      value: 800,
      percentage: 8,
      color: "#ef4444",
      icon: "fas fa-heartbeat",
    },
    {
      name: "Other",
      value: 500,
      percentage: 5,
      color: "#8b5cf6",
      icon: "fas fa-ellipsis-h",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      amount: 5500,
      description: "Freelance Payment",
      date: "2 hours ago",
      category: "work",
      icon: "fas fa-laptop-code",
    },
    {
      id: 2,
      type: "expense",
      amount: -125,
      description: "Starbucks Coffee",
      date: "5 hours ago",
      category: "food",
      icon: "fas fa-coffee",
    },
    {
      id: 3,
      type: "income",
      amount: 850,
      description: "Dividend Payment",
      date: "1 day ago",
      category: "investment",
      icon: "fas fa-chart-line",
    },
    {
      id: 4,
      type: "expense",
      amount: -2300,
      description: "Rent Payment",
      date: "2 days ago",
      category: "housing",
      icon: "fas fa-home",
    },
    {
      id: 5,
      type: "expense",
      amount: -89,
      description: "Uber Ride",
      date: "3 days ago",
      category: "transport",
      icon: "fas fa-car",
    },
  ];

  const cryptoPortfolio = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      value: 45000,
      change: "+12.5%",
      amount: "0.75",
      color: "#f7931a",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      value: 28000,
      change: "+8.2%",
      amount: "12.3",
      color: "#627eea",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      value: 8500,
      change: "+15.1%",
      amount: "25000",
      color: "#0033ad",
    },
    {
      name: "Solana",
      symbol: "SOL",
      value: 12000,
      change: "-2.8%",
      amount: "150",
      color: "#9945ff",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();

        const cryptoList = [
          {
            name: "Bitcoin",
            symbol: "BTC",
            value: Math.round(data.bitcoin.usd * 0.75),
            change:
              data.bitcoin.usd_24h_change > 0
                ? `+${data.bitcoin.usd_24h_change.toFixed(1)}%`
                : `${data.bitcoin.usd_24h_change.toFixed(1)}%`,
            amount: "0.75",
            color: "#f7931a",
            realPrice: data.bitcoin.usd,
          },
          {
            name: "Ethereum",
            symbol: "ETH",
            value: Math.round(data.ethereum.usd * 12.3),
            change:
              data.ethereum.usd_24h_change > 0
                ? `+${data.ethereum.usd_24h_change.toFixed(1)}%`
                : `${data.ethereum.usd_24h_change.toFixed(1)}%`,
            amount: "12.3",
            color: "#627eea",
            realPrice: data.ethereum.usd,
          },
          {
            name: "Cardano",
            symbol: "ADA",
            value: Math.round(data.cardano.usd * 25000),
            change:
              data.cardano.usd_24h_change > 0
                ? `+${data.cardano.usd_24h_change.toFixed(1)}%`
                : `${data.cardano.usd_24h_change.toFixed(1)}%`,
            amount: "25000",
            color: "#0033ad",
            realPrice: data.cardano.usd,
          },
          {
            name: "Solana",
            symbol: "SOL",
            value: Math.round(data.solana.usd * 150),
            change:
              data.solana.usd_24h_change > 0
                ? `+${data.solana.usd_24h_change.toFixed(1)}%`
                : `${data.solana.usd_24h_change.toFixed(1)}%`,
            amount: "150",
            color: "#9945ff",
            realPrice: data.solana.usd,
          },
        ];

        setCryptoData(cryptoList);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setCryptoData(cryptoPortfolio);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);

    const animateCounter = (target, setter, duration = 2500) => {
      let start = 0;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    setTimeout(() => animateCounter(205500, setCurrentBalance), 1000);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const HeroCard = ({ title, value, icon, gradient, change, delay = 0 }) => (
    <div
      className="hero-card"
      style={{
        transform: activeCard === title ? "translateY(0px)" : "translateY(0)",
      }}
    >
      <div className="hero-card-bg" style={{ background: gradient }}></div>
      <div className="hero-card-content">
        <div className="hero-card-header">
          <div className="hero-icon">
            <i className={icon}></i>
          </div>
          <div className="hero-change">
            <span
              className={
                change && change.startsWith("+") ? "positive" : "negative"
              }
            >
              {change}
            </span>
          </div>
        </div>
        <div className="hero-title">{title}</div>
        <div className="hero-value">
          ${typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="hero-sparkline">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="spark-bar"
              style={{
                height: `${Math.random() * 60 + 20}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  const Card = ({ children, className = "", delay = 0 }) => (
    <div className={`card ${className}`}>{children}</div>
  );

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`} ref={containerRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .dashboard {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
          position: relative;
          overflow-x: hidden;
          transition: all 0.3s ease;
        }

        .dashboard.dark {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f1f5f9;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          z-index: 1000;
          padding: 1rem 2rem;
          transition: all 0.3s ease;
        }

        .dashboard.dark .navbar {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }

        .nav-content {
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
        }

        .dashboard.dark .logo {
          color: #f1f5f9;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .dashboard.dark .nav-link {
          color: #94a3b8;
        }

        .nav-link:hover {
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .dashboard.dark .theme-toggle {
          background: #334155;
          color: #94a3b8;
        }

        .theme-toggle:hover {
          background: #e2e8f0;
          color: #6366f1;
          transform: scale(1.05);
        }

        .dashboard.dark .theme-toggle:hover {
          background: #475569;
          color: #6366f1;
        }

        .notification-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dashboard.dark .notification-btn {
          background: #334155;
          color: #94a3b8;
        }

        .notification-btn:hover {
          background: #e2e8f0;
          color: #6366f1;
        }

        .dashboard.dark .notification-btn:hover {
          background: #475569;
          color: #6366f1;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .mobile-menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 4px;
        }

        .dashboard.dark .mobile-menu-btn {
          background: #334155;
        }

        .hamburger-line {
          width: 20px;
          height: 2px;
          background: #64748b;
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        .dashboard.dark .hamburger-line {
          background: #94a3b8;
        }

        .hamburger-line.active:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-line.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.active:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          transform: translateY(${mobileMenuOpen ? "0" : "-100%"});
          transition: transform 0.3s ease;
          z-index: 999;
          padding: 1rem 2rem;
        }

        .dashboard.dark .mobile-menu {
          background: rgba(15, 23, 42, 0.98);
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-content {
          margin-top: 80px;
          padding: 2rem;
          max-width: 100%;
          overflow-x: hidden;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-section {
          margin-bottom: 3rem;
        }

        .hero-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .dashboard.dark .hero-title {
          background: linear-gradient(135deg, #f1f5f9, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .dashboard.dark .hero-subtitle {
          color: #94a3b8;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .hero-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.3s ease;
        }

        .dashboard.dark .hero-card {
          background: #1e293b;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .hero-card-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
          border-radius: 20px;
        }

        .hero-card-content {
          position: relative;
          z-index: 1;
        }

        .hero-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .hero-icon {
          width: 50px;
          height: 50px;
          background: #f8fafc;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: #6366f1;
        }

        .dashboard.dark .hero-icon {
          background: #334155;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }

        .hero-change {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .hero-change .positive {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .hero-change .negative {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .hero-title {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .dashboard.dark .hero-title {
          color: #94a3b8;
        }

        .hero-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .dashboard.dark .hero-value {
          color: #f1f5f9;
        }

        .hero-sparkline {
          display: flex;
          gap: 3px;
          align-items: end;
          height: 30px;
        }

        .spark-bar {
          background: linear-gradient(to top, #6366f1, #8b5cf6);
          border-radius: 2px;
          flex: 1;
          opacity: 0.8;
        }

        .footer {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-top: 3rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.1);
          text-align: center;
        }

        .dashboard.dark .footer {
          background: #1e293b;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .footer-content {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .dashboard.dark .footer-content {
          color: #94a3b8;
        }

        .footer-content strong {
          color: #1e293b;
          font-weight: 600;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dashboard.dark .footer-content strong {
          color: #f1f5f9;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.1);
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .dashboard.dark .card {
          background: #1e293b;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dashboard.dark .card-title {
          color: #f1f5f9;
        }

        .card-icon {
          width: 35px;
          height: 35px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: white;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .crypto-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .dashboard.dark .crypto-item {
          border-bottom: 1px solid #334155;
        }

        .crypto-item:last-child {
          border-bottom: none;
        }

        .crypto-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
        }

        .crypto-info {
          flex: 1;
        }

        .crypto-name {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .dashboard.dark .crypto-name {
          color: #f1f5f9;
        }

        .crypto-symbol {
          font-size: 0.8rem;
          color: #64748b;
        }

        .dashboard.dark .crypto-symbol {
          color: #94a3b8;
        }

        .crypto-stats {
          text-align: right;
        }

        .crypto-value {
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .dashboard.dark .crypto-value {
          color: #f1f5f9;
        }

        .crypto-change {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .dashboard.dark .transaction-item {
          border-bottom: 1px solid #334155;
        }

        .transaction-item:last-child {
          border-bottom: none;
        }

        .transaction-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
        }

        .transaction-icon.income {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .transaction-icon.expense {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .transaction-details {
          flex: 1;
        }

        .transaction-description {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .dashboard.dark .transaction-description {
          color: #f1f5f9;
        }

        .transaction-date {
          font-size: 0.8rem;
          color: #64748b;
        }

        .dashboard.dark .transaction-date {
          color: #94a3b8;
        }

        .transaction-amount {
          font-weight: 700;
          font-size: 1rem;
        }

        .transaction-amount.income {
          color: #059669;
        }

        .transaction-amount.expense {
          color: #dc2626;
        }

        .expense-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .dashboard.dark .expense-item {
          border-bottom: 1px solid #334155;
        }

        .expense-item:last-child {
          border-bottom: none;
        }

        .expense-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .expense-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.9rem;
        }

        .expense-info h4 {
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .dashboard.dark .expense-info h4 {
          color: #f1f5f9;
        }

        .expense-info span {
          font-size: 0.8rem;
          color: #64748b;
        }

        .dashboard.dark .expense-info span {
          color: #94a3b8;
        }

        .expense-right {
          text-align: right;
        }

        .expense-amount {
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .dashboard.dark .expense-amount {
          color: #f1f5f9;
        }

        .expense-percentage {
          font-size: 0.8rem;
          color: #64748b;
        }

        .dashboard.dark .expense-percentage {
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
            margin-top: 70px;
          }

          .navbar {
            padding: 1rem;
          }

          .nav-content {
            gap: 1rem;
          }

          .user-menu {
            gap: 0.5rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .bottom-grid {
            grid-template-columns: 1fr;
          }

          .card {
            padding: 1.5rem;
          }

          .hero-card {
            padding: 1.5rem;
          }

          .hero-value {
            font-size: 2rem;
          }

          .card-title {
            font-size: 1.1rem;
          }

          .crypto-item, .transaction-item, .expense-item {
            padding: 0.75rem 0;
          }

          .crypto-icon, .transaction-icon {
            width: 40px;
            height: 40px;
            font-size: 0.9rem;
          }

          .expense-icon {
            width: 35px;
            height: 35px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 0.5rem;
            margin-top: 65px;
          }

          .navbar {
            padding: 0.75rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }

          .card, .hero-card {
            padding: 1rem;
          }

          .hero-value {
            font-size: 1.8rem;
          }

          .hero-header {
            margin-bottom: 2rem;
          }

          .hero-grid {
            gap: 1rem;
          }

          .logo {
            font-size: 1.3rem;
          }

          .logo-icon {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }

          .theme-toggle, .notification-btn, .user-avatar, .mobile-menu-btn {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 360px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .hero-card {
            padding: 1rem;
          }

          .hero-value {
            font-size: 1.6rem;
          }

          .card {
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .card-title {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes growBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        .live-indicator {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <span>FinanceFlow</span>
          </div>

          <div className="nav-links">
            <a href="#" className="nav-link">
              Dashboard
            </a>
            <a href="#" className="nav-link">
              Portfolio
            </a>
            <a href="#" className="nav-link">
              Transactions
            </a>
            <a href="#" className="nav-link">
              Analytics
            </a>
          </div>

          <div className="user-menu">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
            </button>
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-avatar">AH</div>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div
                className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
              ></div>
              <div
                className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
              ></div>
              <div
                className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
              ></div>
            </button>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <a href="#" className="nav-link">
              Dashboard
            </a>
            <a href="#" className="nav-link">
              Portfolio
            </a>
            <a href="#" className="nav-link">
              Transactions
            </a>
            <a href="#" className="nav-link">
              Analytics
            </a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <div className="hero-header">
              <h1 className="hero-title">Financial Dashboard</h1>
              <p className="hero-subtitle">
                Track your investments, manage expenses, and monitor your
                financial growth all in one place
              </p>
            </div>

            <div className="hero-grid">
              <HeroCard
                title="Total Portfolio Value"
                value={currentBalance}
                icon="fas fa-chart-line"
                gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                change="+12.5%"
              />
              <HeroCard
                title="Available Balance"
                value={47500}
                icon="fas fa-wallet"
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                change="+8.2%"
              />
              <HeroCard
                title="Monthly Profit"
                value={12800}
                icon="fas fa-trending-up"
                gradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
                change="+15.7%"
              />
              <HeroCard
                title="Total Invested"
                value={165000}
                icon="fas fa-coins"
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                change="+9.3%"
              />
            </div>
          </div>

          <div className="dashboard-grid">
            <Card>
              <div className="card-title">
                <div className="card-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Portfolio Performance
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#334155" : "#e2e8f0"}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1e293b" : "white",
                      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      color: darkMode ? "#f1f5f9" : "#1e293b",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <div className="card-title">
                <div className="card-icon">
                  <i className="fab fa-bitcoin"></i>
                </div>
                Crypto Holdings
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.7rem",
                    color: darkMode ? "#94a3b8" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <div
                    className="live-indicator"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                    }}
                  ></div>
                  Live Data
                </span>
              </div>
              {(cryptoData.length > 0 ? cryptoData : cryptoPortfolio).map(
                (crypto, index) => (
                  <div key={index} className="crypto-item">
                    <div
                      className="crypto-icon"
                      style={{
                        backgroundColor: crypto.color,
                      }}
                    >
                      {crypto.symbol}
                    </div>
                    <div className="crypto-info">
                      <div className="crypto-name">{crypto.name}</div>
                      <div className="crypto-symbol">
                        {crypto.amount} {crypto.symbol}
                        {crypto.realPrice && (
                          <span
                            style={{
                              marginLeft: "8px",
                              color: "#94a3b8",
                            }}
                          >
                            @ ${crypto.realPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="crypto-stats">
                      <div className="crypto-value">
                        ${crypto.value.toLocaleString()}
                      </div>
                      <div
                        className="crypto-change"
                        style={{
                          color: crypto.change.startsWith("+")
                            ? "#059669"
                            : "#dc2626",
                        }}
                      >
                        {crypto.change}
                      </div>
                    </div>
                  </div>
                )
              )}
            </Card>
          </div>

          <div className="bottom-grid">
            <Card>
              <div className="card-title">
                <div className="card-icon">
                  <i className="fas fa-history"></i>
                </div>
                Recent Transactions
              </div>
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="transaction-item">
                  <div className={`transaction-icon ${transaction.type}`}>
                    <i className={transaction.icon}></i>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                    <div className="transaction-date">{transaction.date}</div>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === "income" ? "+" : ""}$
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </Card>

            <Card>
              <div className="card-title">
                <div className="card-icon">
                  <i className="fas fa-chart-pie"></i>
                </div>
                Expense Breakdown
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1e293b" : "white",
                      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                      borderRadius: "8px",
                      color: darkMode ? "#f1f5f9" : "#1e293b",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ marginTop: "1.5rem" }}>
                {expenseCategories.slice(0, 4).map((category, index) => (
                  <div key={index} className="expense-item">
                    <div className="expense-left">
                      <div
                        className="expense-icon"
                        style={{ backgroundColor: category.color }}
                      >
                        <i className={category.icon}></i>
                      </div>
                      <div className="expense-info">
                        <h4>{category.name}</h4>
                        <span>{category.percentage}% of total</span>
                      </div>
                    </div>
                    <div className="expense-right">
                      <div className="expense-amount">
                        ${category.value.toLocaleString()}
                      </div>
                      <div className="expense-percentage">
                        {category.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <div className="card-title">
              <div className="card-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              Monthly Overview
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={balanceHistory}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#334155" : "#e2e8f0"}
                />
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? "#94a3b8" : "#64748b"}
                  fontSize={12}
                />
                <YAxis
                  stroke={darkMode ? "#94a3b8" : "#64748b"}
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1e293b" : "white",
                    border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                  }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="footer">
            <div className="footer-content">
              <p className="footer-copyright">
                &copy; 2025 | All rights reserved. Made by{" "}
                <a
                  href="https://portfolio-chi-nine-90.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong className="text-primary">Ahmed Seleem</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinanceDashboard;
