import React from 'react';

import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from '../utils/network-data';

const useNotes = (isArchived) => {
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    if (isArchived) {
      getArchivedNotes().then(({ data }) => {
        setNotes(data);
        setLoading(false);
      });
    } else {
      getActiveNotes().then(({ data }) => {
        setNotes(data);
        setLoading(false);
      });
    }

    return () => {
      setLoading(true);
    };
  }, [isArchived]);

  const onDeleteNote = async (id) => {
    await deleteNote(id);
    if (isArchived) {
      const { data } = await getArchivedNotes();
      setNotes(data);
      return;
    }
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onArchiveNote = async (id) => {
    await archiveNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onUnarchiveNote = async (id) => {
    await unarchiveNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  return { loading, notes, onDeleteNote, onArchiveNote, onUnarchiveNote };
};

export default useNotes;
