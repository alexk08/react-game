const createData = (boardSize, cardType) => {
  let arr = [];
  let maxId = 100;
  const a = boardSize/2;

  for (let i = 0; i < a; i++) {
    const el = {
      text: `${i+1}`,
      isOpened: false,
      isGuessed: false,
      isNotGuessed: false,
      pause: false,
      imageSrc: `./images/${cardType}/${i + 1}.${cardType === 'cards' ? 'png' : 'jpg'}`
    };
    arr = [ ...arr, el, el]; 
  }

  arr = arr.map((el, idx) => {
    return {
      ...el,
      id: maxId++,
    }
  })

  return arr;
}

export default createData;