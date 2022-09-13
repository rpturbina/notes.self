import React from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { searchFilter } from '../utils';
import { deleteNote, getArchivedNotes, unarchiveNote } from '../utils/network-data';

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
    setKeyword(keyword);
  };

  const onDeleteNoteHandler = async (id) => {
    await deleteNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const onUnarchiveNoteHandler = async (id) => {
    await unarchiveNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const filteredNotes = searchFilter(notes, keyword);

  return (
    <section className='archives-page'>
      <Helmet>
        <title>Archives Page - notes.self</title>
      </Helmet>
      <h2>Catatan Arsip</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteNoteHandler}
        onArchive={onUnarchiveNoteHandler}
      />
    </section>
  );
};

export default ArchivePage;

// const ArchivePageWrapper = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const keyword = searchParams.get('keyword');

//   const onKeywordChangeHandler = (keyword) => {
//     setSearchParams({ keyword });
//   };

//   return <ArchivePage defaultKeyword={keyword} keywordChange={onKeywordChangeHandler} />;
// };

// class ArchivePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notes: getArchivedNotes(),
//       keyword: props.defaultKeyword || '',
//     };

//     this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
//     this.onDeleteNoteEventHandler = this.onDeleteNoteEventHandler.bind(this);
//     this.onUnarchiveNoteEventHandler = this.onUnarchiveNoteEventHandler.bind(this);
//   }

//   onKeywordChangeEventHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });
//     this.props.keywordChange(keyword);
//   }

//   onDeleteNoteEventHandler(id) {
//     deleteNote(id);
//     this.setState(() => {
//       return {
//         notes: getArchivedNotes(),
//       };
//     });
//   }

//   onUnarchiveNoteEventHandler(id) {
//     unarchiveNote(id);
//     this.setState(() => {
//       return {
//         notes: getArchivedNotes(),
//       };
//     });
//   }

//   render() {
//     const notes = searchFilter(this.state.notes, this.state.keyword);
//     return (
//       <section className='archives-page'>
//         <Helmet>
//           <title>Archives Page - notes.self</title>
//         </Helmet>
//         <h2>Catatan Arsip</h2>
//         <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeEventHandler} />
//         <NotesList
//           notes={notes}
//           onDelete={this.onDeleteNoteEventHandler}
//           onArchive={this.onUnarchiveNoteEventHandler}
//         />
//       </section>
//     );
//   }
// }

// ArchivePage.propTypes = {
//   defaultKeyword: PropTypes.string,
//   keywordChange: PropTypes.func.isRequired,
// };

// export default ArchivePageWrapper;
