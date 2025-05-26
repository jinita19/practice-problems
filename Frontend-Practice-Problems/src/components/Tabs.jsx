import React, { useState, useRef, useEffect } from 'react';
import './Tabs.scss'

function classNames(...args) {
    return args.filter(Boolean).join(' ');
}

//use button for accessibility
//ref to set focus
function Tabs() {
    const [activeTab, setActiveTab] = useState(null);
    const [tabs, setTabs] = useState([]);
    const tabRefs = useRef([]);

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const res = await fetch('/tabs.json');
                const data = await res.json();
                setTabs(data);
                setActiveTab(0);
            } catch(e) {
                console.log("Error fetching tabs:", e);
            }
        }

        fetchTabs();
    }, []);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            const next = (activeTab + 1) % tabs.length;
            setActiveTab(next);
            tabRefs.current[next].focus();
        }
        if (e.key === 'ArrowLeft') {
            const prev = (activeTab - 1 + tabs.length) % tabs.length;
            setActiveTab(prev);
            tabRefs.current[prev].focus();
        }
    };

    return (
        <div>
            <div className = "tab-container"  role="tablist" aria-label="Tabs">
                {tabs.map((tab, index) => {
                    return (
                        <button
                            className={classNames("header", index === activeTab ? 'header-active' : '')}
                            ref={(el) => (tabRefs.current[index] = el)}
                            key={index}
                            role="tab"
                            aria-selected={activeTab === index}
                            aria-controls={`panel-${index}`}
                            onKeyDown={onKeyDown}
                            onClick={() => setActiveTab(index)}
                            id={`tab${index + 1}`}
                            tabIndex={activeTab === index ? 0 : -1}
                        >
                            {tab.title}
                        </button>
                )
            })}
            </div>
            <div className="tab-content"
                role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab${activeTab + 1}`} tabIndex="0">{tabs[activeTab]?.content}</div>
        </div>
        
    );
}

export default Tabs;