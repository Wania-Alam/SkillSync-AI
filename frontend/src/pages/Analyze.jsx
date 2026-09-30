import { useState } from "react";

function Analyze() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [analysisStage, setAnalysisStage] = useState("");
  const [error, setError] = useState("");

  const [result, setResult] = useState(null);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);

  /* =========================================
     FILE SELECTION
  ========================================= */

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setResume(null);
      return;
    }

    setResume(file);
    setError("");
    setResult(null);
    setResumeAnalysis(null);
    setAnalysisStage("");
  };

  /* =========================================
     ANALYZE RESUME
  ========================================= */

  const handleAnalyze = async (event) => {
    event.preventDefault();

    setError("");
    setResult(null);
    setResumeAnalysis(null);
    setAnalysisStage("");

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);
      setAnalysisStage("Reading your resume...");

      /* -------------------------------------
         SCREEN RESUME
      ------------------------------------- */

      const screeningData = new FormData();

      screeningData.append("file", resume);
      screeningData.append(
        "job_description",
        jobDescription
      );

      setAnalysisStage("Analyzing your resume...");

      const screeningResponse = await fetch(
        "http://127.0.0.1:8000/screen-resume",
        {
          method: "POST",
          body: screeningData,
        }
      );

      const screeningResult =
        await screeningResponse.json();

      if (!screeningResponse.ok) {
        throw new Error(
          screeningResult.detail ||
          "Resume screening failed."
        );
      }

      setAnalysisStage("Generating resume insights...");

      /* -------------------------------------
         COMPLETE RESUME ANALYSIS
      ------------------------------------- */

      const analysisData = new FormData();

      analysisData.append("file", resume);

      const analysisResponse = await fetch(
        "http://127.0.0.1:8000/analyze-resume",
        {
          method: "POST",
          body: analysisData,
        }
      );

      const analysisResult =
        await analysisResponse.json();

      if (!analysisResponse.ok) {
        throw new Error(
          analysisResult.detail ||
          "Resume analysis failed."
        );
      }

      /* -------------------------------------
         SAVE RESULTS
      ------------------------------------- */

      setResult(screeningResult);

      setResumeAnalysis(analysisResult);

      setAnalysisStage("Analysis complete!");

      /* Scroll to results */

      setTimeout(() => {
        document
          .getElementById("analysis-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);

    } catch (err) {
      console.error("Analysis error:", err);

      setError(
        err.message ||
        "Unable to connect to the backend."
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     ANALYZE ANOTHER RESUME
  ========================================= */

  const handleAnalyzeAnother = () => {
    setResume(null);
    setJobDescription("");

    setResult(null);
    setResumeAnalysis(null);

    setError("");
    setAnalysisStage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="analyze-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="analyze-hero">

        <div className="analyze-badge">
          ✦ AI Resume Analysis
        </div>

        <h1>
          Analyze Your
          <span> Resume.</span>
        </h1>

        <p>
          Upload your resume and provide a job description
          to discover your skill match, skill gaps, resume
          quality, and professional category.
        </p>

      </section>

      {/* =====================================
          UPLOAD FORM
          Only visible before analysis
      ===================================== */}

      {!result && (

        <section className="analyze-section">

          <form
            className="analyze-card"
            onSubmit={handleAnalyze}
          >

            {/* Resume Upload */}

            <div className="form-section">

              <div className="form-heading">

                <div className="form-icon">
                  📄
                </div>

                <div>
                  <h2>Upload Your Resume</h2>

                  <p>
                    Upload your resume in PDF format.
                  </p>
                </div>

              </div>

              <label className="upload-box">

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />

                <div className="upload-icon">
                  ↑
                </div>

                <h3>
                  {resume
                    ? resume.name
                    : "Drop your resume here"}
                </h3>

                <p>
                  {resume
                    ? `${(
                        resume.size / 1024
                      ).toFixed(1)} KB`
                    : "or click to browse from your computer"}
                </p>

                <span>
                  PDF files only
                </span>

              </label>

            </div>

            <div className="form-divider"></div>

            {/* Job Description */}

            <div className="form-section">

              <div className="form-heading">

                <div className="form-icon">
                  💼
                </div>

                <div>
                  <h2>Job Description</h2>

                  <p>
                    Paste the job description you want to
                    compare your resume against.
                  </p>
                </div>

              </div>

              <textarea
                className="job-description-input"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(event) =>
                  setJobDescription(
                    event.target.value
                  )
                }
              />

              <div className="character-count">
                {jobDescription.length} characters
              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="analyze-error">
                ⚠ {error}
              </div>
            )}

            {/* Analysis Processing Panel */}

            {loading && (
              <div className="analysis-processing">

                <div className="processing-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div>
                  <strong>
                    Your resume is being analyzed
                  </strong>

                  <p>
                    {analysisStage ||
                      "Processing your resume..."}
                  </p>
                </div>

              </div>
            )}

            {/* Analyze Button */}

            <button
              type="submit"
              className="analyze-button"
              disabled={
                loading ||
                !resume ||
                !jobDescription.trim()
              }
            >

              {loading ? (
                <>
                  <span className="loading-spinner"></span>

                  {analysisStage ||
                    "Analyzing Resume..."}
                </>
              ) : (
                <>
                  <span>✦</span>

                  Analyze My Resume

                  <span>→</span>
                </>
              )}

            </button>

            <p className="analyze-note">
              Your resume is analyzed using NLP and
              machine learning techniques.
            </p>

          </form>

        </section>

      )}

      {/* =====================================
          RESULTS
      ===================================== */}

      {result && (

        <section
          className="results-section"
          id="analysis-results"
        >

          {/* Analyze Another */}

          <div className="analyze-another-wrapper">

            <button
              className="analyze-another-button"
              onClick={handleAnalyzeAnother}
            >
              ← Analyze Another Resume
            </button>

          </div>

          {/* Results Header */}

          <div className="results-header">

            <div>

              <span className="section-label">
                ANALYSIS COMPLETE
              </span>

              <h2>
                Your Resume
                <span> Results</span>
              </h2>

              <p>
                Here is how your resume aligns with
                the job description you provided.
              </p>

            </div>

            <div className="result-success">
              ✓ Analysis completed
            </div>

          </div>

          {/* Results Navigation */}

<div className="results-navigation">

  <a href="#skill-match">
    <span>01</span>
    Skill Match
  </a>

  <a href="#skill-gaps">
    <span>02</span>
    Skill Gaps
  </a>

  <a href="#resume-analysis">
    <span>03</span>
    Resume Analysis
  </a>

</div>

          {/* =================================
    MATCH SCORE
================================= */}

<div
  className="match-score-card"
  id="skill-match"
>

  <div className="match-score-info">

    <span className="result-card-label">
      SKILL MATCH
    </span>

    <div className="match-score-value">
      <h3>
        {
          result.screening_result
            .skill_match_percentage
        }%
      </h3>

      <span className="match-score-label">
        Match
      </span>
    </div>

    <p>
      {
        result.screening_result
          .matched_count
      } of {
        result.screening_result
          .total_jd_skills
      } required skills were found in your resume.
    </p>

  </div>

  <div className="match-circle">

    <svg
      viewBox="0 0 120 120"
      className="progress-ring"
    >

      <circle
        className="progress-ring-background"
        cx="60"
        cy="60"
        r="50"
      />

      <circle
        className="progress-ring-progress"
        cx="60"
        cy="60"
        r="50"
        style={{
          strokeDashoffset:
            314 -
            (
              314 *
              result.screening_result
                .skill_match_percentage
            ) /
              100
        }}
      />

    </svg>

    <div className="match-circle-text">
      {
        result.screening_result
          .skill_match_percentage
      }%
    </div>

  </div>

</div>

          {/* =================================
              STATISTICS
          ================================= */}

          <div className="result-stats-grid">

            <div className="result-stat-card">

              <div className="result-stat-icon blue">
                📄
              </div>

              <div>
                <span>Resume Skills</span>

                <strong>
                  {
                    result.screening_result
                      .total_resume_skills
                  }
                </strong>
              </div>

            </div>

            <div className="result-stat-card">

              <div className="result-stat-icon purple">
                💼
              </div>

              <div>
                <span>Required Skills</span>

                <strong>
                  {
                    result.screening_result
                      .total_jd_skills
                  }
                </strong>
              </div>

            </div>

            <div className="result-stat-card">

              <div className="result-stat-icon green">
                ✓
              </div>

              <div>
                <span>Matched Skills</span>

                <strong>
                  {
                    result.screening_result
                      .matched_count
                  }
                </strong>
              </div>

            </div>

            <div className="result-stat-card">

              <div className="result-stat-icon orange">
                !
              </div>

              <div>
                <span>Skill Gaps</span>

                <strong>
                  {
                    result.screening_result
                      .missing_count
                  }
                </strong>
              </div>

            </div>

          </div>

          {/* =================================
              SKILLS
          ================================= */}

          <div
  className="skills-results-grid"
  id="skill-gaps"
>

            {/* Matched */}

            <div className="skills-result-card">

              <div className="skills-result-header">

                <div className="skills-result-title">

                  <div className="skill-title-icon matched">
                    ✓
                  </div>

                  <div>
                    <h3>Matched Skills</h3>

                    <p>
                      Skills found in both your resume
                      and the job description.
                    </p>
                  </div>

                </div>

                <span className="skill-count matched-count">
                  {
                    result.screening_result
                      .matched_count
                  }
                </span>

              </div>

              <div className="skill-tags">

  {result.screening_result.matched_skills.length > 0 ? (
    result.screening_result.matched_skills.map(
      (skill, index) => (
        <span
          className="skill-tag matched-tag"
          key={index}
        >
          {skill}
        </span>
      )
    )
  ) : (
    <div className="empty-skill-state">
      <span>○</span>
      <p>No matching skills were detected.</p>
    </div>
  )}

</div>

            </div>

            {/* Missing */}

            <div className="skills-result-card">

              <div className="skills-result-header">

                <div className="skills-result-title">

                  <div className="skill-title-icon missing">
                    !
                  </div>

                  <div>
                    <h3>Skill Gaps</h3>

                    <p>
                      Skills required by the job but
                      not detected in your resume.
                    </p>
                  </div>

                </div>

                <span className="skill-count missing-count">
                  {
                    result.screening_result
                      .missing_count
                  }
                </span>

              </div>

              <div className="skill-tags">

  {result.screening_result.missing_skills.length > 0 ? (
    result.screening_result.missing_skills.map(
      (skill, index) => (
        <span
          className="skill-tag missing-tag"
          key={index}
        >
          {skill}
        </span>
      )
    )
  ) : (
    <div className="empty-skill-state">
      <span>✓</span>
      <p>No skill gaps were detected.</p>
    </div>
  )}

</div>

            </div>

          </div>

          {/* Additional Skills */}

          {
            result.screening_result
              .additional_skills.length > 0 && (

              <div className="skills-result-card additional-skills-card">

                <div className="skills-result-header">

                  <div className="skills-result-title">

                    <div className="skill-title-icon additional">
                      +
                    </div>

                    <div>
                      <h3>Additional Skills</h3>

                      <p>
                        Skills detected in your resume
                        that were not required by this job.
                      </p>
                    </div>

                  </div>

                  <span className="skill-count additional-count">
                    {
                      result.screening_result
                        .additional_count
                    }
                  </span>

                </div>

                <div className="skill-tags">

                  {
                    result.screening_result
                      .additional_skills
                      .map((skill, index) => (
                        <span
                          className="skill-tag additional-tag"
                          key={index}
                        >
                          {skill}
                        </span>
                      ))
                  }

                </div>

              </div>

            )
          }

          {/* =================================
              RESUME ANALYSIS
          ================================= */}

          {resumeAnalysis && (

            <>

              {/* Section Heading */}

              <div
  className="resume-analysis-heading"
  id="resume-analysis"
>

                <span className="section-label">
                  RESUME ANALYSIS
                </span>

                <h2>
                  More about your
                  <span> resume</span>
                </h2>

                <p>
                  Additional insights generated from
                  your resume content.
                </p>

              </div>

              {/* Classification + Quality */}

              <div className="resume-insights-grid">

                {/* Classification */}

                <div className="resume-insight-card">

                  <div className="insight-card-top">

                    <div className="insight-icon classification-icon">
                      🧠
                    </div>

                    <span>
                      PREDICTED CATEGORY
                    </span>

                  </div>

                  <h3>
                    {
                      resumeAnalysis
                        .classification
                        .predicted_category
                    }
                  </h3>

                  <p>
                    The machine learning model predicts
                    this professional category based on
                    the content of your resume.
                  </p>

                </div>

                {/* Resume Quality */}

                <div className="resume-insight-card">

                  <div className="insight-card-top">

                    <div className="insight-icon quality-icon">
                      ★
                    </div>

                    <span>
                      RESUME CONTENT
                    </span>

                  </div>

                  <div className="quality-stat-row">

                    <div>
                      <strong>
                        {
                          resumeAnalysis
                            .quality_analysis
                            .word_count
                        }
                      </strong>

                      <span>
                        Words
                      </span>
                    </div>

                    <div>
                      <strong>
                        {
                          resumeAnalysis
                            .quality_analysis
                            .sentence_count
                        }
                      </strong>

                      <span>
                        Sentences
                      </span>
                    </div>

                    <div>
                      <strong>
                        {
                          resumeAnalysis
                            .quality_analysis
                            .character_count
                        }
                      </strong>

                      <span>
                        Characters
                      </span>
                    </div>

                  </div>

                  <div className="quality-status">

                    <span>
                      Content Status
                    </span>

                    <strong>
                      {
                        resumeAnalysis
                          .quality_analysis
                          .content_status
                          .replace("_", " ")
                      }
                    </strong>

                  </div>

                </div>

              </div>

              {/* Detected Sections */}

              <div className="resume-quality-card">

                <div className="quality-card-heading">

                  <div>
                    <h3>
                      Resume Sections
                    </h3>

                    <p>
                      Sections detected in your resume.
                    </p>
                  </div>

                  <span>
                    {
                      resumeAnalysis
                        .quality_analysis
                        .core_sections_present
                    }
                    / 4 core
                  </span>

                </div>

                <div className="detected-sections">

                  {
                    Object.entries(
                      resumeAnalysis
                        .quality_analysis
                        .detected_sections
                    ).map(
                      ([section, detected]) => (
                        <div
                          className={`detected-section ${
                            detected
                              ? "detected"
                              : "not-detected"
                          }`}
                          key={section}
                        >

                          <span>
                            {detected ? "✓" : "○"}
                          </span>

                          <p>
                            {section
                              .replaceAll("_", " ")
                              .replace(
                                /\b\w/g,
                                (letter) =>
                                  letter.toUpperCase()
                              )}
                          </p>

                        </div>
                      )
                    )
                  }

                </div>

              </div>

              {/* Quality Indicators */}

              <div className="quality-indicators-card">

                <div className="quality-card-heading">

                  <div>
                    <h3>
                      Quality Indicators
                    </h3>

                    <p>
                      Observations generated during
                      resume quality analysis.
                    </p>
                  </div>

                </div>

                <div className="quality-indicators-list">

                  {
                    resumeAnalysis
                      .quality_analysis
                      .quality_indicators
                      .map(
                        (indicator, index) => (
                          <div
                            className="quality-indicator"
                            key={index}
                          >
                            <span>•</span>

                            <p>
                              {indicator}
                            </p>
                          </div>
                        )
                      )
                  }

                </div>

              </div>

            </>

          )}

        </section>

      )}

    </main>
  );
}

export default Analyze;