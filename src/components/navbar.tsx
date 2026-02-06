import dayjs from "dayjs";
import Image from "next/image";
import { navIcons, navLinks } from "@/constans";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Image
          src="/images/apple-logo.svg"
          alt="Apple Logo"
          width={14}
          height={14}
        />
        <p className="font-bold">Guillermo's Portfolio</p>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <p>{link.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map((icon) => (
            <li
              key={icon.id}
              className={`${icon.isClickable && "cursor-pointer"} icon`}
            >
              <Image
                src={icon.img}
                alt={`Icon ${icon.id}`}
                width={14}
                height={14}
              />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
}
