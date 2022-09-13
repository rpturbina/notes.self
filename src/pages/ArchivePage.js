import React from 'react';
import { Helmet } from 'react-helmet';

import LoadingSpace from '../components/LoadingSpace';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import LocaleContext from '../context/LocaleContext';
import useKeyword from '../hooks/useKeyword';
import useNotes from '../hooks/useNotes';
import { searchFilter } from '../utils';

const ArchivePage = () => {
  const [keyword, onKeywordChange] = useKeyword();
  const { locale } = React.useContext(LocaleContext);
  const { loading, notes, onDeleteNote, onUnarchiveNote } = useNotes(true);

  const filteredNotes = searchFilter(notes, keyword);

  return (
    <section className='archives-page'>
      <Helmet>
        <title>Archives Page - notes.self</title>
      </Helmet>
      <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      {loading ? (
        <LoadingSpace>{locale === 'id' ? 'Memuat catatan ...' : 'Loading notes ...'}</LoadingSpace>
      ) : (
        <NotesList notes={filteredNotes} onDelete={onDeleteNote} onArchive={onUnarchiveNote} />
      )}
    </section>
  );
};

export default ArchivePage;
