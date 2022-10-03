import React from "react";

const GroupItem = ({ initIndex, items = {} }) => {
  return (
    <>
      {items.map((item, i) => (
        <>
          <div>{initIndex + i * 0.1}</div>
          <div>{item.name}</div>
          <div>{item.percentage}</div>
        </>
      ))}
    </>
  );
};

export default GroupItem;
