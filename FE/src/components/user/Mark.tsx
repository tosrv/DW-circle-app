import { FaGithub } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Mark() {
  return (
    <div className="p-3 bg-gray-900 rounded-md space-y-2">
      <section>
        <h2 className="text-gray-500 space-x-1 flex items-center">
          <span>Developed by</span>
          <span className="font-semibold text-white">Rahmat Tomy</span>
          <span>󠁯•󠁏</span>
          <Link to="https://github.com/tosrv">
            <FaGithub className="h-6 w-6 hover:text-white" />
          </Link>
          <Link to="https://www.instagram.com/rahmat_tomy">
            <BiLogoInstagramAlt className="h-7 w-7 hover:text-white" />
          </Link>
          <Link to="https://www.linkedin.com/in/rahmat-tomy-apriliyanto-445a34382">
            <FaLinkedin className="h-6 w-6 hover:text-white" />
          </Link>
        </h2>
      </section>
      <section>
        <h3 className="text-gray-500 flex items-baseline space-x-1">
          <span>Powered by</span>
          <span>
            <img
              src="https://dumbways.id/assets/images/brandv2.png"
              alt="dumbways"
              className="w-5"
            />
          </span>
          <Link to="https://dumbways.id/" className="hover:text-white">
            Dumbways Indonesia
          </Link>
          <span>󠁯•󠁏</span>
          <span>#1 Coding Bootcamp</span>
        </h3>
      </section>
    </div>
  );
}
