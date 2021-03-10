const saveGame = (data) => {

  const json = JSON.stringify(data);
  localStorage.setItem('alexk08-memory-data', json);

}

export default saveGame;
