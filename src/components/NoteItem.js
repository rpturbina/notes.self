import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LocaleContext from '../context/LocaleContext';
import { showFormattedDate } from '../utils';

const NoteItem = ({ id, title, createdAt, body, archived, onDelete, onArchive }) => {
  const { locale } = useContext(LocaleContext);
  const arhiveText = locale === 'id' ? 'Aktifkan' : 'Unarchive';
  const unArchiveText = locale === 'id' ? 'Arsipkan' : 'Archive';
  return (
    <article className='note-item'>
      <h3 className='note-item__title'>
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className='note-item__createdAt'>{showFormattedDate(createdAt)}</p>
      <p className='note-item__body'>{parse(body)}</p>
      <div className='note-item__action'>
        <button className='note-item__delete-button' onClick={() => onDelete(id)}>
          {locale === 'id' ? 'Hapus' : 'Delete'}
        </button>
        <button className='note-item__archive-button' onClick={() => onArchive(id)}>
          {archived ? unArchiveText : arhiveText}
        </button>
      </div>
    </article>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteItem;
