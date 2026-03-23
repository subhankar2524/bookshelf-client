import { useState } from "react";
import { searchBooksService, getBookDetailsService } from "../services/bookService";

export const useBooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);

  const defaultBooks = [
    {
        "id": "aV83EAAAQBAJ",
        "title": "Hello, Molly!",
        "authors": ["Molly Shannon", "Sean Wilsey"],
        "description": "A New York Times bestseller. A candid, compulsively readable, hilarious, and heartbreaking memoir by comedic genius Molly Shannon.",
        "thumbnail": "http://books.google.com/books/content?id=aV83EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2022-04-12",
        "publisher": "HarperCollins",
        "pageCount": 296,
        "categories": ["Biography & Autobiography"],
        "averageRating": 4.5,
        "ratingsCount": 1250,
        "previewLink": "http://books.google.co.in/books?id=aV83EAAAQBAJ&pg=PT24&dq=hello&hl=&cd=1&source=gbs_api",
        "infoLink": "http://books.google.co.in/books?id=aV83EAAAQBAJ&dq=hello&hl=&source=gbs_api"
    },
    {
        "id": "RzoSAQAAMAAJ",
        "title": "Harry Potter and the Sorcerer's Stone by J.K. Rowling",
        "authors": ["Lori Mammen"],
        "description": "Novel units provide teachers with new ways to teach reading, writing, and the love of literature.",
        "thumbnail": "http://books.google.com/books/content?id=RzoSAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        "publishedDate": "2000",
        "publisher": "Novel Units, Incorporated",
        "pageCount": 38,
        "categories": ["Education"],
        "averageRating": null,
        "ratingsCount": 0,
        "previewLink": "http://books.google.co.in/books?id=RzoSAQAAMAAJ&pg=PA12&dq=harry+potter&hl=&cd=8&source=gbs_api",
        "infoLink": "http://books.google.co.in/books?id=RzoSAQAAMAAJ&dq=harry+potter&hl=&source=gbs_api"
    },
    {
        "id": "zyTCAlS7QYMC",
        "title": "The Great Gatsby",
        "authors": ["F. Scott Fitzgerald"],
        "description": "The novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.",
        "thumbnail": "http://books.google.com/books/content?id=zyTCAlS7QYMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "1925-04-10",
        "publisher": "Scribner",
        "pageCount": 180,
        "categories": ["Fiction"],
        "averageRating": 4.0,
        "ratingsCount": 35402,
        "previewLink": "http://books.google.com/books?id=zyTCAlS7QYMC&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=zyTCAlS7QYMC&source=gbs_api"
    },
    {
        "id": "WPC1BAAAQBAJ",
        "title": "101 Amazing Harry Potter Facts",
        "authors": ["Jack Goldstein", "Frankie Taylor"],
        "description": "This book contains 101 amazing facts which you most likely didn’t know about the magical world of Harry Potter!",
        "thumbnail": "http://books.google.com/books/content?id=WPC1BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2012-10-16",
        "publisher": "Andrews UK Limited",
        "pageCount": 25,
        "categories": ["Reference"],
        "averageRating": null,
        "ratingsCount": 0,
        "previewLink": "http://books.google.co.in/books?id=WPC1BAAAQBAJ&printsec=frontcover&dq=harry+potter&hl=&cd=10&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=WPC1BAAAQBAJ&source=gbs_api"
    },
    {
        "id": "tcSMCwAAQBAJ",
        "title": "Atomic Habits",
        "authors": ["James Clear"],
        "description": "No matter your goals, Atomic Habits offers a proven framework for improving—every day.",
        "thumbnail": "http://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2018-10-16",
        "publisher": "Penguin",
        "pageCount": 320,
        "categories": ["Self-Help"],
        "averageRating": 4.8,
        "ratingsCount": 95000,
        "previewLink": "http://books.google.com/books?id=tcSMCwAAQBAJ&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=tcSMCwAAQBAJ&source=gbs_api"
    },
    {
        "id": "3ZpFEAAAQBAJ",
        "title": "Tomorrow, and Tomorrow, and Tomorrow",
        "authors": ["Gabrielle Zevin"],
        "description": "A modern masterpiece about two friends who become creative partners in the world of video game design.",
        "thumbnail": "http://books.google.com/books/content?id=3ZpFEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2022-07-05",
        "publisher": "Knopf",
        "pageCount": 416,
        "categories": ["Fiction"],
        "averageRating": 4.6,
        "ratingsCount": 15200,
        "previewLink": "http://books.google.com/books?id=3ZpFEAAAQBAJ&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=3ZpFEAAAQBAJ&source=gbs_api"
    },
    {
        "id": "f2_8vQEACAAJ",
        "title": "Sapiens: A Brief History of Humankind",
        "authors": ["Yuval Noah Harari"],
        "description": "Explores the history of the human species from the Stone Age to the twenty-first century.",
        "thumbnail": "http://books.google.com/books/content?id=f2_8vQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        "publishedDate": "2015-02-10",
        "publisher": "Harper",
        "pageCount": 464,
        "categories": ["History"],
        "averageRating": 4.5,
        "ratingsCount": 82000,
        "previewLink": "http://books.google.com/books?id=f2_8vQEACAAJ&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=f2_8vQEACAAJ&source=gbs_api"
    },
    {
        "id": "7T20DwAAQBAJ",
        "title": "The Midnight Library",
        "authors": ["Matt Haig"],
        "description": "Between life and death there is a library, and within that library, the shelves go on forever.",
        "thumbnail": "http://books.google.com/books/content?id=7T20DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2020-08-13",
        "publisher": "Canongate Books",
        "pageCount": 304,
        "categories": ["Fiction"],
        "averageRating": 4.1,
        "ratingsCount": 45000,
        "previewLink": "http://books.google.com/books?id=7T20DwAAQBAJ&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=7T20DwAAQBAJ&source=gbs_api"
    },
    {
        "id": "vS8_DwAAQBAJ",
        "title": "Project Hail Mary",
        "authors": ["Andy Weir"],
        "description": "A lone astronaut must save the earth from disaster in this propulsive sci-fi thriller.",
        "thumbnail": "http://books.google.com/books/content?id=vS8_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2021-05-04",
        "publisher": "Ballantine Books",
        "pageCount": 496,
        "categories": ["Science Fiction"],
        "averageRating": 4.7,
        "ratingsCount": 28000,
        "previewLink": "http://books.google.com/books?id=vS8_DwAAQBAJ&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=vS8_DwAAQBAJ&source=gbs_api"
    },
    {
        "id": "L_p_BAAAQBAJ",
        "title": "The Martian",
        "authors": ["Andy Weir"],
        "description": "Robinson Crusoe on Mars, a survival story for the 21st century.",
        "thumbnail": "http://books.google.com/books/content?id=L_p_BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "publishedDate": "2014-02-11",
        "publisher": "Crown",
        "pageCount": 384,
        "categories": ["Science Fiction"],
        "averageRating": 4.4,
        "ratingsCount": 56000,
        "previewLink": "http://books.google.com/books?id=L_p_BAAAQBAJ&source=gbs_api",
        "infoLink": "http://books.google.com/books?id=L_p_BAAAQBAJ&source=gbs_api"
    }
];

  const [books, setBooks] = useState(defaultBooks);

  const searchBooks = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const res = await searchBooksService(query);
      setBooks(res);
      return res;
    } catch (err) {
      setError(err?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookDetail = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBookDetailsService(id);
      setCurrentBook(res);
      return res;
    } catch (err) {
      setError(err?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { searchBooks, getBookDetail, books, currentBook, loading, error };
};
