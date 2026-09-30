import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

      {/* Page Hero */}
      <section className="about-hero">

        <div className="about-badge">
          ✦ About SkillSync AI
        </div>

        <h1>
          Understanding your resume
          <span> should be simple.</span>
        </h1>

        <p>
          SkillSync AI is an AI-powered resume intelligence platform
          designed to help job seekers understand how well their resume
          aligns with a specific job opportunity.
        </p>

      </section>


      {/* Problem / Solution */}
      <section className="about-problem">

        <div className="about-text">

          <span className="section-label">
            THE PROBLEM
          </span>

          <h2>
            Your resume may be good.
            <br />
            But is it right for the job?
          </h2>

          <p>
            Every job has different requirements. A resume that works
            well for one position may not contain the skills needed for
            another.
          </p>

          <p>
            Job seekers often have difficulty identifying which skills
            they already have, which skills they are missing, and
            whether their resume clearly presents their qualifications.
          </p>

        </div>


        <div className="problem-card">

          <div className="problem-item">
            <span>01</span>
            <div>
              <strong>Different job requirements</strong>
              <p>
                Every position expects a different combination of skills.
              </p>
            </div>
          </div>

          <div className="problem-item">
            <span>02</span>
            <div>
              <strong>Hidden skill gaps</strong>
              <p>
                Important missing skills can be difficult to identify manually.
              </p>
            </div>
          </div>

          <div className="problem-item">
            <span>03</span>
            <div>
              <strong>Resume quality issues</strong>
              <p>
                Important sections may be missing or contain limited content.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* Solution */}
      <section className="solution-section">

        <div className="section-heading centered">

          <span>THE SOLUTION</span>

          <h2>
            Meet SkillSync AI
          </h2>

          <p>
            Instead of manually comparing your resume with a job
            description, SkillSync AI processes both and provides
            meaningful insights in one place.
          </p>

        </div>


        <div className="solution-flow">

          <div className="flow-card">

            <div className="flow-number">01</div>

            <h3>Your Resume</h3>

            <p>
              Upload your resume as a PDF and let the system extract
              the relevant information.
            </p>

          </div>


          <div className="flow-arrow">→</div>


          <div className="flow-card highlighted">

            <div className="flow-number">02</div>

            <h3>AI Processing</h3>

            <p>
              NLP, skill extraction and machine learning techniques
              analyze the resume content.
            </p>

          </div>


          <div className="flow-arrow">→</div>


          <div className="flow-card">

            <div className="flow-number">03</div>

            <h3>Job Description</h3>

            <p>
              The supplied job description provides the requirements
              used for comparison.
            </p>

          </div>


          <div className="flow-arrow">→</div>


          <div className="flow-card">

            <div className="flow-number">04</div>

            <h3>Actionable Insights</h3>

            <p>
              Receive your match score, skill gaps, quality analysis
              and classification.
            </p>

          </div>

        </div>

      </section>


      {/* Capabilities */}
      <section className="capabilities-section">

        <div className="section-heading">

          <span>WHAT WE ANALYZE</span>

          <h2>
            Multiple perspectives.
            <br />
            One complete analysis.
          </h2>

        </div>


        <div className="capabilities-grid">

          <div className="capability-card">

            <div className="capability-number">
              01
            </div>

            <div className="capability-icon">
              ✦
            </div>

            <h3>Skill Extraction</h3>

            <p>
              Natural language processing identifies technical,
              software, professional and domain-related skills
              from resume content.
            </p>

          </div>


          <div className="capability-card">

            <div className="capability-number">
              02
            </div>

            <div className="capability-icon">
              ⇄
            </div>

            <h3>Skill Matching</h3>

            <p>
              Resume skills are compared with skills identified
              from the supplied job description.
            </p>

          </div>


          <div className="capability-card">

            <div className="capability-number">
              03
            </div>

            <div className="capability-icon">
              ◇
            </div>

            <h3>Skill Gap Analysis</h3>

            <p>
              Missing skills are highlighted so users can understand
              what the target position expects.
            </p>

          </div>


          <div className="capability-card">

            <div className="capability-number">
              04
            </div>

            <div className="capability-icon">
              ✓
            </div>

            <h3>Resume Quality</h3>

            <p>
              Important resume sections and content length are
              analyzed to identify structural improvements.
            </p>

          </div>


          <div className="capability-card">

            <div className="capability-number">
              05
            </div>

            <div className="capability-icon">
              ◎
            </div>

            <h3>ML Classification</h3>

            <p>
              A machine learning model predicts the professional
              category represented by the resume.
            </p>

          </div>


          <div className="capability-card">

            <div className="capability-number">
              06
            </div>

            <div className="capability-icon">
              %
            </div>

            <h3>Match Score</h3>

            <p>
              A percentage-based comparison summarizes the alignment
              between identified resume and job skills.
            </p>

          </div>

        </div>

      </section>


      {/* Technology */}
      <section className="technology-section">

        <div className="technology-content">

          <span className="section-label">
            TECHNOLOGY
          </span>

          <h2>
            Built with AI, NLP
            <br />
            and machine learning.
          </h2>

          <p>
            SkillSync AI combines multiple technologies to transform
            unstructured resume text into useful career insights.
          </p>

          <div className="technology-tags">

            <span>Python</span>
            <span>Natural Language Processing</span>
            <span>TF-IDF</span>
            <span>Machine Learning</span>
            <span>FastAPI</span>
            <span>React</span>

          </div>

        </div>


        <div className="technology-visual">

          <div className="tech-node node-one">
            Resume
          </div>

          <div className="tech-line line-one"></div>

          <div className="tech-node node-two">
            NLP
          </div>

          <div className="tech-line line-two"></div>

          <div className="tech-node node-three">
            ML
          </div>

          <div className="tech-line line-three"></div>

          <div className="tech-node node-four">
            Insights
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <div>

          <span>READY TO EXPLORE?</span>

          <h2>
            Put your resume
            <br />
            to the test.
          </h2>

        </div>

        <Link to="/analyze" className="cta-button">
          Analyze My Resume →
        </Link>

      </section>

    </main>
  );
}

export default About;