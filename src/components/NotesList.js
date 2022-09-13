import PropTypes from 'prop-types';
import React from 'react';

import LocaleContext from '../context/LocaleContext';
import NoteItem from './NoteItem';

const NotesList = ({ notes, onDelete, onArchive }) => {
  const { locale } = React.useContext(LocaleContext);
  return !notes.length ? (
    <section className='notes-list-empty'>
      <p className='notes-list__empty-message'>
        {locale === 'id' ? 'Tidak ada catatan' : 'No notes'}
      </p>
    </section>
  ) : (
    <section className='notes-list'>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          createdAt={note.createdAt}
          body={note.body}
          archived={note.archived}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </section>
  );
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NotesList;
