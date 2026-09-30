import { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "What is SkillSync AI?",
    answer:
      "SkillSync AI is an AI-powered resume analysis platform that compares a resume with a specific job description. It identifies matching skills, missing skills, resume quality indicators, and the professional category predicted by the machine learning model."
  },
  {
    question: "Why do I need to provide a job description?",
    answer:
      "Different jobs require different skills. SkillSync AI uses the job description as the target requirements and compares those requirements with the skills identified in your resume."
  },
  {
    question: "What type of resume can I upload?",
    answer:
      "SkillSync AI currently accepts PDF resumes. The system extracts the text from the PDF before performing skill extraction, classification, and quality analysis."
  },
  {
    question: "How is the skill match percentage calculated?",
    answer:
      "The system extracts relevant skills from both the resume and the job description. It then identifies the skills that appear in both and calculates the percentage of job-related skills that are matched by the resume."
  },
  {
    question: "What does Skill Gap Analysis show?",
    answer:
      "Skill Gap Analysis identifies skills found in the job description but not detected in the resume. These missing skills can help users understand areas they may want to develop or highlight if they already possess them."
  },
  {
    question: "What happens to my resume during analysis?",
    answer:
      "The uploaded PDF is processed by the application so its text can be analyzed. The current project focuses on analysis rather than maintaining a permanent personal resume profile."
  },
  {
    question: "What machine learning techniques are used?",
    answer:
      "The project combines natural language processing, skill extraction, TF-IDF text representation, and a Linear Support Vector Machine model for resume classification."
  },
  {
    question: "Can SkillSync AI guarantee that I will get a job?",
    answer:
      "No. SkillSync AI is an analysis and decision-support tool. Its results describe the information detected in a resume and its alignment with a supplied job description; they do not guarantee hiring outcomes."
  },
  {
    question: "Can I analyze another resume?",
    answer:
      "Yes. After completing an analysis, you can return to the analysis page and upload another resume with a different job description."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="faq-page">

      {/* Hero */}
      <section className="faq-hero">

        <div className="faq-badge">
          ✦ Frequently Asked Questions
        </div>

        <h1>
          Questions?
          <span> We have answers.</span>
        </h1>

        <p>
          Everything you need to know about how SkillSync AI analyzes
          resumes, identifies skills, and compares them with job requirements.
        </p>

      </section>


      {/* FAQ Content */}
      <section className="faq-content">

        <div className="faq-intro">

          <span className="section-label">
            FAQ
          </span>

          <h2>
            How can we help?
          </h2>

          <p>
            Find answers to common questions about the platform,
            analysis process, and technology behind SkillSync AI.
          </p>

        </div>


        <div className="faq-list">

          {faqData.map((faq, index) => (

            <div
              className={`faq-item ${
                openIndex === index ? "active" : ""
              }`}
              key={index}
            >

              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >

                <span>
                  {faq.question}
                </span>

                <span className="faq-toggle">
                  {openIndex === index ? "−" : "+"}
                </span>

              </button>


              {openIndex === index && (

                <div className="faq-answer">

                  <p>
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </section>


      {/* Still Have Questions */}
      <section className="faq-cta">

        <div className="faq-cta-icon">
          ?
        </div>

        <div>

          <span>READY TO TRY IT?</span>

          <h2>
            See what SkillSync AI
            <br />
            can find in your resume.
          </h2>

        </div>

        <Link to="/analyze" className="cta-button">
          Analyze My Resume →
        </Link>

      </section>

    </main>
  );
}

export default FAQ;