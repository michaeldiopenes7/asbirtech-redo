import { Fragment, useState } from 'react'
import bzpLogo from '../../assets/images/bzp.png'
import planoutLogo from '../../assets/images/planout.png'
import tripketLogo from '../../assets/images/Tripketph.png'
import { partners } from '../../content/partners'
import './Partners.css'

const LOGO_MAP = {
  bzp: bzpLogo,
  planout: planoutLogo,
  tripket: tripketLogo,
}

function PartnerLogo({ brand }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="partners-logo-wrap">
      {!loaded && <div className="partners-logo-skel skel" aria-hidden="true" />}
      <img
        src={LOGO_MAP[brand.id]}
        alt={brand.name}
        className="partners-logo"
        draggable="false"
        loading="lazy"
        decoding="async"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  )
}

export default function Partners() {
  return (
    <div className="partners-section" aria-label="Trusted partners">
      <p className="partners-label">TRUSTED BY FOUNDERS, LEADERS, AND TEAMS AT:</p>
      <div className="partners-row" role="list">
        {partners.map((brand, i) => (
          <Fragment key={brand.id}>
            {i > 0 && <span className="partners-divider" aria-hidden="true" />}
            <div className="partners-item" role="listitem">
              <PartnerLogo brand={brand} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
