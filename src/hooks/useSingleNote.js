import React from 'react';
import { useNavigate } from 'react-router-dom';

import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data';

const useSingleNote = (id) => {
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });

    return () => {
      setLoading(true);
    };
  }, [id]);

  const onArchiveNote = async () => {
    const { error } = await archiveNote(id);
    if (!error) {
      navigate('/');
    }
  };

  const onUnarchiveNote = async () => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      navigate('/');
    }
  };

  const onDeleteNote = async () => {
    const { error } = await deleteNote(id);
    if (!error) {
      navigate('/');
    }
  };

  return { loading, note, onArchiveNote, onUnarchiveNote, onDeleteNote };
};

export default useSingleNote;
