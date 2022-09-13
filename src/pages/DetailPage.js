import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MdDeleteOutline, MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import Button from '../components/Button';
import LoadingSpace from '../components/LoadingSpace';
import LocaleContext from '../context/LocaleContext';
import useSingleNote from '../hooks/useSingleNote';
import NoMatchPage from '../pages/NoMatchPage';
import { showFormattedDate } from '../utils';

const DetailPage = () => {
  const { id } = useParams();
  const { locale } = React.useContext(LocaleContext);

  const { loading, note, onArchiveNote, onUnarchiveNote, onDeleteNote } = useSingleNote(id);

  if (loading) {
    return (
      <LoadingSpace>{locale === 'id' ? 'Memuat catatan ...' : 'Loading notes ...'}</LoadingSpace>
    );
  }

  if (!note) {
    return <NoMatchPage />;
  }

  const { title, createdAt, body, archived } = note;

  return (
    <section className='detail-page'>
      <Helmet>
        <title>{title} - notes.self</title>
      </Helmet>
      <h3 className='detail-page__title'>{title}</h3>
      <p className='detail-page__createdAt'>{showFormattedDate(createdAt)}</p>
      <div className='detail-page__body'>{parse(body)}</div>
      <div className='detail-page__action'>
        {archived ? (
          <Button title='Aktifkan' onClick={onUnarchiveNote} icon={<MdOutlineUnarchive />} />
        ) : (
          <Button title='Arsipkan' onClick={onArchiveNote} icon={<MdOutlineArchive />} />
        )}
        <Button title='Hapus' onClick={onDeleteNote} icon={<MdDeleteOutline />} />
      </div>
    </section>
  );
};

export default DetailPage;
