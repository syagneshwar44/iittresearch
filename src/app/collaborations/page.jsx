"use client"; // Ensure this is a client component

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { sponsors } from "../../data/data";

// Styled Components for table styling
const Styles = styled.div`
  padding: 1rem;

  table {
    border-collapse: collapse;
    width: 100%;
    border: 3px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 3px solid black;
        }
      }

      &:hover {
        background-color: #f9f9f9; /* Subtle hover effect */
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.75rem;
      border: 2px solid black;
      text-align: left;
      font-size: 1rem;

      :last-child {
        border-right: 2px solid black;
      }
    }

    th {
      background-color: #f4f4f4;
      font-weight: bold;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
    }

    tr:hover th {
      background-color: #ddd; /* Change background color on hover */
    }
  }

  /* Responsive Styling */
  @media (max-width: 768px) {
    table {
      font-size: 0.9rem;

      th,
      td {
        padding: 0.5rem;
      }

      tr {
        display: block;
        margin-bottom: 10px;
      }

      td {
        display: block;
        text-align: right;
        position: relative;
        padding-left: 50%;
        text-align: left;

        &:before {
          content: attr(data-label);
          position: absolute;
          left: 0;
          font-weight: bold;
          text-transform: uppercase;
        }
      }
    }
  }
`;

// Table Component
function Table({ columns, data }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table aria-label="Collaborator Details">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} data-label={cell.column.columnDef.header}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Collaborators Page Component
export default function Collaborators() {
  const columns = useMemo(
    () => [
      {
        header: "Project",
        accessorKey: "project",
      },
      {
        header: "Collaborator",
        accessorKey: "title",
        cell: ({ row }) => (
          <a href={row.original.link} target="_blank" rel="noopener noreferrer">
            {row.original.project === "Academic" ? row.original.collaborator : row.original.title}
          </a>
        ),
      },
      {
        header: "Duration",
        accessorKey: "duration",
      },
    ],
    []
  );

  const columns2 = useMemo(
    () => [
      {
        header: "Collaborator",
        accessorKey: "collaborator",
        cell: ({ row }) => (
          <a href={row.original.link} target="_blank" rel="noopener noreferrer">
            {row.original.collaborator}
          </a>
        ),
      },
      {
        header: "Affiliation",
        accessorKey: "title",
      },
      {
        header: "Duration",
        accessorKey: "duration",
      },
    ],
    []
  );

  const data = sponsors.filter((sponsor) => sponsor.project !== "Academic");
  const data2 = sponsors.filter((sponsor) => sponsor.project === "Academic");

  return (
    <>
      <motion.div
        className="container"
        style={{ textAlign: "left", paddingLeft: "350px"}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <p>
          Software is omnipresent today in all walks of life. On the other hand, software is quite
          effort-intensive, increasingly complex, and buggy! Our lab focuses on cutting-edge
          research and develops tools in multiple areas of Software Engineering (SE) such as Bug
          Detection, Code Comprehension, Semantic Code Search, API Deprecation, AI for SE, SE for
          AI, Energy-Aware Software Engineering, Modernizing legacy code, and more!
        </p>
        <p>
          There are tremendous opportunities to create an impact on industry projects by leveraging
          these advances, and this is where we do consulting and collaborative projects with the
          industry for solid outcomes. Please reach out to me!
        </p>
        <p>
          Our other thrust area is Computing for Society (specifically Educational Technologies and
          Human-Computer Interaction), where we had a decent impact in terms of developing multiple
          solutions (YTCoder, SurviveCovid-19, Mood of India, ...) and we will be happy to
          collaborate with Corporate Social Responsibility (CSR) of organizations and NGOs.
        </p>
      </motion.div>

      <motion.div
        className="container pub-page-main"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <hr />
        <h3 className="blog-post-title">Industry Collaborations</h3>
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
        <h3 className="blog-post-title">Academic Collaborations</h3>
        <Styles>
          <Table columns={columns2} data={data2} />
        </Styles>
      </motion.div>
    </>
  );
}
