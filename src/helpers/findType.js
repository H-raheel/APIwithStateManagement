
export const findDcIdForUser = (user,types) => {
    
    const matchingType = types.find(type => type.name === user.doctor_category);
  
 
    return matchingType ? matchingType.id : null;
  };

  export const findCategoryForUser = (user,types) => {
    
    const matchingType = types.find(type => type.id === user.dc_id);
  
 
    return matchingType ? matchingType.name : null;
  };