import {
  FaTelegramPlane,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-10 md:pl-36 bg-violet-200 dark:bg-[var(--border-color)] text-violet-600 dark:text-white p-8 rounded-t-3xl">
      <div className="flex flex-wrap flex-center w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold mb-4">About me</h2>
            <p>
              We are a movie discovery platform dedicated to bringing you the
              best movie experiences. Explore our site to find the latest
              releases, top-rated movies, and hidden gems.
            </p>
          </div>
          <div>
            <h2 className="font-bold mb-4">Contact</h2>
            <p>123 Movie Lane</p>
            <p>Hollywood, CA 90210</p>
            <p>Email: info@moviedb.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          <div>
            <h2 className="font-bold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2 cursor-pointer duration-100 hover:font-bold">
                Home
              </li>
              <li className="mb-2 cursor-pointer duration-100 hover:font-bold">
                Popular Movies
              </li>
              <li className="mb-2 cursor-pointer duration-100 hover:font-bold">
                Top Rated Movies
              </li>
              <li className="mb-2 cursor-pointer duration-100 hover:font-bold">
                Upcoming Movies
              </li>
              <li className="mb-2 cursor-pointer duration-100 hover:font-bold">
                Contact Us
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4">Follow me</h2>
            <div className="flex space-x-4">
              <a
                href="https://t.me/illyyyaa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl hover:text-gray-400 dark:hover:text-gray-600" />
              </a>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl hover:text-gray-400 dark:hover:text-gray-600" />
              </a>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl hover:text-gray-400 dark:hover:text-gray-600" />
              </a>
              <a
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl hover:text-gray-400 dark:hover:text-gray-600" />
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl hover:text-gray-400 dark:hover:text-gray-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        &copy; 2024 MovieDB. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
