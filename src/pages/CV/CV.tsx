import React from 'react';
import styled from 'styled-components';

const CVContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 800px;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.lg};
  position: relative;
  padding-bottom: ${({ theme }) => theme.space.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: background-color ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 16px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.ui.border};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled.div<{ isLeft?: boolean }>`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.xl};
  padding-left: 50px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
    padding-left: 0;
    padding-right: ${({ isLeft }) => (isLeft ? '40px' : '0')};
    padding-left: ${({ isLeft }) => (isLeft ? '0' : '40px')};
    margin-left: ${({ isLeft }) => (isLeft ? '0' : 'auto')};
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    left: 9px;
    top: 15px;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      left: ${({ isLeft }) => (isLeft ? 'auto' : '-8px')};
      right: ${({ isLeft }) => (isLeft ? '-8px' : 'auto')};
    }
  }
`;

const TimelineContent = styled.div<{ isLeft?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
  position: relative;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      top: 15px;
      
      ${({ isLeft, theme }) =>
        isLeft
          ? `
        border-left: 10px solid ${theme.colors.ui.border};
        right: -10px;
      `
          : `
        border-right: 10px solid ${theme.colors.ui.border};
        left: -10px;
      `}
    }
  }
`;

const TimelinePeriod = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const TimelineTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const TimelineSubtitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TimelineDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TimelineTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`;

const TimelineTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.fonts.code};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
`;

const SkillCategory = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
`;

const SkillCategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const SkillItem = styled.div``;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const SkillLevel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SkillBar = styled.div`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.background.code};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const SkillProgress = styled.div<{ width: string }>`
  height: 100%;
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const EducationItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
`;

const EducationPeriod = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const EducationDegree = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const EducationInstitution = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const CV: React.FC = () => {
  return (
    <CVContainer>
      <PageHeader>
        <Title>Curriculum Vitae</Title>
        <Subtitle>
          My professional journey in aerospace engineering and software development
        </Subtitle>
        <DownloadButton href="/cv.pdf" target="_blank" rel="noopener noreferrer">
          <span>📄</span> Download CV
        </DownloadButton>
      </PageHeader>
      
      <Section>
        <SectionTitle>Work Experience</SectionTitle>
        <Timeline>
          <TimelineItem isLeft={true}>
            <TimelineContent isLeft={true}>
              <TimelinePeriod>2020 - Present</TimelinePeriod>
              <TimelineTitle>Senior Aerospace Engineer</TimelineTitle>
              <TimelineSubtitle>SpaceTech Industries</TimelineSubtitle>
              <TimelineDescription>
                Leading the development of simulation software for spacecraft dynamics and control systems.
                Implementing machine learning algorithms for autonomous navigation and obstacle avoidance.
              </TimelineDescription>
              <TimelineTags>
                <TimelineTag>Spacecraft Systems</TimelineTag>
                <TimelineTag>Python</TimelineTag>
                <TimelineTag>Machine Learning</TimelineTag>
                <TimelineTag>Simulation</TimelineTag>
              </TimelineTags>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineContent>
              <TimelinePeriod>2017 - 2020</TimelinePeriod>
              <TimelineTitle>Software Engineer</TimelineTitle>
              <TimelineSubtitle>AeroData Solutions</TimelineSubtitle>
              <TimelineDescription>
                Developed data visualization tools for aerospace applications.
                Created web applications for real-time monitoring of flight data.
                Implemented algorithms for data analysis and processing.
              </TimelineDescription>
              <TimelineTags>
                <TimelineTag>React</TimelineTag>
                <TimelineTag>TypeScript</TimelineTag>
                <TimelineTag>Data Visualization</TimelineTag>
                <TimelineTag>WebGL</TimelineTag>
              </TimelineTags>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem isLeft={true}>
            <TimelineContent isLeft={true}>
              <TimelinePeriod>2015 - 2017</TimelinePeriod>
              <TimelineTitle>Research Assistant</TimelineTitle>
              <TimelineSubtitle>National Aerospace Laboratory</TimelineSubtitle>
              <TimelineDescription>
                Conducted research on advanced propulsion systems for spacecraft.
                Developed computational models for performance prediction.
                Published research papers in peer-reviewed journals.
              </TimelineDescription>
              <TimelineTags>
                <TimelineTag>Research</TimelineTag>
                <TimelineTag>MATLAB</TimelineTag>
                <TimelineTag>CFD</TimelineTag>
                <TimelineTag>Propulsion</TimelineTag>
              </TimelineTags>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
      
      <Section>
        <SectionTitle>Skills</SectionTitle>
        <SkillsGrid>
          <SkillCategory>
            <SkillCategoryTitle>Programming Languages</SkillCategoryTitle>
            <SkillList>
              <SkillItem>
                <SkillName>
                  <span>JavaScript/TypeScript</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="90%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Python</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="85%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>C++</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="70%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>MATLAB</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="85%" />
                </SkillBar>
              </SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Web Development</SkillCategoryTitle>
            <SkillList>
              <SkillItem>
                <SkillName>
                  <span>React</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="90%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Node.js</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="75%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>HTML/CSS</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="85%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>GraphQL</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="70%" />
                </SkillBar>
              </SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Aerospace Engineering</SkillCategoryTitle>
            <SkillList>
              <SkillItem>
                <SkillName>
                  <span>Orbital Mechanics</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="90%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Control Systems</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="85%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Propulsion Systems</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="75%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Spacecraft Design</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="70%" />
                </SkillBar>
              </SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Data Science</SkillCategoryTitle>
            <SkillList>
              <SkillItem>
                <SkillName>
                  <span>Machine Learning</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="75%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Data Visualization</span>
                  <SkillLevel>Advanced</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="90%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Statistical Analysis</span>
                  <SkillLevel>Intermediate</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="70%" />
                </SkillBar>
              </SkillItem>
              <SkillItem>
                <SkillName>
                  <span>Computer Vision</span>
                  <SkillLevel>Basic</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress width="50%" />
                </SkillBar>
              </SkillItem>
            </SkillList>
          </SkillCategory>
        </SkillsGrid>
      </Section>
      
      <Section>
        <SectionTitle>Education</SectionTitle>
        <EducationList>
          <EducationItem>
            <EducationPeriod>2012 - 2015</EducationPeriod>
            <EducationDegree>Master of Science in Aerospace Engineering</EducationDegree>
            <EducationInstitution>Massachusetts Institute of Technology</EducationInstitution>
            <p>
              Specialized in spacecraft dynamics and control systems. Thesis on "Autonomous Navigation
              Algorithms for Spacecraft Rendezvous and Docking."
            </p>
          </EducationItem>
          
          <EducationItem>
            <EducationPeriod>2008 - 2012</EducationPeriod>
            <EducationDegree>Bachelor of Science in Mechanical Engineering</EducationDegree>
            <EducationInstitution>Stanford University</EducationInstitution>
            <p>
              Minor in Computer Science. Senior project on "Computational Fluid Dynamics for
              Aerodynamic Analysis of Aircraft Wings."
            </p>
          </EducationItem>
        </EducationList>
      </Section>
    </CVContainer>
  );
};

export default CV;