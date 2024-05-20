"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

const DropdownMenu = ({ apiUrl, parentId = null, onSelect }) => {
  const [items, setItems] = useState([]);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(parentId ? `${apiUrl}/${parentId}` : apiUrl);
      const data = await response.json();
      setItems(data);
      if (!parentId && data.length > 0) {
        // If it's the root menu and items are fetched, select the first item by default
        onSelect(data[0], null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [apiUrl, parentId, onSelect]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (index, item) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
    if (parentId) {
      // If it's a branch, select it and close all dropdowns
      onSelect(null, item);
      setActiveSubmenu(null);
    } else {
      // If it's an organization, select it and reset the branch
      onSelect(item, null);
    }
  };

  return (
    <div ref={menuRef} className={`absolute ${parentId ? 'left-full top-0 ml-2' : 'top-full left-0 mt-2'} w-36 bg-white shadow-lg z-50`}>
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          <div
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleItemClick(index, item)}
          >
            {parentId ? item.branchName : item.orgName}
            {!parentId && <span className="float-right">▶</span>}
          </div>
          {activeSubmenu === index && !parentId && (
            <DropdownMenu
              apiUrl={`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/organization/orgBranch`}
              parentId={item.id}
              onSelect={onSelect}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
