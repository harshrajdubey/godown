"use client";

import React, { useState } from 'react';
import Sidebar from "../lib/sidebar";


const Main: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });

  };

  // Function to convert status from snake_case to a more readable format
  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
  };

  // Function to render attributes conditionally
  const renderAttributes = (item: any) => {
    // Define the list of attributes you want to display
    const attributesKeys = [
      "attributes.type",
      "attributes.material",
      "attributes.warranty_years",
      "attributes.size",
      "attributes.color",
      "attributes.age_range",
      "attributes.battery_required",
      "attributes.dimensions",
      "attributes.wattage",
      "attributes.voltage"
    ];

    return attributesKeys.map((key) => {
      const value = item[key];
      if (value !== null) {
        return (
          <p className='text-lg' style={{ marginTop: '5px' }} key={key}>
            {key.replace(/attributes\./, '').replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}: <span style={{ color: '#e0e0e0' }}>{value.toString()}</span>
          </p>
        );
      }
      return null; // Skip rendering if the value is null
    });
  };

  return (
    <div id='descriptiondiv' style={{ display: 'flex', height: 'auto',background:'#0d1317',minHeight:'100vh' }}>
      <Sidebar onItemSelect={handleItemSelect} />
      <div 
        style={{ 
          marginLeft: '10px', 
          marginTop: '60px', 
          flex: 1, 
          padding: '20px', 
          color: '#fff', 
          display: 'flex', 
          height: '100%',
          justifyContent: 'center', 
        }}
      >
        {selectedItem ? (
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            padding: '20px',
            width: '80%',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
          }}>
            <h2 style={{ color: '#fff', fontWeight: '700' }} className='text-2xl'>{selectedItem.name}</h2>
            <img 
              src={selectedItem.image_url} 
              alt={selectedItem.name} 
              style={{ 
                maxWidth: '60%', 
                borderRadius: '8px', 
                marginBottom: '15px', 
                display: 'block', // Center align the image
                margin: '10px auto', // Center align the image
              }} 
            />
            <p className='text-lg' style={{ marginTop: '5px' }}>Category: <span style={{ color: '#e0e0e0' }}>{selectedItem.category}</span></p>
            <p className='text-lg' style={{ marginTop: '5px' }}>Price: <span style={{ color: '#e0e0e0' }}>${selectedItem.price.toFixed(2)}</span></p>
            <p className='text-lg' style={{ marginTop: '5px' }}>Brand: <span style={{ color: '#e0e0e0' }}>{selectedItem.brand}</span></p>
            <p className='text-lg' style={{ marginTop: '5px' }}>Quantity: <span style={{ color: '#e0e0e0' }}>{selectedItem.quantity}</span></p>
            <p className='text-lg' style={{ marginTop: '5px' }}>Status: <span style={{ color: '#e0e0e0' }}>{formatStatus(selectedItem.status)}</span></p>
            <h4 className='text-lg' style={{ marginTop: '5px',color: '#e0e0e0' }}>Attributes:</h4>
            <div style={{ color: '#e0e0e0', backgroundColor: '#1a1a1a', borderRadius: '4px' }}>
              {renderAttributes(selectedItem)}
            </div>
          </div>
        ) : (
          <p className='text-lg'>Select an item to see the details.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
