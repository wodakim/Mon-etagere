import React, { useState, useEffect } from 'react';
import { Book, PenTool, Coffee, Flower2, X, Save, AlignLeft } from 'lucide-react';

// --- Données initiales des livres ---
const initialBooks = [
  { id: 1, title: "Journal Intime", color: "bg-slate-800", textColor: "text-slate-100", content: "" },
  { id: 2, title: "Idées & Projets", color: "bg-emerald-800", textColor: "text-emerald-100", content: "" },
  { id: 3, title: "Pensées", color: "bg-amber-700", textColor: "text-amber-100", content: "" },
  { id: 4, title: "Croquis", color: "bg-stone-800", textColor: "text-stone-100", content: "" },
  { id: 5, title: "Rêves", color: "bg-indigo-900", textColor: "text-indigo-100", content: "" },
];

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [activeBookId, setActiveBookId] = useState(null);
  const [isOpening, setIsOpening] = useState(false);

  // Gérer l'ouverture d'un livre avec une petite animation
  const openBook = (id) => {
    setIsOpening(true);
    setTimeout(() => {
      setActiveBookId(id);
      setIsOpening(false);
    }, 300); // Durée de la transition
  };

  // Sauvegarder et fermer
  const closeBook = (id, newContent) => {
    setBooks(books.map(book => book.id === id ? { ...book, content: newContent } : book));
    setActiveBookId(null);
  };

  const activeBook = books.find(b => b.id === activeBookId);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 flex flex-col selection:bg-stone-300">
      
      {/* En-tête minimaliste */}
      <header className="w-full p-6 text-center opacity-70">
        <h1 className="text-2xl tracking-widest uppercase font-light">Espace Personnel</h1>
        <p className="text-sm font-light mt-2">Harmonie & Ordre</p>
      </header>

      {/* Zone Principale */}
      <main className="flex-grow flex items-center justify-center p-4">
        
        {/* Vue du bureau (quand aucun livre n'est ouvert) */}
        {!activeBookId && (
          <div className={`transition-all duration-500 ease-in-out transform ${isOpening ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} flex flex-col items-center w-full max-w-4xl`}>
            
            {/* Décorations du bureau */}
            <div className="flex justify-between items-end w-full max-w-2xl px-8 mb-4 opacity-80">
              <div className="flex flex-col items-center">
                <Coffee size={32} strokeWidth={1.5} className="text-stone-600 mb-2" />
                <div className="w-16 h-2 bg-stone-300 rounded-full blur-[2px]"></div>
              </div>
              <div className="flex flex-col items-center">
                <Flower2 size={40} strokeWidth={1.5} className="text-emerald-700 mb-2" />
                <div className="w-12 h-2 bg-stone-300 rounded-full blur-[2px]"></div>
              </div>
            </div>

            {/* L'étagère / Le bureau parfait */}
            <div className="relative w-full max-w-3xl flex flex-col items-center">
              
              {/* Les Livres (Alignement parfait anti-chaos) */}
              <div className="flex justify-center items-end space-x-2 sm:space-x-4 z-10 px-4">
                {books.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => openBook(book.id)}
                    className={`group relative h-48 sm:h-64 w-16 sm:w-20 ${book.color} ${book.textColor} rounded-t-md rounded-b-sm shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 flex flex-col items-center justify-between py-4 border-l-4 border-white/10 border-r-4 border-black/20`}
                    title={`Ouvrir ${book.title}`}
                  >
                    {/* Reliure supérieure */}
                    <div className="w-full h-1 bg-white/20 mb-2"></div>
                    
                    {/* Titre vertical */}
                    <div className="flex-grow flex items-center justify-center w-full">
                      <span className="transform -rotate-90 whitespace-nowrap tracking-widest text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {book.title}
                      </span>
                    </div>

                    {/* Lignes décoratives de la reliure */}
                    <div className="w-full space-y-1 opacity-50">
                      <div className="h-0.5 w-full bg-current"></div>
                      <div className="h-0.5 w-full bg-current"></div>
                    </div>
                    
                    {/* Indicateur de contenu */}
                    {book.content.length > 0 && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/60"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* La surface du bureau */}
              <div className="w-full h-6 bg-stone-400 rounded-t-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] z-0 relative">
                 <div className="absolute top-0 w-full h-1 bg-stone-300 rounded-t-lg"></div>
              </div>
              <div className="w-11/12 h-4 bg-stone-500 rounded-b-xl shadow-inner mx-auto"></div>
            </div>

            <p className="mt-12 text-stone-400 text-sm flex items-center gap-2">
              <PenTool size={16} /> Cliquez sur un carnet pour l'ouvrir
            </p>
          </div>
        )}

        {/* Vue d'un livre ouvert */}
        {activeBook && (
          <BookEditor book={activeBook} onClose={closeBook} />
        )}
      </main>
    </div>
  );
}

// --- Composant de l'éditeur du livre ---
function BookEditor({ book, onClose }) {
  const [content, setContent] = useState(book.content);
  const [isClosing, setIsClosing] = useState(false);

  // Effet d'apparition douce
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(book.id, content);
    }, 300); // Synchronisé avec la durée d'animation
  };

  return (
    <div className={`w-full max-w-5xl h-[80vh] flex flex-col md:flex-row shadow-2xl rounded-r-2xl rounded-l-md overflow-hidden bg-stone-50 transition-all duration-300 transform ${mounted && !isClosing ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
      
      {/* Couverture / Dos du livre visible à gauche */}
      <div className={`hidden md:flex w-16 ${book.color} ${book.textColor} flex-col items-center py-8 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.3)] z-10`}>
         <div className="w-full h-1 bg-white/20 mb-8"></div>
         <span className="transform -rotate-90 whitespace-nowrap tracking-widest text-lg font-medium opacity-90 mt-20">
            {book.title}
          </span>
      </div>

      {/* Pages ouvertes */}
      <div className="flex-grow flex flex-col relative bg-[#fdfbf7] shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]">
        
        {/* Ligne centrale (pliure du livre) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-stone-200/50 to-transparent pointer-events-none z-0"></div>

        {/* En-tête de la page */}
        <div className="flex justify-between items-center p-6 border-b border-stone-200 z-10">
          <div className="flex items-center gap-3">
            <AlignLeft className="text-stone-400" size={20} />
            <h2 className="text-xl font-serif text-stone-700">{book.title}</h2>
          </div>
          <button 
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-md transition-colors text-sm font-medium"
          >
            <Save size={16} />
            <span>Ranger</span>
          </button>
        </div>

        {/* Zone de texte (lignée façon cahier) */}
        <div className="flex-grow p-6 md:p-12 relative z-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Écrivez vos pensées ici. Tout est en ordre..."
            className="w-full h-full resize-none bg-transparent outline-none text-stone-700 font-serif leading-[2.5rem] text-lg"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 2.4rem, #e5e5e5 2.4rem, #e5e5e5 2.5rem)',
              backgroundAttachment: 'local'
            }}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
