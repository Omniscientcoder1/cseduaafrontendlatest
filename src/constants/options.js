export const roles = [
    { name: 'None', value: 'None' },
    { name: 'General Secretary', value: 'GS' },
    { name: 'President', value: 'President' },
    { name: 'Executive Member', value: 'EM' },
    { name: 'Vice President', value: 'VP' },
  ];

export const getBatches = () => {
    const options = [];
  
    // Loop for BSc batches
    for (let i = 1; i <= 30; i++) {
      options.push({
        name: `BSc - ${i.toString().padStart(2, '0')}`,
        value: `BSc - ${i.toString().padStart(2, '0')}`,
      });
    }
  
    // Loop for MSc batches
    for (let i = 1; i <= 30; i++) {
      options.push({
        name: `MSc - ${i.toString().padStart(2, '0')}`,
        value: `MSc - ${i.toString().padStart(2, '0')}`,
      });
    }
  
    options.push({ name: `PHD`, value: `PHD` });
  
    return options;
  };
