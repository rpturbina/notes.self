import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MdDeleteOutline, MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../components/Button';
import NoMatchPage from '../pages/NoMatchPage';
import { showFormattedDate } from '../utils';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
    });
  }, [id]);

  const onArchiveNoteHandler = async (id) => {
    const { error } = await archiveNote(id);
    if (!error) {
      navigate('/');
    }
  };

  const onUnarchiveNoteHandler = async (id) => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      navigate('/');
    }
  };

  const onDeleteNoteHandler = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) {
      navigate('/');
    }
  };

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
          <Button title='Aktifkan' onClick={onUnarchiveNoteHandler} icon={<MdOutlineUnarchive />} />
        ) : (
          <Button title='Arsipkan' onClick={onArchiveNoteHandler} icon={<MdOutlineArchive />} />
        )}
        <Button title='Hapus' onClick={onDeleteNoteHandler} icon={<MdDeleteOutline />} />
      </div>
    </section>
  );
};

export default DetailPage;
