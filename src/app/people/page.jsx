"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { members, alumini, value } from "../../data/data";
import _ from "lodash";

export default function Lab() {
  return (
    <div className="container pub-page-main">
      <hr />
      <h2 className="blog-post-title">Lab Members</h2>
      <hr />
      <p><b>Hover to discover</b></p>
      <p>Ignite your passion and chase your dreams! We do it in the <b>#RishaFamily</b>!</p>

      {/* LAB MEMBERS GRID */}
      <div className="grid-container">
        {members.filter(m => m.pub === "yes").map(member => (
          <div key={member.key} className="grid-item">
            <Link href={`/info/${member.key}`}>
              <div className="img-wrap hover-switch">
                {/* Profile Image */}
                <Image
                  className="main-img"
                  src={`/images/team/b_${member.key}.jpg`}
                  alt="profile"
                  width={400}
                  height={400}
                  priority
                  onError={(e) => e.target.src = "/images/team/default.jpg"}
                />
              

                {/* Background Image */}
               
                 <Image
                  className="hover-img"
                  src={`/images/team/${member.key}.jpg`}
                  alt="background"
                  width={400}
                  height={400}
                  priority
                  onError={(e) => e.target.src = "/images/team/default.jpg"}
                />
              </div>
            </Link>
            <p className="member-name">
              <Link href={`/info/${member.key}`}>{member.title}</Link>
            </p>
            {member.email.match(/\d+/) ? `${value[member.value].split(" ")[0]} 20${member.email.match(/\d+/)}` : value[member.value]}
          </div>
        ))}
      </div>

      <hr />
      <h2 className="blog-post-title">Alumni</h2>
      <ul>
        {Object.entries(_.groupBy(alumini, 'value'))
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([key, values]) => (
            <div key={key}>
              <h6 style={{ textAlign: "left", fontWeight: "bold" }}>{value[key]}s</h6>
              {_.sortBy(values, (m) => -parseInt(m.email.match(/\d+/) || 0)).map((member, i) => (
                <li key={i}>
                  <Link href={`/info/${member.key}`}>{member.title}</Link>
                  <p className="inline-text">{` (${value[member.value].split(" ")[0]} 20${member.email.match(/\d+/)} ${member.desc})`}</p>
                  <p className="member-designation">{member.designation}</p>
                </li>
              ))}
            </div>
          ))}
      </ul>
    </div>
  );
}
