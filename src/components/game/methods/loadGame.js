const loadGame = () => {  
  const data = localStorage.getItem('alexk08-memory-data');

  if (data === null) return;
  
  return JSON.parse(data);
}

export default loadGame;