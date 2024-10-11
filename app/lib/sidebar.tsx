import React, { useEffect, useState } from 'react';

interface SidebarProps {
  onItemSelect: (item: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemSelect }) => {
  const [godowns, setGodowns] = useState<any[]>([]); 
  const [items, setItems] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGodowns, setExpandedGodowns] = useState<string[]>([]); 
  const [expandedSubGodowns, setExpandedSubGodowns] = useState<string[]>([]); 
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await fetch('/api/godowns'); 
        if (!response.ok) {
          throw new Error('Failed to fetch godowns');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setGodowns(data);
        } else {
          console.error('Unexpected response format:', data);
          setGodowns([]);
        }
      } catch (error) {
        console.error('Error fetching godowns:', error);
        setGodowns([]);
      }
    };

    fetchGodowns();
  }, []);

  // Fetch items based on search term
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/items?search=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Unexpected response format:', data);
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      }
    };

    fetchItems();
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== '') {
      const expanded = new Set<string>();

      items.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          expanded.add(item.godown_id);

          const parentGodownId = godowns.find(godown => godown.id === item.godown_id)?.parent_godown;
          if (parentGodownId) {
            expanded.add(parentGodownId);
          }
        }
      });

      setExpandedGodowns(Array.from(expanded));
      setExpandedSubGodowns(Array.from(expanded)); 
    } else {
      setExpandedGodowns([]);
      setExpandedSubGodowns([]);
    }
  }, [searchTerm, items]);

  const toggleExpand = (godownId: string) => {
    setExpandedGodowns((prev) =>
      prev.includes(godownId) ? prev.filter((id) => id !== godownId) : [...prev, godownId]
    );
  };

  const toggleSubExpand = (subGodownId: string) => {
    setExpandedSubGodowns((prev) => {
      if (prev.includes(subGodownId)) {
        return prev.filter((id) => id !== subGodownId);
      } else {
        return [...prev, subGodownId];
      }
    });
  };

  const handleItemSelect = (item: any) => {
    onItemSelect(item); 
    if (window.innerWidth < 768) {
      setSidebarVisible(false);
    }
  };

  const renderItems = (subGodownId: string) => {
    return items
      .filter((item) => item.godown_id === subGodownId) 
      .map((item) => (
        <div
          key={item.item_id}
          onClick={() => handleItemSelect(item)}
          style={{
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            margin: '4px 0',
            transition: 'background-color 1s, transform 2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
            e.currentTarget.style.border = '1px solid #ccc';
            e.currentTarget.style.transform = 'scale(1.02)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.textDecoration = 'none';
           e.currentTarget.style.border = 'none';
           e.currentTarget.style.transform = 'scale(1)';
         }}
     >
          {item.name}
        </div>
      ));
  };

  const renderSubGodown = (subGodown: any) => (
    <div key={subGodown.id} style={{ marginLeft: '20px' }}>
      <div
        onClick={() => {
          toggleSubExpand(subGodown.id);
        }}
        style={{
         cursor: 'pointer',
         fontWeight: 'bold',
         padding: '8px 0',
         paddingLeft: '10px',
         borderRadius:'10px',
         transition: 'color 3s',
       }}

       onMouseEnter={(e) => {
        e.currentTarget.style.textDecoration = 'underline';
        e.currentTarget.style.border = '1px solid #ccc';
        e.currentTarget.style.transform = 'scale(1.02)';
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.textDecoration = 'none';
       e.currentTarget.style.border = 'none';
       e.currentTarget.style.transform = 'scale(1)';
     }}

      >
        {expandedSubGodowns.includes(subGodown.id) ? '▼' : '►'} {subGodown.name}
      </div>
      {expandedSubGodowns.includes(subGodown.id) && (
        <div style={{ paddingLeft: '20px', transition: 'max-height 3s ease' }}>
          {renderItems(subGodown.id)}
        </div>
      )}
    </div>
  );

  const renderGodownItems = (godown: any) => {
    const godownItems = items.filter(item => item.godown_id === godown.id); 

    return (
      <div style={{ marginLeft: '20px' }}>
        {godownItems.map(item => (
          <div
            key={item.item_id}
            onClick={() => handleItemSelect(item)} 
            style={{
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '10px',
              margin: '4px 0',
              transition: 'background-color 1s, transform 2s',
            }}
            onMouseEnter={(e) => {
               e.currentTarget.style.textDecoration = 'underline';
               e.currentTarget.style.border = '1px solid #ccc';
               e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
              e.currentTarget.style.border = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  };
  const renderGodown = (godown: any) => (
    <div key={godown.id} style={{ marginBottom: '20px' }}>
      <div
        onClick={() => toggleExpand(godown.id)} 
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          padding: '8px 0',
          paddingLeft: '10px',
          borderRadius:'10px',
          transition: 'color 3s',
        }}

        onMouseEnter={(e) => {
         e.currentTarget.style.textDecoration = 'underline';
         e.currentTarget.style.border = '1px solid #ccc';
         e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textDecoration = 'none';
        e.currentTarget.style.border = 'none';
        e.currentTarget.style.transform = 'scale(1)';
      }}

      >
        {expandedGodowns.includes(godown.id) ? '▼' : '►'} {godown.name}
      </div>
      {expandedGodowns.includes(godown.id) && (
        <div style={{ paddingLeft: '20px', transition: 'max-height 3s ease' }}>
          {godowns
            .filter((subGodown) => subGodown.parent_godown === godown.id)
            .map(renderSubGodown)}
          {renderGodownItems(godown)} {}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {sidebarVisible && (
        <div style={{ width: '360px', padding: '20px', borderRight: '1px solid #ccc',overflowY:'auto', transition: 'transform 3s ease-in-out' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
               color:'#000',
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              transition: 'border-color 1s', 
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#007BFF'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#ccc'} 
          />
          {godowns.map(renderGodown)} {}
        </div>
      )}
      <button
      id="tooglebtn"
        onClick={() => setSidebarVisible((prev) => !prev)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
          transition: 'background-color 1s, transform 2s',
         }}
         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
 
     >
        {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
    </div>
  );
};

export default Sidebar;
