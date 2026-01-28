import { FaGithub } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Mark() {
  return (
    <div className="p-3 bg-gray-900 rounded-md space-y-2">
      <section>
        <h2 className="text-gray-500 flex flex-wrap items-center gap-1">
          <span>Developed&nbsp;by</span>
          <span className="font-semibold text-white">Rahmat&nbsp;Tomy</span>

          <span>󠁯•󠁏</span>
          <div className="flex gap-1 items-center">
            <Link to="https://github.com/tosrv">
              <FaGithub className="h-6 w-6 hover:text-white" />
            </Link>
            <Link to="https://www.instagram.com/rahmat_tomy">
              <BiLogoInstagramAlt className="h-7 w-7 hover:text-white" />
            </Link>
            <Link to="https://www.linkedin.com/in/rahmat-tomy-apriliyanto-445a34382">
              <FaLinkedin className="h-6 w-6 hover:text-white" />
            </Link>
          </div>
        </h2>
      </section>
      <section>
        <h3 className="text-gray-500 flex flex-wrap items-baseline gap-1">
          <span>Powered&nbsp;by</span>
          <span>
            <img
              src="https://dumbways.id/assets/images/brandv2.png"
              alt="dumbways"
              className="w-5"
            />
          </span>
          <Link to="https://dumbways.id/" className="hover:text-white">
            Dumbways&nbsp;Indonesia
          </Link>
          <span>󠁯•󠁏</span>
          <span>#1&nbsp;Coding&nbsp;Bootcamp</span>
        </h3>
      </section>
    </div>
  );
}
