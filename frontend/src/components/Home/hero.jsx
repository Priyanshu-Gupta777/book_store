import RecentlyAddedBooks from "./RecentlyAddedBook"

export default function HomePage() {
    return (
      <main className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Your Next Great Read</h1>
              <p className="text-lg md:text-xl mb-8">
                Uncover captivating stories, enriching knowledge, and endless
                inspiration in our curated collection of books
              </p>
              <a href="/all-books" class="left-7 relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
              <span class="w-80 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span class="absolute top-0 left-0 w-80 h-32 mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-yellow-500 opacity-100 group-hover:-translate-x-8"></span>
              <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white-900">Discover Now</span>
              <span class="absolute inset-0 border-2 border-white rounded-full"></span>
              </a>
            </div>
            <div className="relative w-full md:w-1/2 h-64 md:h-96">
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 "></div>
              </div>
              <img src="./book-penguin.gif" alt="People reading books" className="absolute inset-0 w-full h-full " />
            </div>
          </div>
          <RecentlyAddedBooks />
        </div>
      </main>
    )
  }