'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Papa from "papaparse";
import _ from 'lodash';

import { Spinner } from "react-bootstrap";

export default function Slam() {
    const [data, setData] = useState([]);
    const [iSlam, setSlam] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Handle screen resizing
    const handleResize = () => {
        setIsMobile(window.innerWidth < 720);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Run on first load
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handler = (index) => {
        setSlam(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQnKKT5g7NW9WG6MbadWY5FyejuFfv5BiD0jaC7FzlPHS3B064xA5i1YV-bt-1FkN4ZB-tYOfVuRCLZ/pub?output=csv'
                );
                const csvText = await response.text();
                const parsedData = Papa.parse(csvText, { header: true }).data;

                setSlam(parsedData[Math.floor(Math.random() * parsedData.length)]);
                const fdata = _.orderBy(parsedData, 'Year of passing out', 'desc');
                const gdata = _.groupBy(fdata, "Course you were enrolled in");
                setData(gdata);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    return (
        <>
            <Section>
                {iSlam ? (
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-8">
                                <h3 className="blog-post-title">The RISHA Slambook</h3>
                                <hr />


                                <div style={{ textAlign: "left" }} className={!isMobile ? "d-flex bd-highlight align-items-center" : ""}>
                                    <div className="p-2">
                                        <Image
                                            src={`https://drive.google.com/thumbnail?id=${iSlam["Your current photo"]?.split("?id=")[1]}&sz=w200`}
                                            alt="User Photo"
                                            width={150}
                                            height={150}
                                            style={{
                                                transform: `rotate(${randomNumber(-3, 3)}deg) translate(${randomNumber(-3, 3)}px, ${randomNumber(-3, 3)}px)`,
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </div>
                                    <div className="p-2 flex-grow-1">
                                        <p><b>Name:</b> {iSlam["Your Name"]}</p>
                                        <p><b>Birth Date:</b> {iSlam["Your date of birth"]}</p>
                                        <p><b>Course IITT:</b> {iSlam["Course you were enrolled in"]} {iSlam["Year of passing out"]}</p>
                                        <p><b>Current Location:</b> {iSlam["Career path followed after IITT"]}</p>
                                    </div>
                                </div>


                                <div className="sticky-container mb-3">
                                    {iSlam["How would you summarize your time here in one line ?"] && (
                                        <div
                                            className="sticky"
                                            style={{
                                                transform: `rotate(${randomNumber(-3, 3)}deg)`,
                                                filter: `hue-rotate(${randomNumber(1, 720)}deg)`,
                                                width: "auto", height: "auto",
                                                textAlign: "center",
                                            }}
                                        >
                                            📌 <br /> {iSlam["How would you summarize your time here in one line ?"]}
                                        </div>
                                    )}
                                    {iSlam["Sirs Comment"] && (
                                        <div
                                            className="sticky"
                                            style={{
                                                transform: `rotate(${randomNumber(-3, 3)}deg)`,
                                                filter: `hue-rotate(${randomNumber(1, 720)}deg)`,
                                                width: "auto", height: "auto"
                                            }}
                                        >
                                            <b>Sir's Comments</b> <br /> {iSlam["Sirs Comment"]}
                                        </div>
                                    )}
                                </div>

                                <div className="p-2">
                                    {iSlam["What was the most memorable thing for you as a part of Risha Lab ?"] && (
                                        <>
                                            <p><b>What was the most memorable thing for you as a part of Risha Lab ?</b></p>
                                            <p>{iSlam["What was the most memorable thing for you as a part of Risha Lab ?"]}</p>
                                        </>
                                    )}
                                    {iSlam["Any things that you feel you got to experience only because of your time here ?"] && (
                                        <>
                                            <p><b>Any things that you feel you got to experience only because of your time here ?</b></p>
                                            <p>{iSlam["Any things that you feel you got to experience only because of your time here ?"]}</p>
                                        </>
                                    )}
                                    {iSlam["Did you enjoy your time here overall, what all inspired you and do you have any regrets of not having done something ?"] && (
                                        <>
                                            <p><b>Did you enjoy your time here overall, what all inspired you and do you have any regrets of not having done something ?</b></p>
                                            <p>{iSlam["Did you enjoy your time here overall, what all inspired you and do you have any regrets of not having done something ?"]}</p>
                                        </>
                                    )}
                                    {iSlam["Anything you would like to share with a fresher based on your experiences ?"] && (
                                        <>
                                            <p><b>Anything you would like to share with a fresher based on your experiences ?</b></p>
                                            <p>{iSlam["Anything you would like to share with a fresher based on your experiences ?"]}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="col-4">
                                <h3 className="blog-post-title">Index</h3>
                                <hr />
                                {Object.entries(data)
                                    .sort((a, b) => b[0].localeCompare(a[0]))
                                    .map(([course, students]) => (
                                        <div key={course} className="index-section">
                                            <h6 className="index-header">{course}</h6>
                                            {students.map((student, i) => (
                                                <p
                                                    key={i}
                                                    className="slamIndex"
                                                    onClick={() => handler(student)}
                                                >
                                                    {student["Your Name"]}
                                                </p>
                                            ))}
                                        </div>
                                    ))}
                                <hr />
                            </div>

                        </div>
                    </div>
                ) : (
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                )}
            </Section>

        </>
    );
}

// const Section = styled.section`
//     
// `;

const Section = styled.section`

//  @import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
 @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

 padding: 20px;
 .font1{
 
 font-size: larger;
 }
.slamIndex{
    
    transition: color 0.3s ease-in-out;
    cursor: pointer;
    font-size: 24px;
    font-family: "Indie Flower", serif;
    font-weight: 400;
    font-style: normal;
}

.index-header{
font-size: 24px;
}

.slamIndex:hover {
    color: #ff4500;
    text-decoration: underline;
}

@media screen and (max-width: 720px) {
    .index-section {
        padding: 10px;
    }

    .slamIndex {
        font-size: 14px;
        
    }
}
 .slamIndex::before{
	content:"↠ ";
 }
.row {
    display: flex;
    justify-content: space-between;
}

 @media screen and (min-width: 500px) {
	.col-8{
		border: 30px solid transparent;
		padding: 15px;
        flex: 4;
		border-image: url('/slamimg/border2r.png') 320 round;

	 }
	
	 .col-4{
		border: 30px solid transparent;
		padding: 15px;
        flex: 1;
		border-image: url('/slamimg/border2l.png') 320 round;

	 }
  }
.p-2{
textAlign:left;
}
 .foto {
    background: #fff;
    width: 150px;
    height: 150px;
    display: inline-block;
    margin: 20px;
    padding: 5px;
    border-radius: 2px;
	background-size: 100% 100%!important;
    box-shadow: 0 0 2px;
    transform:rotate(0deg);
    -ms-transform:rotate(0deg); /* IE 9 */
    -webkit-transform:rotate(0deg); /* Safari and Chrome */
    -webkit-backface-visibility: hidden; /* Make edges smooth in webkitbrowsers */
}
.foto:after {
    content: '';
    position: absolute;
    left: -15px;
    transform:rotate(-45deg);
    -ms-transform:rotate(-45deg); /* IE 9 */
    -webkit-transform:rotate(-45deg); /* Safari and Chrome */ 
    width: 60px;
    height: 20px;
    background: hsla(0,100%,100%,0.7);
}

.foto:before {
    content: '';
    position: absolute;
    right: -15px;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); /* IE 9 */
    -webkit-transform:rotate(45deg); /* Safari and Chrome */  
    width: 60px;
    height: 20px;
    background: hsla(0,100%,100%,0.7);
}

.sticky-container {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
  }
  .sticky-container .sticky {
	position: relative;
	height: 280px;
	width: 220px;
	display: inline-block;
	margin: 10px;
	padding: 18px 10px 10px 10px;
	box-sizing: border-box;
	box-shadow: 6px 7px 12px -5px rgba(0, 0, 0, 0.75);
	font-size: 24px;
	background: #ffd31d;
	resize: both;
	overflow: scroll;
	animation: stickAnim 0.3s ease;
	color:black!important;
  }
  .sticky-container .sticky::-webkit-scrollbar {
	display: none;
  }
  .sticky-container .sticky:focus {
	outline: none;
  }
  .sticky-container .sticky .close {
	font-size: 26px;
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
	width: 18px;
  }
  .sticky-container .sticky .close:active {
	transform: scale(0.98);
  }
  @keyframes stickAnim {
	0% {
	  transform: scale(5);
	}
	100% {
	  transform: scale(1);
	}
  }
 `