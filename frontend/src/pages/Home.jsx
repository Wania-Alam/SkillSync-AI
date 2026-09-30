import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            AI-Powered Resume Intelligence
          </div>

          <h1>
            Make Your Resume
            <span> Job-Ready.</span>
          </h1>

          <p className="hero-description">
            SkillSync AI analyzes your resume against a specific job
            description to identify matching skills, missing skills,
            resume quality, and your professional profile.
          </p>

          <div className="hero-actions">

            <Link to="/analyze" className="primary-button">
              Analyze My Resume
              <span>→</span>
            </Link>

            <Link to="/about" className="secondary-button">
              Learn More
            </Link>

          </div>

          <div className="hero-trust">

            <div>
              <strong>AI</strong>
              <span>Powered Analysis</span>
            </div>

            <div>
              <strong>NLP</strong>
              <span>Skill Extraction</span>
            </div>

            <div>
              <strong>ML</strong>
              <span>Resume Classification</span>
            </div>

          </div>

        </div>


        {/* Hero Visual */}
        <div className="hero-visual">

          <div className="dashboard-card">

            <div className="dashboard-header">
              <div>
                <span className="small-label">RESUME ANALYSIS</span>
                <h3>Candidate Profile</h3>
              </div>

              <span className="status-dot"></span>
            </div>


            <div className="match-card">

              <div className="match-info">
                <span>Job Match</span>
                <strong>82%</strong>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

              <p>Strong alignment with this position</p>

            </div>


            <div className="mini-results">

              <div className="mini-card">
                <span className="mini-icon green">✓</span>
                <div>
                  <strong>18</strong>
                  <span>Matched Skills</span>
                </div>
              </div>

              <div className="mini-card">
                <span className="mini-icon orange">!</span>
                <div>
                  <strong>4</strong>
                  <span>Skill Gaps</span>
                </div>
              </div>

            </div>


            <div className="skills-preview">

              <span>Python</span>
              <span>SQL</span>
              <span>Machine Learning</span>
              <span>Docker</span>
              <span>+ 14 more</span>

            </div>

          </div>


          <div className="floating-card floating-card-one">
            <span>✦</span>
            <div>
              <strong>AI Analysis</strong>
              <small>Completed</small>
            </div>
          </div>


          <div className="floating-card floating-card-two">
            <span>✓</span>
            <div>
              <strong>Skills Matched</strong>
              <small>18 skills found</small>
            </div>
          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="features-section">

        <div className="section-heading">

          <span>WHAT SKILLSYNC DOES</span>

          <h2>
            Everything you need to
            <br />
            understand your resume.
          </h2>

          <p>
            One platform to analyze your resume, compare it with a
            job description, and discover where you can improve.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon blue">
              ✦
            </div>

            <h3>Resume Screening</h3>

            <p>
              Compare your resume against a specific job description
              and determine how closely your skills align with the role.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon purple">
              ◇
            </div>

            <h3>Skill Gap Analysis</h3>

            <p>
              Identify the skills required by a job that are currently
              missing from your resume.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon green">
              ✓
            </div>

            <h3>Resume Quality</h3>

            <p>
              Check important resume sections and evaluate the overall
              structure and content of your resume.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon orange">
              ◎
            </div>

            <h3>Resume Classification</h3>

            <p>
              Use machine learning to identify the professional category
              that best matches your resume.
            </p>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="how-section">

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            From resume to insights
            <br />
            in four simple steps.
          </h2>

        </div>


        <div className="steps-container">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Upload Resume</h3>
            <p>
              Upload your resume as a PDF file.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Add Job Description</h3>
            <p>
              Provide the job description you are targeting.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>AI Analysis</h3>
            <p>
              SkillSync extracts and compares relevant information.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Get Insights</h3>
            <p>
              View your match score, skill gaps and resume quality.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div>

          <span>READY TO GET STARTED?</span>

          <h2>
            See how well your resume
            <br />
            matches your dream job.
          </h2>

        </div>

        <Link to="/analyze" className="cta-button">
          Analyze My Resume →
        </Link>

      </section>

    </main>
  );
}

export default Home;