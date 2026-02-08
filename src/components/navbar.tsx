"use client"

import dayjs from "dayjs";
import Image from "next/image";
import { navIcons, navLinks } from "@/constans";
import useWindowStore from "@/src/store/window";

export default function Navbar() {
  const { openWindow } = useWindowStore();

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
            <li key={link.id} onClick={() => openWindow(link.type)}>
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
              className={`${icon.isClickable && "cursor-pointer"} transition duration-200 hover:scale-125`}
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
