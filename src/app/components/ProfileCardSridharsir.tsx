"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfileCard() {
  return (
    <div className="p-4 mb-3 mylight rounded shadow-md">

      <div className="my-3 flex flex-col items-center">
        <Image
          className="rounded-full border border-gray-900"
          src="https://2020.msrconf.org/getProfileImage/sridharchimalakonda/76c8c23f-1094-41a3-ac57-9d38bf899419/small.jpg?1596264188000"
          alt="LabHead"
          width={120}
          height={120}
          priority
        />
      <h3 className="text-xl mt-2 font-semibold text-center">Dr. Sridhar Chimalakonda</h3>

        <p className="mt-2 text-center">
          Associate Professor and Head, <br />
          Department of Computer Science & Engineering <br />
          <Link
            href="https://www.iittp.ac.in"
            className="preserveb text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            IIT Tirupati, India
          </Link>
        </p>

        <p className="mt-2 text-center">
          Adjunct Associate Professor <br />
          David R. Cheriton School of Computer Science <br />
          <Link
            href="https://uwaterloo.ca/"
            className="preserveb text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Waterloo, Canada
          </Link>
        </p>

        <p className="mt-2 text-center">
          Email:{" "}
          <Link href="mailto:ch@iittp.ac.in" className="preserveb text-blue-600 hover:underline">
            ch@iittp.ac.in
          </Link>
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <Link
          href="https://researchweb.iiit.ac.in/~sridhar_ch/home.html"
          className="preserveb font-bold text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Me
        </Link>
        <span>|</span>
        <Link href="/talks" className="preserveb font-bold text-blue-600 hover:underline">
          Talks
        </Link>
      </div>
    </div>
  );
}
