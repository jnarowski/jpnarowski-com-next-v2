export interface Book {
  id: string;
  title: string;
  author: string | string[];
  coverImage: string;
  amazonUrl: string;
  rating?: number;
  dateRead?: string;
  notes?: string;
  category?: string;
}

const books: Book[] = [
  {
    id: 'extreme-ownership',
    title: 'Extreme Ownership: How U.S. Navy SEALs Lead and Win',
    author: ['Jocko Willink', 'Leif Babin'],
    coverImage: '/books/extreme-ownership.jpg',
    amazonUrl: 'https://www.amazon.com/Extreme-Ownership-U-S-Navy-SEALs/dp/1250067057',
    category: 'Leadership',
    notes: 'Jocko breaks down leadership into one simple principle: everything is your fault. Sounds harsh, but it\'s liberating - when you own everything, you can fix everything.',
  },
  {
    id: '4000-weeks',
    title: 'Four Thousand Weeks: Time Management for Mortals',
    author: 'Oliver Burkeman',
    coverImage: '/books/4000-weeks.jpg',
    amazonUrl: 'https://www.amazon.com/Four-Thousand-Weeks-Management-Mortals/dp/0374159122',
    category: 'Philosophy',
    notes: 'You have about 4,000 weeks on this planet if you\'re lucky. This book destroyed my productivity guilt and taught me that doing less, intentionally, is the whole point.',
  },
  {
    id: 'die-with-zero',
    title: 'Die with Zero: Getting All You Can from Your Money and Your Life',
    author: 'Bill Perkins',
    coverImage: '/books/die-with-zero.jpg',
    amazonUrl: 'https://www.amazon.com/Die-Zero-Getting-Your-Money/dp/0358099765',
    category: 'Personal Finance',
    notes: 'Why are you saving all that money if you\'re just going to die with it? Bill makes a provocative case for spending your money on experiences while you can actually enjoy them. Changed how I think about retirement.',
  },
  {
    id: 'traction',
    title: 'Traction: Get a Grip on Your Business',
    author: 'Gino Wickman',
    coverImage: '/books/traction.jpg',
    amazonUrl: 'https://www.amazon.com/Traction-Get-Grip-Your-Business/dp/1936661837',
    category: 'Business',
    notes: 'The EOS framework is basically the operating system for running a company. Weekly L10 meetings, rocks instead of goals, and getting everyone on the same page. Simple but not easy.',
  },
  {
    id: 'positive-intelligence',
    title: 'Positive Intelligence: Why Only 20% of Teams and Individuals Achieve Their True Potential',
    author: 'Shirzad Chamine',
    coverImage: '/books/positive-intelligence.jpg',
    amazonUrl: 'https://www.amazon.com/Positive-Intelligence-Individuals-Achieve-Potential/dp/1608322785',
    category: 'Self-Help',
    notes: 'Your brain has saboteurs that undermine you, and you can actually train yourself to recognize and quiet them. The Judge, the Avoider, the Hyper-Achiever - once you see them, you can\'t unsee them.',
  },
  {
    id: 'sapiens',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: '/books/sapiens.jpg',
    amazonUrl: 'https://www.amazon.com/Sapiens-Humankind-Yuval-Noah-Harari/dp/0062316117',
    category: 'History',
    notes: 'Harari zooms way out and tells the story of humanity from the cognitive revolution to today. Makes you realize how much of modern life is just shared fiction we all agree to believe in.',
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: '/books/the-alchemist.jpg',
    amazonUrl: 'https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005',
    category: 'Fiction',
    notes: 'A shepherd goes on a journey to find treasure and learns that the real treasure was inside him all along. Sounds cheesy but it hits different when you\'re actually living it.',
  },
  {
    id: 'multipliers',
    title: 'Multipliers: How the Best Leaders Make Everyone Smarter',
    author: 'Liz Wiseman',
    coverImage: '/books/multipliers.jpg',
    amazonUrl: 'https://www.amazon.com/Multipliers-Revised-Updated-Leaders-Everyone/dp/0062663070',
    category: 'Leadership',
    notes: 'Some leaders drain intelligence from their teams (Diminishers), others amplify it (Multipliers). This book breaks down exactly how the best leaders make everyone around them smarter.',
  },
  {
    id: 'deep-work',
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    coverImage: '/books/deep-work.jpg',
    amazonUrl: 'https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692',
    category: 'Productivity',
    notes: 'Cal Newport makes the case that deep, focused work is becoming rare and therefore more valuable. The ability to focus without distraction is basically a superpower now.',
  },
  {
    id: 'the-shallows',
    title: 'The Shallows: What the Internet Is Doing to Our Brains',
    author: 'Nicholas Carr',
    coverImage: '/books/the-shallows.jpg',
    amazonUrl: 'https://www.amazon.com/Shallows-What-Internet-Doing-Brains/dp/0393339750',
    category: 'Technology',
    notes: 'The internet is literally rewiring our brains for distraction and shallow thinking. Carr explains why you can\'t read like you used to and why that should terrify you.',
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    author: 'Homer',
    coverImage: '/books/the-odyssey.jpg',
    amazonUrl: 'https://www.amazon.com/Odyssey-Penguin-Classics-Deluxe/dp/0143039954',
    category: 'Literature',
    notes: 'A guy spends 10 years trying to get home after a war. Ancient Greek epic poetry that somehow still resonates - we\'re all just trying to find our way back home, aren\'t we?',
  },
  {
    id: 'grit',
    title: 'Grit: The Power of Passion and Perseverance',
    author: 'Angela Duckworth',
    coverImage: '/books/grit.jpg',
    amazonUrl: 'https://www.amazon.com/Grit-Passion-Perseverance-Angela-Duckworth/dp/1501111116',
    category: 'Self-Help',
    notes: 'Talent is overrated - what actually matters is sustained effort over time. Angela\'s research shows that grit beats genius, and the good news is you can build it.',
  },
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | null {
  return books.find(book => book.id === id) || null;
}
