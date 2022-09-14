const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const checkKeywordPattern = (title, keyword) => {
  const pattern = keyword
    .split('')
    .map((q) => {
      return `(?=.*${escapeRegExp(q)})`;
    })
    .join('');

  const regex = new RegExp(`${pattern}`, 'g');
  return title.match(regex);
};

const searchFilter = (notes, searchKeyword) => {
  const processedSearchKeyword = searchKeyword.toLowerCase();
  const searchResults = notes.filter((note) => {
    const processedNoteTitle = note.title.substring(0, 3).toLowerCase();
    return (
      note.title.toLowerCase().includes(processedSearchKeyword) ||
      checkKeywordPattern(processedNoteTitle, processedSearchKeyword)
    );
  });

  return searchResults;
};

const decodeHTMLEntities = (text) => {
  let textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

export { showFormattedDate, searchFilter, decodeHTMLEntities };
