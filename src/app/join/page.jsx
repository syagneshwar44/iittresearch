"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';
import styles from './join.module.css';
import img from '../../../public/logoRecruit.png';
import { GlareCard } from "@/components/ui/glare-card";

export default function Join() {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <hr />
        <div className="pub-page-main">
          <div>
            <Row>
            <Col md={9} className={styles.rightSection}>

              <div className="reflection-container">
  
              <GlareCard className="flex flex-col items-center justify-center">
        <img
          className="h-full w-full absolute inset-0 object-cover"
          src="logoRecruit.png"
        />
      </GlareCard>
      <p className="mt-4">
      We, at the RISHA Lab aspire to work to the best of our abilities and currently have multiple open positions for broadly in the areas of Software Engineering, Educational Technologies and Human-Computer Interaction! Have a look at RISHA Lab Open House video (2020) and Core Principles to understand who we are, what we do, what you can do! Checkout our publications and research agenda to get an idea of some of our work!
      {/* <a href="https://docs.google.com/spreadsheets/d/1K8raZO0wWKfOOHuKxoNxvQwgZABIPoXCMe6hN-Z0Zus/edit?usp=sharing" referrerPolicy="no-referrer" target="_blank">Here</a> are some broad project ideas and you can propose your own!!!  */}
      </p>
      <p>Developer Intern positions are available only for IITT students who have stellar programming skills!</p>
      {/* <form className="cf">
      <input type="button" className="button-check" defaultValue="Open Positions" onClick={(e)=>{e.preventDefault(); window.location.href='/open';}}/>
      </form> */}
  
   </div>
   </Col>
   <Col md={9} className="right-section">
        {/* https://theconfuzedsourcecode.wordpress.com/2019/11/11/you-may-restfully-submit-to-your-google-forms/ */}
      {/* <form className="kwes-form cf" action="https://kwes.io/api/foreign/forms/0ctNQPXDL2AlBzCTLXHU"> */}
      <div style={{textAlign:"left"}}>
        <Row style={{fontWeight:"bold"}}>
          <Col className={"border py-2"}>Why RISHA Lab?</Col>
          <Col className={"border py-2"}>What are we looking for?</Col>
        </Row>
        <Row >
        <Col className={"border py-2"}>
        <ul style={{listStyle:"inside"}}>
        <li>Better job/research prospects by building a strong work profile! </li>
        <li>20+ publications in top-class conferences/journals such as ICSE, FSE, MSR, EASE, CSCW, CSUR and so on (last 2 years)</li>
        <li>20+ development projects/tools - Most of our projects result in tools/software </li>
        <li>The lab is in news for its work on using computing for society (The Hindu, NDTV, IndianExpress, Times of India, The Hans India, ETV, DD, The Hans,  and so on)</li>
        <li>International Research Collaborations (University of Waterloo)</li>
        <li>Industry Collaborations (Bosch, Accenture Labs…)</li>
        <li>We also have mini-projects in Educational Technologies and Human-Computer Interaction for around 4-6 months.</li>
        </ul>
        </Col>
        <Col className={"border py-2"}>
        We are always looking for enthusiastic students for Developer Interns (3 to 6 months), Research Interns (6 to 12 months), UG Research Interns (2 years - main goal is to nurture for higher studies) in addition to B.Tech projects, M.Tech projects, MS/PhD (checkout official IITT admissions channel). 
        <p>What you must have?</p>
        <ul style={{listStyle:"inside"}}>
        <li>Coding & Development </li>
        <li>Critical Thinking</li>
        <li>Quick learner</li>
        <li>Reading & Writing Papers (scientific) </li>
        <li>Formalisms (scientific perspective)</li>
        </ul>
        <p>
        <b>Note1:</b> Most of our research projects have a major software development component, application of AI/ML, NLP techniques, and any other advances required for accomplishing project goals.
        </p>
        <p>
        <b>Note2:</b> If you are not willing to do your best, move beyond your comfort zone, and are not persistent to do your best work, please do not contact us! 
        </p>


        </Col>
        </Row>
        <Row className={"py-2"}>If interested, please fill this form! 
      </Row>
      </div>
      <form className="cf" method={"POST"} action="https://docs.google.com/forms/d/1NFyVrt7ZnGoD0oYEb8TRB2RKmwNuc0-o6iRgsXvwG-0/formResponse" >
      <div className="half left cf">
        <input type="text" id="input-name" name="entry.1129554748" placeholder="Name" />
        <input type="email" id="input-email" name="entry.1216214704" placeholder="Email address" />
        <input type="text" id="input-mob" name="entry.400633797" placeholder="Mobile Number" />
        <input type="text" id="input-ed" name="entry.410725514" placeholder="Highest level of education" />
        <input type="text" id="input-interest" name="entry.1395231050" placeholder="Interested Position / Other"/>
        <input type="text" id="input-cv" name="entry.1452408299" placeholder="Link to CV"/>
      </div>
      <div className="half right cf">
        <textarea name="message" type="text" id="input-message" rules="required" name="entry.352421593" placeholder="Why are you interested in working with RISHA Lab ?" defaultValue={""} />
        <textarea name="message" type="text" id="input-message2" rules="required" name="entry.529764944" placeholder="Please mention your past experiences in the domain of interest. Why are you qualified to work in said area ?" defaultValue={""} />
      </div> 
      <input type="submit" className="button-join" defaultValue="Submit" id="input-submit" />
    </form>
      </Col>
      
            </Row>
          </div>
        </div>
      </motion.div>
    </>
  );
}
