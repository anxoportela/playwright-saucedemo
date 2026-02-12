import clsx from 'clsx';
import styles from './styles.module.css';
import React from 'react';

const FeatureList = [
  {
    title: '🧪 Page Object Model',
    description: (
      <>
        Clean, maintainable test architecture with encapsulated page interactions.
      </>
    ),
  },
  {
    title: '📊 Allure Reports',
    description: (
      <>
        Rich test reports with screenshots at every step for comprehensive debugging.
      </>
    ),
  },
  {
    title: '🌐 Multi-Browser',
    description: (
      <>
        Test across Chromium, Firefox, WebKit, and mobile browsers.
      </>
    ),
  },
  {
    title: '🐳 Docker Support',
    description: (
      <>
        Run tests in isolated containers for consistent CI/CD environments.
      </>
    ),
  },
  {
    title: '🔄 CI/CD Integration',
    description: (
      <>
        GitHub Actions workflow with automated testing and GitHub Pages deployment.
      </>
    ),
  },
  {
    title: '📱 Mobile Testing',
    description: (
      <>
        Test on real mobile device configurations including iPhone and Pixel.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="padding-vert--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
